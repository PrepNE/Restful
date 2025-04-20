import { ServiceAPIResponse, ServiceAuthResponse } from "../../types/service-response";
import { IStudent, SafeStudent } from "../../types/types";
import { Student } from "../generated/prisma";
import AppError from "../utils/appError";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import prisma from "../utils/client";
import { generateToken } from "../utils/jwt";
import { validateStudent } from "../utils/validator";

export default class AuthService {

    public static login = async (email: string, password: string): Promise<ServiceAuthResponse<SafeStudent>> => {
        try {
            const student = await prisma.student.findUnique({
                where: { email }
            });

            if (!student) {
                return {
                    success: false,
                    message: "Student not found",
                    token: "",
                    body: null
                };
            }

            const isPasswordValid = await comparePassword(password, student.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "Invalid email or password",
                    token: "",
                    body: null
                };
            }

            const token = generateToken(student.id);


            return {
                success: true,
                message: 'Login success',
                token,
                body: student
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

    public static signup = async (studentInfo: IStudent): Promise<ServiceAPIResponse<SafeStudent>> => {
        try {
            const student = validateStudent(studentInfo);

            const existingStudent = await prisma.student.findUnique({
                where: { email: student.email }
            });

            if (existingStudent) {
                return {
                    success: false,
                    message: "User with that email already exists",
                    body: null
                };
            }

            const newStudent = await prisma.student.create({
                data: {
                    ...student,
                    password: await hashPassword(student.password)
                }
            });

        

            return {
                success: true,
                message: "Student created successfully",
                body: newStudent,
            };

        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Internal server error",
                body: null
            };
        }
    };

    public static getStudent = async (userId: string): Promise<ServiceAPIResponse<SafeStudent>> => {
        try {
            const student = await prisma.student.findUnique({
                where: { id: userId }
            });

            if (!student) {
                return {
                    success: false,
                    message: "Student not found",
                    body: null
                };
            }

            const { password: _, ...studentWithoutPassword } = student;

            return {
                success: true,
                message: "Student retrieved successfully",
                body: student,
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
