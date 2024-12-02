up:
	docker-compose -f docker-compose.yml up -d --force-recreate

down:
	docker-compose -f docker-compose.yml down

rebuild:
	docker-compose -f docker-compose.yml down \
	&& docker-compose -f docker-compose.yml build --no-cache \
	&& docker-compose -f docker-compose.yml up -d

bash-backend:
	docker-compose -f docker-compose.yml exec -it backend bash

