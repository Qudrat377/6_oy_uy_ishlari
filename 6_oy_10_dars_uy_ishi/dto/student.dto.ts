export interface CreateStudentDto {
    full_name: string;
    phone_nomber: string;
    profession: string;
    parent_name: string;
    parent_nomber: string;
    image_url: string;
}

export interface UpdateStudentDto {
    full_name?: string;
    phone_nomber?: string;
    profession?: string;
    parent_name?: string;
    parent_nomber?: string;
    image_url?: string
    leftAt?: Date;
    joinedAt?: Date
}