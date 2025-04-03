import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
            ignore: "pid,hostname",
        },
    },
});

export { logger };
