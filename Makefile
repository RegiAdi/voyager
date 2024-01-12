build:
	docker compose build

up:
	docker compose up -d

run:
	docker compose up -d --build

down:
	docker compose down --remove-orphans
