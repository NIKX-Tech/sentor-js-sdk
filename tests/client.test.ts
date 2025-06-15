import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { SentorClient } from '../src/client';
import { AuthenticationError, RateLimitError } from '../src/errors';
import { AnalyzeResponse, HealthResponse } from '../src/interfaces';

describe('SentorClient', () => {
    let mock: MockAdapter;
    let client: SentorClient;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        client = new SentorClient('test-key');
    });

    afterEach(() => {
        mock.restore();
    });

    test('should analyze sentiment', async () => {
        const mockResponse: AnalyzeResponse = {
            results: [
                {
                    doc_id: '1',
                    predicted_class: 1,
                    predicted_label: 'positive',
                    probabilities: {
                        positive: 0.95,
                        neutral: 0.03,
                        negative: 0.02,
                    },
                    details: [
                        {
                            sentence_index: 0,
                            sentence_text: 'Test text',
                            predicted_class: 1,
                            predicted_label: 'positive',
                            probabilities: {
                                positive: 0.95,
                                neutral: 0.03,
                                negative: 0.02,
                            },
                        },
                    ],
                },
            ],
        };
        mock.onPost('/ml/predict').reply(200, mockResponse);

        const result = await client.analyze({
            docs: [
                {
                    doc_id: '1',
                    doc: 'Test text',
                    entities: [],
                },
            ],
        });
        expect(result.results[0].predicted_label).toBe('positive');
        expect(result.results[0].probabilities.positive).toBe(0.95);
    });

    test('should handle rate limit error', async () => {
        const mockResponse = {
            detail: 'Rate limit exceeded',
            status_code: '429',
            retry_after: 60,
        };
        mock.onPost('/ml/predict').reply(429, mockResponse);

        await expect(
            client.analyze({
                docs: [
                    {
                        doc_id: '1',
                        doc: 'Test text',
                        entities: [],
                    },
                ],
            }),
        ).rejects.toThrow(RateLimitError);
    });

    test('should handle authentication error', async () => {
        const mockResponse = {
            detail: 'Invalid API key',
            status_code: '401',
        };
        mock.onPost('/ml/predict').reply(401, mockResponse);

        await expect(
            client.analyze({
                docs: [
                    {
                        doc_id: '1',
                        doc: 'Test text',
                        entities: [],
                    },
                ],
            }),
        ).rejects.toThrow(AuthenticationError);
    });

    test('should check health', async () => {
        const mockResponse: HealthResponse = { status: 'ok' };
        mock.onGet('/health').reply(200, mockResponse);

        const result = await client.checkHealth();
        expect(result.status).toBe('ok');
    });
});
