import { IElection } from "../../types/types";
import { Election } from "../generated/prisma";
import AppError from "../utils/appError";
import prisma from "../utils/client";
import { validateElection } from "../utils/validator";
import { web3, votingContract, account } from "../utils/web3";

export default class ElectionService {
  public static createElection = async (data: IElection) => {
    try {
      const election = validateElection(data);
      await votingContract.methods.createElection(election.title).send({
        from: account.address,
        gas: "5000000",
      });


      const contractId = await votingContract.methods.electionCount().call();

      const electionState: { isActive: Boolean} = await votingContract.methods
        .getElection(contractId)
        .call();
      console.log(`Election ${contractId} is active: ${electionState.isActive}`);

      const newElection = await prisma.election.create({
        data: {
          ...election,
          title: election.title,
          description: election.description,
          isActive: Boolean(electionState.isActive),
          contractId: Number(contractId)
        },
      });

      return {
        success: true,
        election: {
          id: newElection.id,
          contractId: newElection.contractId,
          title: newElection.title,
          description: newElection.description,
          isActive: newElection.isActive,
        },
      };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };

  public static getAllElections = async (voterAddress?: string) => {
    try {
      const elections = await prisma.election.findMany({
        include: { candidate: true },
      });
  
      const electionsWithStatus = await Promise.all(
        elections.map(async (election) => {
          if (!voterAddress) {
            return { ...election, hasVoted: false };
          }
  
          const vote = await prisma.vote.findFirst({
            where: {
              electionId: election.id,
              voterAddress,
            },
          });
  
          return {
            ...election,
            hasVoted: !!vote,
          };
        })
      );
  
      return { success: true, elections: electionsWithStatus };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };
  

  public static getElectionById = async (electionId: string) => {
    try {
      const election = await prisma.election.findUnique({
        where: {
          id: electionId,
        },
        include: {
          candidate: true,
        },
      });

      if (!election) {
        throw new AppError(
          `Election with ID ${electionId} not found`,
          404
        );
      }

      return { success: true, election };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };

  public static updateElection = async (
    electionId: string,
    data: IElection
  ) => {
    try {
      const election = await prisma.election.findUnique({
        where: { id: electionId },
      });

      if (!election) {
        throw new AppError(
          `Election with ID ${electionId} not found`,
          404
        );
      }

      const validatedElection = validateElection(data);

      const updatedElection = await prisma.election.update({
        where: { id: electionId },
        data: validatedElection,
      });

      return { success: true, election: updatedElection };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };

  public static deleteElection = async (electionId: string) => {
    try {
      const election = await prisma.election.findUnique({
        where: { id: electionId },
        include: { candidate: true },
      });

      if (!election) {
        throw new AppError(
          `Election with ID ${electionId} not found`,
          404
        );
      }

      await prisma.election.delete({
        where: { id: electionId },
      });

      return { success: true, message: "Election deleted successfully" };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };
}
