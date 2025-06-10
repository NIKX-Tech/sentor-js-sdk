# Sentor JavaScript SDK

The Sentor JavaScript SDK provides a simple interface to interact with the Sentor ML API for sentiment analysis.

## Installation

```bash
npm install sentor-js-sdk
```

## Usage

```javascript
import { SentorClient } from 'sentor-js-sdk';

// Initialize the client
const client = new SentorClient('your-api-key');

// Analyze sentiment
const result = await client.analyzeSentiment('This product is amazing!');
console.log(result);
```

## Features

- Simple and intuitive API
- Real-time sentiment analysis
- Support for multiple languages
- Batch processing capabilities
- Comprehensive error handling

## API Reference

### `SentorClient`

#### Constructor

```javascript
new SentorClient(apiKey: string)
```

#### Methods

- `analyzeSentiment(text: string): Promise<SentimentResult>`
- `analyzeBatch(texts: string[]): Promise<SentimentResult[]>`

## Error Handling

```javascript
try {
    const result = await client.analyzeSentiment('Sample text');
} catch (error) {
    console.error('Error:', error.message);
}
```

## License

MIT License