start_service:
	npm run start_service
migrate_latest:
	npx sequelize-cli db:migrate
seed_run:
	npx sequelize-cli db:seed:all