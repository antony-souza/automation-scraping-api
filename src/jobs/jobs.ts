import { IJobs } from "./interfaces/jobs.interface";
import { CheckPaymentsStudeoJob } from "./usecase/check-paymnet-studeo.job";

const jobsList: IJobs[] = [
   new CheckPaymentsStudeoJob(),
];

export class JobsInit {
    static async handler() {
        for (const job of jobsList) {
            await job.handler();
        };
    }
}