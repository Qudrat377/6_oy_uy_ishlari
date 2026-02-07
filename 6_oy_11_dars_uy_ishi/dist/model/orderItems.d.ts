import { Model } from "sequelize";
export declare class OrderItem extends Model {
    id: number;
    order_id: number;
    product_id: number;
    variant_id: number;
    quantity: number;
    price_at_purchase: number;
}
//# sourceMappingURL=orderItems.d.ts.map