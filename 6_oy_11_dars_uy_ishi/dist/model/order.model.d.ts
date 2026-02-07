import { Model } from "sequelize";
export declare class Order extends Model {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'pending' | 'completed' | 'cancelled';
    first_name: string;
    street_address: string;
    phone_number: string;
}
//# sourceMappingURL=order.model.d.ts.map