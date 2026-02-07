import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class Order extends Model {
    id!: number;
    user_id!: number;
    total_amount!: number;
    status!: 'pending' | 'completed' | 'cancelled';
    first_name!: string;
    street_address!: string;
    phone_number!: string;
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

// ---------------------------------------------------------bu eskisi 

// import { DataTypes, Model } from "sequelize"
// import sequelize from "../config/config.js";
// import { OrderItem } from "./orderItems.js";
// import { Product } from "./product.model.js";

// // orders.model.ts
// export class Order extends Model {
//     id!: number;
//     user_id!: number;
//     total_amount!: number; // Jami to'lanadigan summa
//     status!: 'pending' | 'completed' | 'cancelled';
//     first_name!: string;
//     street_address!: string;
//     phone_number!: string;
// }

// Order.init({
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     user_id: { type: DataTypes.INTEGER, allowNull: false },
//     total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
//     status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
//     first_name: { type: DataTypes.STRING, allowNull: false },
//     street_address: { type: DataTypes.STRING, allowNull: false },
//     phone_number: { type: DataTypes.STRING, allowNull: false },
// }, { tableName: "orders", sequelize });






// // Order va OrderItem o'rtasidagi bog'liqlik
// Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
// OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

// // OrderItem va Product o'rtasidagi bog'liqlik
// // Bu GetAll va GetOne ichidagi "product" ma'lumotlarini olib kelish uchun shart!
// OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
// Product.hasMany(OrderItem, { foreignKey: "product_id" });

// ----------------------------------------------bu eski o'zimni kodlarim 

// export class Order extends Model {
//     id!: number;
//     first_name!: string;
//     company_name!: string;
//     street_address!: string;
//     apartment!: string;
//     city!: string;
//     phone_number!: number;
//     email_adress!: string;
//     saved_id!: number;
// }

// Order.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     first_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     company_name: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     street_address: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     apartment: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     city: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     phone_number: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email_adress: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     saved_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: "saved",
//             key: "id"
//         },
//         onDelete: "CASCADE"
//     },
// },
// {
//     tableName: "order",
//     timestamps: true,
//     sequelize
// })

// // 1. Foydalanuvchi ko'plab mahsulotlarni "saqlanganlar"ga qo'shishi mumkin
// Saved.hasMany(Order, { foreignKey: "saved_id", as: "order_items" });
// Order.belongsTo(Saved, { foreignKey: "saved_id", as: "user_order" });
