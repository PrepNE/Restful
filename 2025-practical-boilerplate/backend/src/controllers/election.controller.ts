import { NextFunction, Request, Response } from "express";
import ElectionService from "../services/election.service";
import AppError from "../utils/appError";




export default class ElectionController{


  public static createElection = async(req: Request , res: Response , next: NextFunction) => {
    try{
        const result = await ElectionService.createElection(req.body);

        if (!result.success) {
            return next(new AppError(result.error, 400));
        }

        return res.status(201).json(result);
    }catch(err: any){
        next(new AppError(err.message, 500));
    }
  }


  public static getAllElections = async(req: Request , res: Response , next: NextFunction) => {
    try{
        const result = await ElectionService.getAllElections();
        if (!result.success) {
            console.log(result.success);
            return next(new AppError(result.error, 400));
        }

        return res.status(200).json(result);
    }catch(err: any){
        next(new AppError(err.message, 500));
    }
  }

  public static getElectionsById = async(req: Request , res: Response , next: NextFunction) => {
    const electionId = req.params.id
    try{

        const result = await ElectionService.getElectionById(electionId);
        if (!result.success) {
            return next(new AppError(result.error, 400));
        }
        return res.status(200).json(result);
    }catch(err: any){
        next(new AppError(err.message, 500))
    }
  }

  public static updateElection = async(req: Request , res: Response , next: NextFunction) => {
    const electionId = req.params.id;

    try{
        const result = await ElectionService.updateElection(electionId , req.body);
        if (!result.success) {
            return next(new AppError(result.error, 400));
        }

        return res.status(200).json(result);
    }catch(err: any){
        next(new AppError(err.message, 500))
    }
  }


  public static deleteElection = async(req: Request , res: Response, next: NextFunction) => {
    const electionId = req.params.id;
    try{
        const result = await ElectionService.deleteElection(electionId)
        if (!result.success) {
            return next(new AppError(result.error, 400));
        }

        return res.status(200).json(result);
    }catch(err: any){
        next(new AppError(err.message, 500))
    }
    
  } 

  
}