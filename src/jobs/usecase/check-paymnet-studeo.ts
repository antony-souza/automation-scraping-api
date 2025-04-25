import cron from 'node-cron';
import { AuthFpeUseCase, AuthFpeData } from '@src/api/modules/scraping/usecase/AuthFpeUseCase';
import { userModel } from '@src/models/user.model';
import { IJobs } from '../interfaces/jobs.interface';

export class CheckPaymentsStudeo implements IJobs {
    jobName = 'checkPaymentsStudeo';

    async handler() {
        cron.schedule('00 00 1,2,3 * *', async () => {
            console.log('[CRON] Executando AuthFpeUseCase...');

            const useCase = new AuthFpeUseCase();

            const usersData = await userModel.find({
                services: { $in: ['check_payment_studeo'] }
            });

            for (const user of usersData) {
                try {
                    await useCase.handler(user.phone, user.name,user.usernameStudeo, user.passwordStudeo);

                    console.log(`✅ Executado para ${user.name}`);

                } catch (err) {
                    console.error(`❌ Erro ao executar para ${user.name}:`, err);
                }
            }
        }, {
            timezone: 'America/Sao_Paulo'
        });
    }
}
