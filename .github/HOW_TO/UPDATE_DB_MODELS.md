# DB migration
Docs: [Sequelize Migrations](https://sequelize.org/master/manual/migrations.html)


## Run migrations:
   `npx sequelize-cli db:migrate`

## Creating Models and migration files

   `npx sequelize-cli model:generate --name <table_name> --attributes <column_name>:<type>,<column_name>:<type>,<column_name>:<type>`

## Creating migrations files to change existing models

   `npx sequelize-cli migration:generate --name <file_name>`

## Undo migrations:
   `npx sequelize-cli db:migrate:undo`
