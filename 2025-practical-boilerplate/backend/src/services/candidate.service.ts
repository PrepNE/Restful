import { ICandidate } from "../../types/types";
import AppError from "../utils/appError";
import prisma from "../utils/client";
import { validateCandidate } from "../utils/validator";
import { web3, votingContract, account } from "../utils/web3";

export default class CandidateService {
  public static createCandidate = async (data: ICandidate) => {
    try {
      const candidate = validateCandidate(data);

      const election = await prisma.election.findUnique({
        where: { id: data.electionId },
      });

      if (!election || !election.isActive) {
        throw new AppError(
          `Election with ID ${data.electionId} is not active or doesn't exist`,
          400
        );
      }

      await votingContract.methods
        .addCandidate(BigInt(election.contractId), candidate.name)
        .send({
          from: account.address,
          gas: "500000",
        });

      const candidateCount = await votingContract.methods
        .candidateCount()
        .call();
      const nextContractId = Number(candidateCount); // Ensure it's a number for Prisma

      const newCandidate = await prisma.candidate.create({
        data: {
          contractId: nextContractId,
          name: candidate.name,
          description: candidate.description,
          electionId: data.electionId,
        },
      });

      return { success: true, candidate: newCandidate };
    } catch (error: any) {
      console.error("Error creating candidate:", error);
      return { success: false, error: error?.message };
    }
  };

  public static getCandidateByElection = async (electionId: string) => {
    try {
      const candidate = await prisma.candidate.findMany({
        where: {
          electionId,
        },
      });

      return { success: true, candidate };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };

  public static getCandidateById = async (candidateId: string) => {
    try {
      const candidate = await prisma.candidate.findUnique({
        where: {
          id: candidateId,
        },
      });

      return { success: true, candidate };
    } catch (error: any) {
      return { success: false, error: error?.message };
    }
  };

  public static vote = async (
    electionId: string,
    candidateId: string,
    voterAddress: string
  ) => {
    try {
      const election = await prisma.election.findUnique({
        where: { id: electionId },
      });

      if (
        !election ||
        !election.isActive ||
        (election.endDate && new Date() > election.endDate)
      ) {
        throw new AppError("Election is not active or has ended", 400);
      }

      const candidate = await prisma.candidate.findUnique({
        where: { id: candidateId },
      });

      if (!candidate || candidate.electionId !== electionId) {
        throw new AppError(
          `Candidate with ID ${candidateId} not found for election ${electionId}`,
          404
        );
      }

      const existingVote = await prisma.vote.findFirst({
        where: {
          electionId,
          voterAddress,
        },
      });

      if (existingVote) {
        throw new AppError("You have already voted in this election", 400);
      }
      const alreadyVotedOnChain = await votingContract.methods
        .hasVoted(voterAddress, election.contractId)
        .call();

      if (alreadyVotedOnChain) {
        throw new AppError(
          "You have already voted according to blockchain",
          400
        );
      }

      await votingContract.methods
        .vote(BigInt(election.contractId), BigInt(candidate.contractId))
        .send({
          from: voterAddress,
          gas: "500000",
        });

      await prisma.vote.create({
        data: {
          electionId,
          candidateId,
          voterAddress,
        },
      });

      await prisma.candidate.update({
        where: { id: candidateId },
        data: { voteCount: { increment: 1 } },
      });

      return { success: true, message: "Vote cast successfully" };
    } catch (error: any) {
      console.log(error)
      return { success: false, error: error?.message };
    }
  };


}
