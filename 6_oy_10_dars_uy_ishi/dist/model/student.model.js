import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Student extends Model {
    full_name;
    phone_nomber;
    profession;
    parent_name;
    parent_nomber;
    image_url;
    leftAt;
    joinedAt;
}
Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_nomber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_nomber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    joinedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: "students",
    timestamps: true,
    sequelize
});
//# sourceMappingURL=student.model.js.map