import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    logging: false
});
sequelize.authenticate().then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error.message));
sequelize.sync({ force: false });
export default sequelize;
//# sourceMappingURL=config.js.map