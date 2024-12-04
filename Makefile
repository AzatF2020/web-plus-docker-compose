# Production
up:
	docker-compose -f docker-compose.yml up -d --force-recreate

down:
	docker-compose -f docker-compose.yml down

rebuild:
	docker-compose -f docker-compose.yml down \
	&& docker-compose -f docker-compose.yml build \
	&& docker-compose -f docker-compose.yml up -d

bash-backend:
	docker-compose -f docker-compose.yml exec -it backend bash

bash-frontend:
	docker-compose -f docker-compose.yml exec -it frontend bash

# Development
up_dev:
	docker-compose -f docker-compose.dev.yml up -d --force-recreate

down_dev:
	docker-compose -f docker-compose.dev.yml down

rebuild_dev:
	docker-compose -f docker-compose.dev.yml down \
	&& docker-compose -f docker-compose.dev.yml build \
	&& docker-compose -f docker-compose.dev.yml up -d

bash-backend_dev:
	docker-compose -f docker-compose.dev.yml exec -it backend bash

bash-frontend_dev:
	docker-compose -f docker-compose.dev.yml exec -it frontend bash



