import z from "zod";

export const roleSchema = z.object({
    name: z.string().min(5, "Name is required"),
    tag: z.string().min(3, "Tag is required"),
});