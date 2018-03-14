restart_back:
	docker-compose stop back
	docker-compose up -d back

restart_front:
	docker-compose stop front
	docker-compose up -d front