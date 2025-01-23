#!/bin/bash

# Lancer PostgreSQL
/usr/bin/postgres -D /var/lib/postgresql/data &

# Attendre que PostgreSQL soit prêt à accepter les connexions
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h localhost -p 5432 -U $POSTGRES_USER; do
  sleep 2
done

# Lancer l'application Node.js
npm start
