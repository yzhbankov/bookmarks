import { Axios } from 'axios';

export interface IFeedbackCreate {
    rating: 'great' | 'good' | 'okay' | 'bad';
    comment?: string;
}

export interface IFeedback {
    _id: string;
    owner: string;
    rating: 'great' | 'good' | 'okay' | 'bad';
    comment?: string;
    createdAt: string;
}

export interface IAxiosFeedbackApi {
    submit: (feedback: IFeedbackCreate) => Promise<IFeedback | null>;
    getHistory: () => Promise<IFeedback[] | null>;
}

export class AxiosFeedbackApi implements IAxiosFeedbackApi {
    private http: Axios;

    constructor(http: Axios) {
        this.http = http;
    }

    async submit(data: IFeedbackCreate): Promise<IFeedback | null> {
        const response = await this.http.post('/api/v1/feedback', data);
        if (response) {
            return response.data;
        }
        return null;
    }

    async getHistory(): Promise<IFeedback[] | null> {
        const response = await this.http.get('/api/v1/feedback');
        if (response) {
            return response.data;
        }
        return null;
    }
}
