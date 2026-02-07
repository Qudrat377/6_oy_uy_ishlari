import { DataTypes, Model } from "sequelize"
import sequelize from "../config/config.js";
import { Auth } from "./auth.model.js";
import { Category } from "./cotegory.model.js";

interface IProductVariant {
    id: number | string;
    color?: string;
    size?: string;
    ram?: string;
    storage?: string;
    price: number;
    aksion_price?: number;
    aksion_prosent?: string;
    aksion_time?: Date
    stock: number;
    image: string[];
}

export class Product extends Model {
    id!: number;
    title!: string;
    description!: string;
    category_id!: number;
    main_image!: string;
    variants!: IProductVariant[];
    created_by!: number;
    updated_by!: number;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "category",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    main_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    variants: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "auth",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "auth",
            key: "id"
        },
        onDelete: "CASCADE"
    }
},
{
    tableName: "product",
    timestamps: true,
    sequelize
})

// Kategoriya bilan bog'liqlik
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Auth bilan bog'liqlik (yaratuvchi va tahrirlovchi)
Auth.hasMany(Product, { foreignKey: "created_by", as: "createdProducts" });
Product.belongsTo(Auth, { foreignKey: "created_by", as: "creator" });

Auth.hasMany(Product, { foreignKey: "updated_by", as: "updatedProducts" });
Product.belongsTo(Auth, { foreignKey: "updated_by", as: "updater" });
