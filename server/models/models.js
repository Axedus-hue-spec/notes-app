import { sequelize } from "../db.js";
import { INTEGER, STRING } from "sequelize";

export const Note = sequelize.define('note', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    content: {
        type: STRING,
        allowNull: false,
    },
    author: {
        type: STRING,
        allowNull: false
    },
});

export const User = sequelize.define('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: false
    },
});

User.hasMany(Note);
Note.belongsTo(User);