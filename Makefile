buildapp:
	docker-compose build --no-cache app

runapp:
	docker-compose up --force-recreate -d app