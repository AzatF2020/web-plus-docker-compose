# Production
up:
	docker compose -f docker-compose.yml up -d

down:
	docker compose -f docker-compose.yml down

build: 
	docker compose -f docker-compose.yml build

bash-backend:
	docker compose -f docker-compose.yml exec -it backend bash

bash-frontend:
	docker compose -f docker-compose.yml exec -it frontend bash

# Development
up_dev:
	docker compose -f docker-compose.dev.yml up -d

down_dev:
	docker compose -f docker-compose.dev.yml down

build_dev:
	docker compose -f docker-compose.dev.yml build

bash_backend_dev:
	docker compose -f docker-compose.dev.yml exec -it backend bash

bash_frontend_dev:
	docker compose -f docker-compose.dev.yml exec -it frontend bash



