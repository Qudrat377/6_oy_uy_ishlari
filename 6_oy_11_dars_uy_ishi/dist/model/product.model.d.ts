import { Model } from "sequelize";
interface IProductVariant {
    id: number | string;
    color?: string;
    size?: string;
    ram?: string;
    storage?: string;
    price: number;
    aksion_price?: number;
    aksion_prosent?: string;
    aksion_time?: Date;
    stock: number;
    image: string[];
}
export declare class Product extends Model {
    id: number;
    title: string;
    description: string;
    category_id: number;
    main_image: string;
    variants: IProductVariant[];
    created_by: number;
    updated_by: number;
}
export {};
//# sourceMappingURL=product.model.d.ts.map