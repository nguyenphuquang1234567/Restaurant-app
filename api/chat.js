import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Restaurant context for the AI
const restaurantContext = `
You are Sakura Spike, a friendly AI assistant for a Vietnamese restaurant called "Sakura Spike". 
The restaurant serves authentic Vietnamese cuisine with a modern twist.

Restaurant Information:
- Name: Sakura Spike
- Cuisine: Vietnamese with modern fusion
- Location: 123 Main Street, Downtown District
- Phone: (555) 123-4567
- Hours: Monday to Sunday, 11:00 AM to 10:00 PM
- Price Range: $8-25 per dish

Menu Highlights:
- Appetizers: Spring rolls, fresh rolls, Vietnamese salads
- Main Dishes: Pho (beef noodle soup), Com Tam (broken rice), Banh Mi (Vietnamese sandwich)
- Desserts: Che (sweet soup), Vietnamese coffee desserts
- Beverages: Vietnamese iced coffee, fresh juices, bubble tea

Your personality:
- Friendly and welcoming
- Knowledgeable about Vietnamese cuisine
- Helpful with menu recommendations
- Can assist with reservations and general inquiries
- Use emojis occasionally to make responses more engaging
- Keep responses concise but informative
- Always mention the restaurant name "Sakura Spike" when relevant

If asked about anything not related to the restaurant, politely redirect the conversation back to Sakura Spike's services.
`;

// In-memory storage for conversations (Note: This will reset on each function call in serverless)
// In production, use a database like Vercel KV, MongoDB, or Supabase
const conversations = new Map();

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sessionId } = req.body;
        
        if (!message || !sessionId) {
            return res.status(400).json({ error: 'Message and sessionId are required' });
        }

        // Get or create conversation history
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, []);
        }
        const conversation = conversations.get(sessionId);

        // Add user message to conversation
        conversation.push({ role: 'user', content: message });

        // Prepare messages for OpenAI
        const messages = [
            { role: 'system', content: restaurantContext },
            ...conversation.slice(-10) // Keep last 10 messages for context
        ];

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });

        const aiResponse = completion.choices[0].message.content;

        // Add AI response to conversation
        conversation.push({ role: 'assistant', content: aiResponse });

        // Keep conversation history manageable (max 20 messages)
        if (conversation.length > 20) {
            conversation.splice(0, conversation.length - 20);
        }

        res.status(200).json({
            response: aiResponse,
            conversation: conversation
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ 
            error: 'Sorry, I encountered an error. Please try again.',
            fallback: "Hello! Welcome to Sakura Spike! How can I help you today? 🌸"
        });
    }
}
