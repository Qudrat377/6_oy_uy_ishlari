import { DataTypes, Model } from "sequelize"
import sequelize from "../config/config.js";

export class Auth extends Model {
    username!: string;
    email!: string;
    password!: string;
    role!: string;
    otp!: string;
    isVerified!: boolean;
    otptime!: string
}

Auth.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    otp: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    otptime: {
        type: DataTypes.STRING,
        defaultValue: null
    }

},
{
    tableName: "auth",
    timestamps: true,
    sequelize
})