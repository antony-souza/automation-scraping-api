import { ScheduleMonthlyFpeAuth } from "./usecase/search-payments-studeo.usecase";

const jobsList = [
   new ScheduleMonthlyFpeAuth
];

export class JobsInit {
    static async handler() {
        for (const job of jobsList) {
            await job.handler();
        }
    }
}