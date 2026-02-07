import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class WarnLog extends Model {
}
WarnLog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    level: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'warn'
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
    tableName: "warning_logs",
    timestamps: false,
    sequelize
});
//# sourceMappingURL=warn.model.js.map