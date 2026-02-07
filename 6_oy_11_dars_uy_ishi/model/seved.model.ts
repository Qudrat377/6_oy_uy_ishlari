import { DataTypes, Model } from "sequelize"
import sequelize from "../config/config.js";
import { Auth } from "./auth.model.js";
import { Product } from "./product.model.js";

export class Saved extends Model {
    id!: number;
    owner_id!: number;
    product_id!: number;
}

Saved.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "auth",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "product",
            key: "id"
        },
        onDelete: "CASCADE"
    },
},
{
    tableName: "saved",
    timestamps: true,
    sequelize
})

// 1. Foydalanuvchi ko'plab mahsulotlarni "saqlanganlar"ga qo'shishi mumkin
Auth.hasMany(Saved, { foreignKey: "owner_id", as: "saved_items" });
Saved.belongsTo(Auth, { foreignKey: "owner_id", as: "user" });

// 2. Bir mahsulot ko'plab foydalanuvchilarning "saqlanganlar" ro'yxatida bo'lishi mumkin
Product.hasMany(Saved, { foreignKey: "product_id", as: "favored_by" });
Saved.belongsTo(Product, { foreignKey: "product_id", as: "product" });