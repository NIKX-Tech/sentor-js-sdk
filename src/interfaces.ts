export type SupportedLanguage = 'en' | 'nl';

export interface PredictRequest {
    docs: {
        doc_id: string;
        doc: string;
        entities: string[];
    }[];
    language?: SupportedLanguage;
}

export interface ClusterDocument {
    doc_id: string;
    text: string;
    entities: string[];
}

export interface ClusteringRequest {
    documents: ClusterDocument[];
    n_clusters?: number;
    projectId?: string;
}

export interface TopicDocInput extends ClusterDocument {
    cluster_probability: number;
}

export interface TopicNamingRequest {
    cluster_id: number;
    documents: TopicDocInput[];
    entities?: string[];
    top_words?: string[];
}

export interface ClusterOutput {
    cluster_id: number;
    topic_name?: string;
    document_count: number;
    documents: Array<ClusterDocument & { cluster_probability: number }>;
    top_words: string[];
}

export interface ClusteringResponse {
    clusters: ClusterOutput[];
    total_documents: number;
    total_clusters: number;
    outliers_count: number;
    clustering_method: string;
    language: string;
    min_clusters: number;
}

export interface TopicNamingResponse {
    cluster_id: number;
    topic_name: string;
    document_count: number;
    generation_method: string;
    api_key_source: string;
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

export interface PredictResponse {
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
