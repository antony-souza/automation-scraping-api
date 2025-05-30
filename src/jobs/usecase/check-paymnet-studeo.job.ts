import cron from 'node-cron';
import { userModel } from '@src/models/user.model';
import { IJobs } from '../interfaces/jobs.interface';
import { logger } from '@src/utils/logger.utils';
import { CheckPaymentsStudeoUseCase } from '@src/api/modules/bot/usecase/check-payments-studeo.usecase';

export class CheckPaymentsStudeoJob implements IJobs {

    async handler() {
        cron.schedule('00 00 2,3,4,5 * *', async () => {
            logger.info('[JOB] Executando CheckPaymentsStudeo..');

            const useCase = new CheckPaymentsStudeoUseCase();

            const usersData = await userModel.find({
                services: { $in: ['check_payment_studeo'] }
            });

            for (const user of usersData) {
                try {
                    await useCase.handler(user.phone, user.name, user.usernameStudeo, user.passwordStudeo);

                    logger.info(`Executado para ${user.name}`);

                } catch (err) {
                    logger.error(`Erro ao executar para ${user.name}:`, err);
                }
            }
        }, {
            timezone: 'America/Sao_Paulo'
        });
    }
}
