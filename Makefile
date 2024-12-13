start_service:
	npm run start_service
migrate_latest:
	npx sequelize-cli db:migrate
seed_run:
	npx sequelize-cli db:seed:all
make create_db:
	npx sequelize-cli db:create
make create_correct_db:
	npx sequelize-cli db:create
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all
