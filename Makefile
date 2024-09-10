updatedb:
	docker compose exec -it api npx prisma migrate deploy
	sleep 5
	docker compose up -d
migrate:
	docker compose exec -it api npx prisma migrate dev --name "$(D)"