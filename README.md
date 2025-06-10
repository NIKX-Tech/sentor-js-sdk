# Sentor SDK

A TypeScript/JavaScript SDK for interacting with the Sentor ML API for sentiment analysis. This SDK provides a simple and type-safe interface for sentiment analysis operations.

## Installation

```bash
npm install sentor-sdk
```

## Features

- 🚀 TypeScript support with full type definitions
- ⚡ Simple and intuitive API
- 🌍 Support for multiple languages
- 📦 Batch processing capabilities
- 🛡️ Comprehensive error handling
- 🔄 Real-time sentiment analysis

## Usage

### Basic Usage

```typescript
import { SentorClient } from 'sentor-sdk';

// Initialize the client
const client = new SentorClient('your-api-key');

// Analyze sentiment
const input = 
{
  "docs": [
    {
      "doc": "Apple's new iPhone is amazing!",
      "doc_id": "1",
      "entities": [
        "Apple",
        "iPhone"
      ]
    },
    {
      "doc": "Samsung's new phone is amazing!",
      "doc_id": "2",
      "entities": [
        "Samsung",
        "phone"
      ]
    }
  ]
}
const result = await client.analyze(input);
console.log(result);
```

### Sample Output

```json
{
  "results": [
    {
      "doc_id": "1",
      "predicted_class": 2,
      "predicted_label": "positive",
      "probabilities": {
        "negative": 0.00010637386003509164,
        "neutral": 0.0002509312762413174,
        "positive": 0.9996427297592163
      }
    },
    {
      "doc_id": "2",
      "predicted_class": 2,
      "predicted_label": "positive",
      "probabilities": {
        "negative": 0.00010637386003509164,
        "neutral": 0.0002509312762413174,
        "positive": 0.9996427297592163
      }
    }
  ]
}

```

## API Reference

Please refer to the [Sentor ML API Documentation](https://ml.sentor.app) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.