export interface IProductVariantDto {
    id?: number | string; // Yangilashda kerak, yaratishda ixtiyoriy
    color?: string;
    size?: string;
    ram?: string;
    storage?: string;
    price: number;
    aksion_price?: number;
    aksion_prosent?: string;
    aksion_time?: Date;
    stock: number;
    imageCount?: number; // Rasmlarni kesib olish uchun kontrollerda ishlatiladi
}

export interface CreateProductDto {
    title: string;
    description?: string;
    category_id: number;
    variants: IProductVariantDto[] | string; // Postmandan string formatda kelishi mumkin
}

export interface UpdateProductDto {
    title?: string;
    description?: string;
    category_id?: number;
    actionType?: "APPEND" | "REPLACE_IMAGE" | "UPDATE_VARIANT";
    variantId?: number | string;
    imageIndex?: number;
    variants?: IProductVariantDto[] | string; // Yangi variant qo'shish yoki tahrirlash uchun
}