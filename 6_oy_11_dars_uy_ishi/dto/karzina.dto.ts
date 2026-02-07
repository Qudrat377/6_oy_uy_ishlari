export interface CreateKarzinaDto {
    product_id: number;
    variant_id: string | number;
    quantity: number;   
}

export interface UpdateKarzinaDto {
    cart_id: string | number;
    new_quantity: string | number;
}