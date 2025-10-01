import axios from 'axios';

import { BASE_URL, TIMEOUT } from './constants';
import { AuthenticationError, RateLimitError, SentorAPIError } from './errors';
import { HealthResponse, PredictRequest, PredictResponse } from './interfaces';

import type { AxiosInstance, AxiosResponse } from 'axios';

export class SentorClient {
    private apiKey: string;
    private baseURL: string;
    private timeout: number;
    private client: AxiosInstance;

    constructor(
        apiKey: string,
        baseURL: string = BASE_URL,
        timeout: number = TIMEOUT,
    ) {
        this.apiKey = apiKey;
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {
                'x-api-key': this.apiKey,
                'Content-Type': 'application/json',
            },
        });
    }

    async predict(input: PredictRequest): Promise<PredictResponse> {
        try {
            // Set default language to 'en' if not provided
            const language = input.language || 'en';

            const response: AxiosResponse<PredictResponse> =
                await this.client.post(`/predict?language=${language}`, input);
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async checkHealth(): Promise<HealthResponse> {
        try {
            const response: AxiosResponse<HealthResponse> =
                await this.client.get('/predicts/health');
            return response.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private handleError(error: any): void {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 429) {
                throw new RateLimitError(data);
            } else if (status === 401) {
                throw new AuthenticationError(data);
            } else {
                throw new SentorAPIError(data);
            }
        } else {
            throw new Error(error.message);
        }
    }
}
