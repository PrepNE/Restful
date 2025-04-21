import { NextFunction, Request, Response } from "express";
import CandidateService from "../services/candidate.service";
import AppError from "../utils/appError";

export default class CandidateController {
  
  public static createCandidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CandidateService.createCandidate(req.body);

      if (!result.success) {
        return next(new AppError(result.error, 400));
      }

      return res.status(201).json(result);
    } catch (err: any) {
      next(new AppError(err.message, 500));
    }
  };

  public static getCandidatesByElection = async (req: Request, res: Response, next: NextFunction) => {
    const electionId = req.params.electionId;

    try {
      const result = await CandidateService.getCandidateByElection(electionId);

      if (!result.success) {
        return next(new AppError(result.error, 400));
      }

      return res.status(200).json(result);
    } catch (err: any) {
      next(new AppError(err.message, 500));
    }
  };
  public static getCandidateById = async (req: Request, res: Response, next: NextFunction) => {
    const candidateId = req.params.id;

    try {
      const result = await CandidateService.getCandidateById(candidateId);

      if (!result.success) {
        return next(new AppError(result.error, 404));
      }

      return res.status(200).json(result);
    } catch (err: any) {
      next(new AppError(err.message, 500));
    }
  };


  public static vote = async (req: Request, res: Response, next: NextFunction) => {
    const { electionId, candidateId } = req.params;
    const { voterAddress } = req.body;
  
    try {
      if (!voterAddress) {
        return next(new AppError("Voter address is required", 400));
      }
  
      const result = await CandidateService.vote(electionId, candidateId, voterAddress);
      if (!result.success) {
        return next(new AppError(result.error, 400));
      }
  
      return res.status(200).json(result);
    } catch (err: any) {
      next(new AppError(err.message, 500));
    }
  };

}
