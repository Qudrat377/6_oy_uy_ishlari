import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class WarnLog extends Model {
    public id!: number;
    public level!: string;
    public message!: string;
    public meta!: any;
    public timestamp!: Date;
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