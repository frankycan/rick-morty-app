run:
	@docker-compose build
	@docker-compose up -d
destroy:
	@docker-compose down -v									# remove the app containers
	@docker-compose rm -sfv
	@docker-compose -f docker-compose.test.yml down -v		# remove the test container
	@docker-compose -f docker-compose.test.yml rm -sfv
front-logs:
	@docker logs -f frontend
back-logs:
	@docker logs -f backend
access-front:
	@docker exec -ti frontend sh
access-back:
	@docker exec -ti backend sh
test:
	make run												# build the app containers
	# @docker-compose -f docker-compose.test.yml build		# build the test container
	@docker-compose -f docker-compose.test.yml up
	make destroy											# remove the app & test containers