import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
import { Product } from "./product.model.js";

export class Karzina extends Model {
    id!: number;
    user_id!: number;
    product_id!: number;
    variant_id!: string | number; // Qaysi variant (rang/razmer) ekanligi
    quantity!: number;            // Nechta (soni)
    price_per_unit!: number;      // O'sha paytdagi bitta mahsulot narxi
    total_price!: number;         // quantity * price_per_unit
}

Karzina.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    variant_id: { type: DataTypes.BIGINT, allowNull: false }, // Variant IDsi
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price_per_unit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    tableName: "karzina",
    sequelize,
    timestamps: true
});

// Cart mahsulotga tegishli (Cart belongs to Product)
Karzina.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Mahsulot ko'plab savatlarda bo'lishi mumkin (Optional)
Product.hasMany(Karzina, { foreignKey: "product_id" });