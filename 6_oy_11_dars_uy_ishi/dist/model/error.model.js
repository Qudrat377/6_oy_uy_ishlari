import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class ErrorLog extends Model {
}
ErrorLog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    level: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'error'
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
    tableName: "error_logs",
    timestamps: false,
    sequelize
});
//# sourceMappingURL=error.model.js.map