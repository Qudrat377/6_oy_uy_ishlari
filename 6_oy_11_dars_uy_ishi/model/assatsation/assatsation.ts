import { Order } from "../order.model.js";
import { OrderItem } from "../orderItems.js";
import { Product } from "../product.model.js";

export const associateModels = () => {
    // Order <-> OrderItem
    Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "user_order" });

    // OrderItem <-> Product
    OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
    Product.hasMany(OrderItem, { foreignKey: "product_id" });
};

// import { Order } from "../order.model.js";
// import { OrderItem } from "../orderItems.js";
// import { Product } from "../product.model.js";


// export const associateModels = () => {
//     // 1. Order va OrderItem
//     Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
//     OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

//     // 2. OrderItem va Product
//     OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
//     Product.hasMany(OrderItem, { foreignKey: "product_id" });
// };