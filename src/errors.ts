import type { ErrorResponse } from './interfaces';

export class SentorAPIError extends Error {
    code: string;

    constructor(response: ErrorResponse) {
        super(response.detail || 'An error occurred');
        this.code = response.status_code || 'unknown';
    }
}

export class RateLimitError extends SentorAPIError {
    retryAfter: number;

    constructor(response: ErrorResponse) {
        super(response);
        this.retryAfter = response.retry_after || 60;
    }
}

export class AuthenticationError extends SentorAPIError {}
