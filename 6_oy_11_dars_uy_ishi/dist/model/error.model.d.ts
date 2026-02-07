import { Model } from "sequelize";
export declare class ErrorLog extends Model {
    id: number;
    level: string;
    message: string;
    meta: any;
    timestamp: Date;
}
//# sourceMappingURL=error.model.d.ts.map