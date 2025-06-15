export interface AnalyzeRequest {
    docs: {
        doc_id: string;
        doc: string;
        entities: string[];
    }[];
}

export interface PredictionProbabilities {
    negative: number;
    neutral: number;
    positive: number;
}

export interface SentenceDetail {
    sentence_index: number;
    sentence_text: string;
    predicted_class: number;
    predicted_label: string;
    probabilities: PredictionProbabilities;
}

export interface AnalyzeResponse {
    results: Array<{
        doc_id: string;
        predicted_class: number;
        predicted_label: string;
        probabilities: PredictionProbabilities;
        details: SentenceDetail[];
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

export interface RapidAPIAuthenticationRequest {
    email: string;
}
