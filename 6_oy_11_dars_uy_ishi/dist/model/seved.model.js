import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
import { Auth } from "./auth.model.js";
import { Product } from "./product.model.js";
export class Saved extends Model {
}
Saved.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "auth",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "product",
            key: "id"
        },
        onDelete: "CASCADE"
    },
}, {
    tableName: "saved",
    timestamps: true,
    sequelize
});
Auth.hasMany(Saved, { foreignKey: "owner_id", as: "saved_items" });
Saved.belongsTo(Auth, { foreignKey: "owner_id", as: "user" });
Product.hasMany(Saved, { foreignKey: "product_id", as: "favored_by" });
Saved.belongsTo(Product, { foreignKey: "product_id", as: "product" });
//# sourceMappingURL=seved.model.js.map