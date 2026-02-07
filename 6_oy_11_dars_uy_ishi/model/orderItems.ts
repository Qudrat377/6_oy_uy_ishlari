import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class OrderItem extends Model {
    id!: number;
    order_id!: number;
    product_id!: number;
    variant_id!: number;
    quantity!: number;
    price_at_purchase!: number;
}

OrderItem.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    variant_id: { type: DataTypes.BIGINT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_at_purchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { tableName: "order_items", sequelize });

// -------------------------------------------------------------------------bu eskisi 

// import { DataTypes, Model } from "sequelize"
// import sequelize from "../config/config.js";
// import { Order } from "./order.model.js";
// import { Product } from "./product.model.js";

// // order-items.model.ts
// export class OrderItem extends Model {
//     id!: number;
//     order_id!: number;
//     product_id!: number;
//     variant_id!: number;
//     quantity!: number;
//     price_at_purchase!: number; // Buyurtma paytidagi narxi (MUHIM!)
// }

// OrderItem.init({
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     order_id: { type: DataTypes.INTEGER, references: { model: 'orders', key: 'id' } },
//     product_id: { type: DataTypes.INTEGER, allowNull: false },
//     variant_id: { type: DataTypes.BIGINT, allowNull: false },
//     quantity: { type: DataTypes.INTEGER, allowNull: false },
//     price_at_purchase: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
// }, { tableName: "order_items", sequelize });






// Bog'liqliklar
// Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// // Order va OrderItem o'rtasidagi bog'liqlik
// Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
// OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// // OrderItem va Product o'rtasidagi bog'liqlik
// // Bu GetAll va GetOne ichidagi "product" ma'lumotlarini olib kelish uchun shart!
// OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
// Product.hasMany(OrderItem, { foreignKey: "product_id" });