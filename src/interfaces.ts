export interface AnalyzeRequest {
    docs: {
        doc_id: string;
        doc: string;
        entities: string[];
    }[];
}

export interface AnalyzeResponse {
    results: Array<{
        doc_id: string;
        predicted_class: number;
        predicted_label: string;
        probabilities: {
            negative: number;
            neutral: number;
            positive: number;
        };
    }>;
}

export interface HealthResponse {
    status: string;
}

export interface ErrorResponse {
    status_code?: string;
    detail?: string;
    retry_after?: number;
}
