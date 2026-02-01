import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js"

export class Student extends Model {
    full_name!: string;
    phone_nomber!: string;
    profession!: string;
    parent_name!: string;
    parent_nomber!: string;
    image_url!: string
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
},
{
    tableName: "students",
    timestamps: true,
    sequelize
})