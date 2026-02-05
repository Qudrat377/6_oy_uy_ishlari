import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class BotUser extends Model {
    full_name;
    phone_number;
    chat_id;
}
BotUser.init({
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
    }
}, {
    tableName: "bot_user",
    timestamps: true,
    sequelize
});
//# sourceMappingURL=botUser.model.js.map