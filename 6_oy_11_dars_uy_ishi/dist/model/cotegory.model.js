import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
import { Auth } from "./auth.model.js";
export class Category extends Model {
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: "category",
    timestamps: true,
    sequelize
});
Auth.hasMany(Category, { foreignKey: "created_by", as: "createdCategories" });
Category.belongsTo(Auth, { foreignKey: "created_by", as: "creator" });
Auth.hasMany(Category, { foreignKey: "updated_by", as: "updatedCategories" });
Category.belongsTo(Auth, { foreignKey: "updated_by", as: "updater" });
//# sourceMappingURL=cotegory.model.js.map