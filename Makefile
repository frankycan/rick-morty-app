PROJECT_NAME=$(shell basename $(CURDIR))

run:
	@docker-compose build
	@docker-compose up -d
destroy:
	# @docker-compose down -v --rmi all
	@docker-compose down -v
	@docker-compose rm -sfv
front-logs:
	@docker logs -f frontend
back-logs:
	@docker logs -f backend
access-front:
	@docker exec -ti frontend sh
access-back:
	@docker exec -ti backend sh