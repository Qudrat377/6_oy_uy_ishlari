import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Log extends Model {
}
Log.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    level: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    meta: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "logs",
    timestamps: false,
    sequelize
});
//# sourceMappingURL=log.mdel.js.map