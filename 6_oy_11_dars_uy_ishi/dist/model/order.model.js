import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Order extends Model {
}
Order.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
    first_name: { type: DataTypes.STRING, allowNull: false },
    street_address: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
}, { tableName: "orders", sequelize });
//# sourceMappingURL=order.model.js.map