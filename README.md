<!-- markdownlint-disable MD033 -->
# Sentor JS/TS SDK

**Official JavaScript/TypeScript SDK for the Sentor API — entity-based sentiment analysis, document clustering, and topic naming.**

[![npm](https://img.shields.io/npm/v/sentor-sdk?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/sentor-sdk)
[![License](https://img.shields.io/github/license/NIKX-Tech/sentor-js-sdk?style=flat-square&color=blue)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/NIKX-Tech/sentor-js-sdk?style=flat-square&color=yellow)](https://github.com/NIKX-Tech/sentor-js-sdk/stargazers)
<br>
[![Website](https://img.shields.io/badge/website-sentor.app-5546FA?style=flat-square&logo=google-chrome&logoColor=white)](https://sentor.app)
[![Dashboard](https://img.shields.io/badge/get%20api%20key-dashboard.sentor.app-5546FA?style=flat-square)](https://dashboard.sentor.app/settings?tab=api-access)
[![Docs](https://img.shields.io/badge/docs-sentor.app%2Fdocs-5546FA?style=flat-square)](https://sentor.app/docs)

Stop guessing why ratings drop. Sentor pinpoints exactly how customers feel about specific entities — brands, products, features, competitors — using fine-tuned BERT models trained for aspect-based sentiment analysis.

---

## Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
  - [predict()](#predictinput)
  - [cluster()](#clusterinput-language)
  - [generateTopicName()](#generatetopicnameinput-language)
  - [checkHealth()](#checkhealth)
- [Error Handling](#-error-handling)
- [Rate Limits](#-rate-limits)

---

## 📦 Installation

```bash
npm install sentor-sdk
# or
yarn add sentor-sdk
```

Get a free API key at [dashboard.sentor.app](https://dashboard.sentor.app/settings?tab=api-access).

---

## 🚀 Quick Start

```typescript
import { SentorClient } from 'sentor-sdk';

const client = new SentorClient('your_api_key');

const results = await client.predict({
    docs: [
        {
            doc_id: 'review-1',
            doc: "Apple's new iPhone is amazing but the price is ridiculous.",
            entities: ['Apple', 'iPhone', 'price'],
        },
    ],
});

for (const item of results.results) {
    console.log(item.doc_id, item.predicted_label);
    for (const es of item.entity_sentiments ?? []) {
        console.log(`  ${es.entity}: ${es.sentiment} (${es.score.toFixed(2)})`);
    }
}
```

---

## 📖 API Reference

### `predict(input)`

Score sentiment toward named entities in one or more documents.

```typescript
const results = await client.predict({
    docs: [
        {
            doc_id: 'r1',
            doc: "Samsung's camera is great but battery life is poor.",
            entities: ['Samsung', 'camera', 'battery life'],
        },
    ],
    language: 'en', // "en" | "nl", default "en"
});
```

**Response shape:**

```typescript
{
    results: [
        {
            doc_id: 'r1',
            predicted_class: 0,         // 0=negative, 1=neutral, 2=positive
            predicted_label: 'negative',
            probabilities: { negative: 0.72, neutral: 0.18, positive: 0.10 },
            details: [...],             // per-sentence breakdown
            entity_sentiments: [
                { entity: 'Samsung', sentiment: 'neutral', score: 0.61 },
                { entity: 'camera', sentiment: 'positive', score: 0.88 },
                { entity: 'battery life', sentiment: 'negative', score: 0.91 },
            ],
        },
    ],
}
```

**Supported languages:** `en` (English), `nl` (Dutch)

---

### `cluster(input, language?)`

Group 5+ documents into thematic clusters using BERTopic + HDBSCAN.

```typescript
const results = await client.cluster(
    {
        documents: [
            { doc_id: 'r1', text: 'Shipping was incredibly fast.', entities: ['shipping'] },
            // ... at least 5 documents
        ],
    },
    'en'
);

for (const cluster of results.clusters) {
    console.log(cluster.cluster_id, cluster.document_count, cluster.top_words);
}
// cluster_id -1 = outliers that did not fit any topic
```

---

### `generateTopicName(input, language?)`

Generate a 3–5 word label for a cluster using an LLM.

```typescript
const result = await client.generateTopicName(
    {
        cluster_id: 0,
        documents: cluster.documents,
        top_words: cluster.top_words,
        entities: ['BrandName'],
    },
    'en'
);
console.log(result.topic_name); // e.g. "Shipping Delay Complaints"
```

---

### `checkHealth()`

```typescript
const health = await client.checkHealth();
// { status: 'healthy', version: '...', llm_status: 'available' }
```

---

## ⚠️ Error Handling

```typescript
import { SentorClient, SentorAPIError, RateLimitError, AuthenticationError } from 'sentor-sdk';

const client = new SentorClient('your_api_key');

try {
    const results = await client.predict({ docs: [...] });
} catch (error) {
    if (error instanceof AuthenticationError) {
        console.error('Invalid API key');
    } else if (error instanceof RateLimitError) {
        console.error(`Rate limit hit. Retry after ${error.retryAfter}s`);
    } else if (error instanceof SentorAPIError) {
        console.error(`API error: ${error.message} (${error.code})`);
    }
}
```

---

## 📊 Rate Limits

| Plan | Per Minute | Per Day | Per Month |
|------|:---------:|:-------:|:---------:|
| **Free** | 5 | 100 | 1,000 |
| **Starter** | 60 | 1,000 | 10,000 |
| **Growth** | 200 | 3,000 | 30,000 |
| **Business** | 500 | 10,000 | 100,000 |
| **Enterprise** | Custom | Custom | Custom |

[View full pricing →](https://sentor.app/pricing)

---

## 🔗 Links

- [Sentor Dashboard](https://dashboard.sentor.app) — manage API keys and usage
- [API Documentation](https://sentor.app/docs)
- [npm Package](https://www.npmjs.com/package/sentor-sdk)
- [Support](mailto:sentor@nikx.one)

---

<p align="center">
  Built by <a href="https://nikx.one">NIKX Technologies B.V.</a>
</p>
