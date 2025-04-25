import { IJobs } from "./interfaces/jobs.interface";
import { CheckPaymentsStudeo } from "./usecase/check-paymnet-studeo";


const jobsList: IJobs[] = [
   new CheckPaymentsStudeo(),
];

export class JobsInit {
    static async handler() {
        for (const job of jobsList) {
            await job.handler();
        }
    }
}