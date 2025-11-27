#!/bin/bash
# Docker Setup Script for Production API
# This script provides convenient commands for Docker operations

echo "Starting Production API in Production Mode..."
echo "====================================="

# Check if .env.production file exists
if [ ! -f .env.production ]; then
  echo ".env.production file not found!"
  echo "please coppy .env.production form the temlate and update woth your Neon credentials"
  exit 1
fi


# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
  echo "Docker is not running. Please start Docker and try again."
  echo "please start Docker Desktop application"
  exit 1
fi

echo "Building and starting production containers..."
echo " - Using Neon Cloud database (no local proxy)"
echo " - Running in optimized production mode"
echo ""


# Start production environment
docker compose -f docker-compose.prod.yaml up --build

#Wait for DB to be ready (basic health check)
sleep 5

# Run migration with Drizzle
echo "Running database migrations..."
npm run db:migrate

echo ""
echo "Production environment is up and running!"
echo " Application: http://localhost:5173"
echo " Logs: Docker logs production-api-prod"
echo ""
echo "Useful Commands:"
echo " - To view logs: docker logs -f production-api-prod"
echo " - To stop the environment: docker compose -f docker-compose.prod.yaml down"


