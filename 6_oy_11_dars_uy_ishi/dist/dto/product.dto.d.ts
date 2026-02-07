export interface IProductVariantDto {
    id?: number | string;
    color?: string;
    size?: string;
    ram?: string;
    storage?: string;
    price: number;
    aksion_price?: number;
    aksion_prosent?: string;
    aksion_time?: Date;
    stock: number;
    imageCount?: number;
}
export interface CreateProductDto {
    title: string;
    description?: string;
    category_id: number;
    variants: IProductVariantDto[] | string;
}
export interface UpdateProductDto {
    title?: string;
    description?: string;
    category_id?: number;
    actionType?: "APPEND" | "REPLACE_IMAGE" | "UPDATE_VARIANT";
    variantId?: number | string;
    imageIndex?: number;
    variants?: IProductVariantDto[] | string;
}
//# sourceMappingURL=product.dto.d.ts.map