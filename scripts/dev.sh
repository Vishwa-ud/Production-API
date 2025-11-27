#!/bin/bash
# Docker Setup Script for Production API
# This script provides convenient commands for Docker operations

echo "Starting Production API in Development Mode..."
echo "====================================="

# Check if .env.development file exists
if [ ! -f .env.development ]; then
  echo ".env.development file not found!"
  echo "please coppy .env.development form the temlate and update woth your Neon credentials"
  exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo "Docker is not running. Please start Docker and try again."
  echo "please start Docker Desktop application"
  exit 1
fi

# Create .neon_local directory if it doesn't exist
makdir -p .neon_local

# add .neon_local to .gitignore if not already present
if ! grep -q "^.neon_local/$" .gitignore 2>/dev/null; then
  echo ".neon_local/" >> .gitignore
  echo "Added .neon_local/ to .gitignore"
fi

echo "Building and starting development containers..."
echo " - Neon Local proxy will create an ephenerak database branch"
echo " - Application will run with hot reload enabled"
echo ""

# Run migration with Drizzle
echo "Running database migrations..."
npm run db:migrate

# Wait for the databse to be ready
echo "Waiting for the database to be ready..."
docker compose exec neon-local psql -U neon -d neondb -c `SELECT 1

# Start development environment
docker compose -f docker-compose.dev.yaml up --build

echo ""
echo "Development environment is up and running!"
echo " Application: http://localhost:5173"
echo " Database: postgres://neon@localhost:5432/neondb"
echo ""
echo "To stop the environment, press Ctrl+C or run: docker compose down"


