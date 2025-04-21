import { ServiceAPIResponse, ServiceAuthResponse } from "../../types/service-response";
import { IUser, SafeUser } from "../../types/types";
import { User } from "../generated/prisma";
import AppError from "../utils/appError";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import prisma from "../utils/client";
import { generateToken } from "../utils/jwt";
import { validateUser } from "../utils/validator";


export default class AuthService {

    public static login = async (email: string, password: string): Promise<ServiceAuthResponse<SafeUser>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return {
                    success: false,
                    message: "user not found",
                    token: "",
                    body: null
                };
            }

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "Invalid email or password",
                    token: "",
                    body: null
                };
            }

            const token = generateToken(user.id);


            return {
                success: true,
                message: 'Login success',
                token,
                body: user
            };

        } catch (error: any) {
            console.log(error?.message)
            return {
                success: false,
                message: error?.message || "Internal server error",
                token: "",
                body: null
            };
        }
    };

    public static signup = async (userInfo: IUser): Promise<ServiceAPIResponse<SafeUser>> => {
        try {
            const user = validateUser(userInfo);

            const existinguser = await prisma.user.findUnique({
                where: { email: user.email }
            });

            if (existinguser) {
                return {
                    success: false,
                    message: "User with that email already exists",
                    body: null
                };
            }

            const newuser = await prisma.user.create({
                data: {
                    ...user,
                    password: await hashPassword(user.password)
                }
            });

        

            return {
                success: true,
                message: "user created successfully",
                body: newuser,
            };

        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Internal server error",
                body: null
            };
        }
    };

    public static getUser = async (userId: string): Promise<ServiceAPIResponse<SafeUser>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return {
                    success: false,
                    message: "user not found",
                    body: null
                };
            }

            const { password: _, ...userWithoutPassword } = user;

            return {
                success: true,
                message: "user retrieved successfully",
                body: user,
            };

        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Internal server error",
                body: null
            };
        }
    };
}