import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
import { Auth } from "./auth.model.js";
import { Category } from "./cotegory.model.js";
export class Product extends Model {
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
}, {
    tableName: "product",
    timestamps: true,
    sequelize
});
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Auth.hasMany(Product, { foreignKey: "created_by", as: "createdProducts" });
Product.belongsTo(Auth, { foreignKey: "created_by", as: "creator" });
Auth.hasMany(Product, { foreignKey: "updated_by", as: "updatedProducts" });
Product.belongsTo(Auth, { foreignKey: "updated_by", as: "updater" });
//# sourceMappingURL=product.model.js.map