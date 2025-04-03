import z from "zod";

export const modalitySchema = z.object({
    name: z.string().min(5, "Name is required"),
    price: z.number().min(0, "Price must be a positive number"),
});