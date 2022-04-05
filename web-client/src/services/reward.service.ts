import axios from "axios";
import {MessageService} from "services/message.service";

export class RewardService {

    private static _instance: RewardService;
    private _messageService: MessageService = MessageService.Instance;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    getUserReward = async () => {
        const options = {
            method: 'GET',
            url: '/reward',
        };
        try {
            const response = await axios.get(options.url);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    getRemainingRewards = async () => {
        const options = {
            method: 'GET',
            url: '/reward/remaining',
        };
        try {
            const response = await axios.get(options.url);
            return response.data.remainingRewards;
        } catch (error) {
            return 0;
        }
    }

    addUserReward = async ({ reward }: { reward: string }) => {
        const options = {
            method: 'POST',
            url: '/reward',
            data: {
                reward,
            },
        };
        try {
            await axios.post(options.url, options.data);
            this._messageService.addMessage({
                severity: 'success',
                summary: 'Reward added',
                detail: `You have won ${reward} stock.`,
            });
            return true;
        } catch (error) {
            this._messageService.addMessage({
                severity: 'error',
                summary: 'Reward not added',
                detail: 'Refer people to get more rewards.',
            });
            return false;
        }
    }

}

export default RewardService;