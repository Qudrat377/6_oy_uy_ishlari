import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Bot extends Model {
    full_name;
    phone_number;
    chat_id;
    message;
}
Bot.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    chat_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "bot",
    timestamps: true,
    sequelize
});
// ALTER TABLE bot ALTER COLUMN message TYPE TEXT;
//# sourceMappingURL=bot.model.js.map