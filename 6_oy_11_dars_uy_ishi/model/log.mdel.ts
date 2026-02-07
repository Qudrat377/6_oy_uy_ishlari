import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js"; // Sizning konfiguratsiya yo'lingiz

export class Log extends Model {
    id!: number;
    level!: string;
    message!: string;
    meta!: any;
    timestamp!: Date;
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
        type: DataTypes.JSONB, // PostgreSQL uchun eng yaxshi format
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "logs",
    timestamps: false, // Biz o'zimizning timestamp ustunimizni ishlatamiz
    sequelize
});