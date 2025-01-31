# Projet de Gestion des Utilisateurs et Critiques de Films

## Description
Ce projet est une application web permettant aux utilisateurs de s'inscrire, de s'authentifier, de gérer leur profil et d'écrire des critiques de films. De plus, il permet de rechercher des films via l'API OMDB.

## Fonctionnalités Principales

### 1. Authentification et Inscription
- Inscription des utilisateurs avec validation des données.
- Connexion sécurisée avec utilisation d'un mot de passe crypté.
- Messages d'erreur en cas de mauvaises informations d'identification.

### 2. Gestion des Utilisateurs
- Récupération du profil utilisateur.
- Mise à jour des informations personnelles comme le nom, la photo, le téléphone et la description.

### 3. Gestion des Critiques de Films
- Création de critiques par les utilisateurs.
- Récupération des critiques associées à un utilisateur.

### 4. Recherche de Films
- Intégration avec l'API OMDB.
- Recherche de films par titre.
- Gestion des erreurs en cas de réponse négative de l'API externe.

### 5. Infrastructure et Configuration
- Implémentation avec Node.js et Express.
- Utilisation de PostgreSQL comme base de données.
- Configuration avec Docker.

## Installation et Configuration

### Prérequis
- Node.js
- Docker
- PostgreSQL

### Installation
Cloner le dépôt :
   ```sh
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_PROJET>
   ```

### Création du fichier .env 
Créez un fichier `.env` à la racine du projet et ajoutez le contenu suivant :

```
PORT=5000
DATABASE_URL=postgres://postgres:password@localhost:5432/movies

OMDB_API_KEY='pasteKeyHere'
```

### Exécution

#### Mode Docker
```sh
sudo DOCKER_USERNAME='userDocker' docker compose up --build
```

## Documentation API
La documentation complète de l'API est disponible dans le dossier `Documentation` sous le fichier [`apiDocumentation.yaml`](Documentation/apiDocumentation.yaml).

