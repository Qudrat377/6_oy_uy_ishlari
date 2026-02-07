import { Order } from "../order.model.js";
import { OrderItem } from "../orderItems.js";
import { Product } from "../product.model.js";
export const associateModels = () => {
    Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "user_order" });
    OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
    Product.hasMany(OrderItem, { foreignKey: "product_id" });
};
//# sourceMappingURL=assatsation.js.map