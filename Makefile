PROJECT_NAME=awards
DOCKER_IMAGE_NAME=image_$(PROJECT_NAME)
DOCKER_CONTAINER_NAME=container_$(PROJECT_NAME)

DOCKER_EXPOSE_PORT=3000

docker_build:
	docker build -f $(CURDIR)/docker/Dockerfile -t $(DOCKER_IMAGE_NAME) .

up:
	docker-compose -f ./docker/docker-compose.yml up -d

down:
	docker-compose -f ./docker/docker-compose.yml down

logs:
	docker logs -f $(DOCKER_CONTAINER_NAME)

bash:
	docker exec -it $(DOCKER_CONTAINER_NAME) sh

tests_unit:
	docker exec -it $(DOCKER_CONTAINER_NAME) \
	npm run tests_unit

tests_integration:
	docker exec -it $(DOCKER_CONTAINER_NAME) \
	npm run tests_integration
