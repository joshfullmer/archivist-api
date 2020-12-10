import { Sequelize } from 'sequelize';

//TODO figure out the process.env

const sequelize = new Sequelize(`postgres://me:password@localhost:5432/archivist_api`); // Example for postgres

export { sequelize };