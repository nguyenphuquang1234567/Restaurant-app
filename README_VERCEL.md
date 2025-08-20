# Sakura Spike - Vercel Deployment

This project is configured for serverless deployment on Vercel with OpenAI integration.

## 🚀 Quick Deploy

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add serverless functions"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

## 🔧 Environment Variables

Set these in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## 📁 Project Structure

```
├── api/
│   ├── chat.js          # Main chatbot endpoint
│   └── health.js        # Health check endpoint
├── index.html           # Main website
├── styles.css           # Styling
├── script.js            # Frontend logic
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

## 🌐 API Endpoints

After deployment, your API will be available at:

- **Chat**: `https://your-domain.vercel.app/api/chat`
- **Health**: `https://your-domain.vercel.app/api/health`

## 🔄 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set environment variables**:
   Create `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run locally**:
   ```bash
   vercel dev
   ```

## ⚠️ Important Notes

### Conversation Storage
- **Current**: In-memory storage (resets on each function call)
- **Production**: Consider using Vercel KV, MongoDB, or Supabase for persistent storage

### Rate Limits
- Vercel has execution time limits (10 seconds for Hobby plan)
- OpenAI API has rate limits
- Consider implementing caching for better performance

### CORS
- CORS is enabled for all origins (`*`)
- For production, restrict to your domain

## 🛠️ Customization

### Adding More Endpoints
Create new files in `api/` folder:
```javascript
// api/new-endpoint.js
export default function handler(req, res) {
    // Your logic here
}
```

### Database Integration
For persistent conversation storage:

1. **Vercel KV** (Recommended):
   ```bash
   vercel kv create
   ```

2. **MongoDB Atlas**:
   - Create MongoDB Atlas cluster
   - Add connection string to environment variables

3. **Supabase**:
   - Create Supabase project
   - Add API keys to environment variables

## 📊 Monitoring

- **Vercel Analytics**: Built-in analytics
- **Function Logs**: Available in Vercel dashboard
- **Performance**: Monitor function execution times

## 🔒 Security

- API keys are stored as environment variables
- CORS is configured for security
- Input validation is implemented
- Rate limiting should be added for production

## 🚀 Production Checklist

- [ ] Set environment variables in Vercel
- [ ] Configure custom domain (optional)
- [ ] Set up database for conversation storage
- [ ] Add rate limiting
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and alerts
- [ ] Test all endpoints
- [ ] Optimize function performance

## 📞 Support

For issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check OpenAI API status

## 🎉 Success!

Once deployed, your Sakura Spike chatbot will be live at:
`https://your-domain.vercel.app`

The chatbot will work seamlessly with OpenAI API and provide intelligent responses about your Vietnamese restaurant! 🌸
