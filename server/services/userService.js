import { tokenService } from "./tokenService.js";
import { User } from "../models/models.js";
import bcrypt from 'bcrypt'

class UserService {
    async registration(user) {
        const candidate = await User.findOne({where: {email: user.email}});

        if(candidate) {
            throw new Error("Пользователь с таким email уже существует")
        }

        const hashPassword = bcrypt.hashSync(user.password, 10);
        
        const newUser = await User.create({
            email: user.email,
            username: user.username,
            password: hashPassword
        });
        
        const token = tokenService.generateToken({
            id: newUser.id,
            username: newUser.username
        });

        return {
            token,
            user: {
                id: newUser.id,
                username: newUser.username
            }
        };
    }

    async login(user) {
        const userDB = await User.findOne({where: {email: user.email}});
        
        if(!userDB) throw new Error("Неверный email");
                        
        const isCompare = bcrypt.compare(userDB.password, user.password);
        
        if(!isCompare) throw new Error('Неверный пароль')
                        
        const token = tokenService.generateToken({
            id: userDB.id,
            username: userDB.username
        })
        
        return {
            token,
            user: {
                id: userDB.id,
                username: userDB.username}
        };
    }
}

export const userService = new UserService();