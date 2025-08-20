# Sakura Spike Chatbot Backend

This is the Node.js backend for the Sakura Spike restaurant chatbot, powered by OpenAI API.

## Features

- 🤖 **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent responses
- 💬 **Conversation Memory**: Stores chat history per session
- 🍜 **Restaurant Context**: Specialized for Vietnamese cuisine and Sakura Spike
- 🔄 **Fallback System**: Works even when API is down
- 🌸 **Sakura Theme**: Consistent with restaurant branding

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 3. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST `/api/chat`
Send a message to the chatbot.

**Request:**
```json
{
  "message": "What's on your menu?",
  "sessionId": "session_1234567890_abc123"
}
```

**Response:**
```json
{
  "response": "Our menu features authentic Vietnamese dishes! We have appetizers like spring rolls, main dishes like pho and com tam, desserts like che, and beverages like Vietnamese iced coffee! 🍜",
  "conversation": [...]
}
```

### GET `/api/conversation/:sessionId`
Get conversation history for a session.

### DELETE `/api/conversation/:sessionId`
Clear conversation history for a session.

### GET `/api/health`
Health check endpoint.

## Frontend Integration

The frontend automatically connects to the backend when available. If the API is down, it falls back to predefined responses.

## Conversation Storage

- Conversations are stored in memory (Map object)
- Each session has a unique ID
- Maximum 20 messages per conversation
- Automatically cleaned up when server restarts

## Production Considerations

For production deployment:

1. **Database**: Replace in-memory storage with a database (MongoDB, PostgreSQL, etc.)
2. **Environment**: Set proper environment variables
3. **Security**: Add rate limiting, authentication
4. **Monitoring**: Add logging and monitoring
5. **CORS**: Configure CORS for your domain

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your OpenAI API key is valid and has credits
2. **CORS Error**: The server includes CORS middleware, but check your domain
3. **Port Already in Use**: Change the PORT in .env file
4. **Module Not Found**: Run `npm install` to install dependencies

### Testing the API

You can test the API using curl:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "sessionId": "test123"}'
```

## License

MIT License
