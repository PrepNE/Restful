import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateUser = (data: any) => {
  const user = userSchema.safeParse(data);
  if (!user.success) {
    throw new Error(user.error.errors[0].message);
  }
  return user.data;
};

export const electionSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});


export const validateElection = (data: any) => {
    const result = electionSchema.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }
    return result.data;
};

export const candidateSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(5),
    electionId: z.string().uuid(),
  });
  
export const validateCandidate = (data: any) => {
    const result = candidateSchema.safeParse(data);

    if(!result.success) {
        throw new Error(result.error.errors[0].message)
    }

    return result.data;
}