import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { catchAsync } from "../utils/catchAsync";

export default class AuthController {

  public static login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.status(200).json(result);
  });

  public static signup = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signup(req.body);
    res.status(201).json(result);
  });

  public static getLoggedInUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.getUser(req.user.sub);
    res.status(200).json(result);
  });
}
