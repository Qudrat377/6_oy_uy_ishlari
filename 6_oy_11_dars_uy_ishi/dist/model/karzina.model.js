import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
import { Product } from "./product.model.js";
export class Karzina extends Model {
}
Karzina.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    variant_id: { type: DataTypes.BIGINT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price_per_unit: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    tableName: "karzina",
    sequelize,
    timestamps: true
});
Karzina.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasMany(Karzina, { foreignKey: "product_id" });
//# sourceMappingURL=karzina.model.js.map