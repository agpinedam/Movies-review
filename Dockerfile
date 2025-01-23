# Étape 1 : Construire l'application frontend avec Node
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src/frontend ./src/frontend
COPY vite.config.js ./
RUN npm run build

# Étape 2 : Créer l'application avec PostgreSQL et le backend
FROM node:18-alpine

# Installer PostgreSQL et ses dépendances
RUN apk add --no-cache postgresql postgresql-contrib bash

# Créer la base de données et initialiser PostgreSQL
RUN mkdir -p /var/lib/postgresql/data \
    && chown -R postgres:postgres /var/lib/postgresql

# Définir les variables d'environnement pour PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=mydatabase

# Configurer les ports d'écoute
EXPOSE 5432
EXPOSE 5000

# Copier le script d'initialisation de la base de données
COPY init-db.sh /docker-entrypoint-initdb.d/

# Configurer le répertoire de l'application
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier les fichiers backend et frontend dans le conteneur
COPY src/backend ./src/backend
COPY --from=builder /app/dist ./src/frontend/dist

# Créer un script qui démarre PostgreSQL et ensuite le serveur Node.js
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Lancer PostgreSQL et l'application Node.js via le script
CMD ["/start.sh"]
