import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {

    public static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login(email, password);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
            throw error;
        }
    };

    public static register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await AuthService.signup(req.body);
            return res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    };

    public static getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const id = req.user.userId; 
            console.log("Here is the id: ", id)
            const data = await AuthService.getUser(id);
            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    };
}
