import { User } from "../src/generated/prisma";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IElection {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface ICandidate{
    name: string;
    description: string;
    electionId: string;
}

export type SafeUser = Omit<User, "password" >;