/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
    interface Window {
      ethereum: any;
    }
  }
  

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}


export interface ICandidate {
    id: string;
    contractId: number;
    name: string;
    description: string;
    electionId: string;
    voteCount: number;
  }
  
  export interface IElection {
    id: string;
    contractId: number;
    title: string;
    description: string;
    startDate: string; 
    endDate: string; 
    hasVoted: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    candidate: ICandidate[];
  }
  