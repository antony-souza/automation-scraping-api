import z from "zod";

export const fpeScmea = z.object({
    usernameStudeo: z.string().min(1, { message: "Campo obrigatório" }),
    passwordStudeo: z.string().min(1, { message: "Campo obrigatório" }),
    usernameFpe: z.string().min(1, { message: "Campo obrigatório" }),
    passwordFpe: z.string().min(1, { message: "Campo obrigatório" }),
})