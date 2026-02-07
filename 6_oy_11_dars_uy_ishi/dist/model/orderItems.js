import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class OrderItem extends Model {
}
OrderItem.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    variant_id: { type: DataTypes.BIGINT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_at_purchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: "order_items", sequelize });
//# sourceMappingURL=orderItems.js.map