# LevateAI Dashboard - Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **GitHub Repository Setup**

Since I cannot push directly due to authentication, here's how to connect your local project to GitHub:

```bash
# Navigate to your project directory
cd /path/to/levateai-dashboard

# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/LevateAI/LindyAILevateAI.git

# Add all files
git add .

# Commit with descriptive message
git commit -m "🎉 Complete LevateAI Dashboard - Production Ready Frontend"

# Push to GitHub (you'll need to authenticate)
git push -u origin main
```

### 2. **Environment Setup**

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. **Local Development**

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev

# Open browser
open http://localhost:3000
```

### 4. **Production Deployment Options**

#### Option A: Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### Option B: Netlify
1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

#### Option C: Custom Server
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx)

## 🔧 Google OAuth Setup (Required for Production)

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API and Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

### 2. Supabase OAuth Configuration
1. Go to your Supabase dashboard
2. Navigate to Authentication → Providers
3. Enable Google provider
4. Add your Google Client ID and Client Secret
5. Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

## 📊 Database Setup (Optional)

The project includes Prisma schema for future database needs:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (when ready)
npx prisma migrate dev

# Seed database (when ready)
npx prisma db seed
```

## 🔍 Testing Checklist

Before going live, test these features:

- [ ] Homepage loads correctly
- [ ] Sign-up flow works
- [ ] Sign-in redirects to dashboard
- [ ] Google OAuth works (after setup)
- [ ] Onboarding flow completes
- [ ] All dashboard pages load
- [ ] Workflow template modal opens
- [ ] Analytics page displays data
- [ ] Mobile responsive design works
- [ ] Route protection works (try accessing /dashboard without auth)

## 🚨 Known Issues & Solutions

### Issue: Google OAuth not working
**Solution**: Complete Google Cloud Console setup and add credentials to Supabase

### Issue: Dashboard redirects to sign-in
**Solution**: Check Supabase configuration and environment variables

### Issue: Styling looks broken
**Solution**: Ensure Tailwind CSS is properly configured and built

## 📈 Performance Optimization

For production, consider:

1. **Image Optimization**: Add `next/image` for better performance
2. **Bundle Analysis**: Run `npm run analyze` to check bundle size
3. **Caching**: Configure proper caching headers
4. **CDN**: Use CDN for static assets
5. **Monitoring**: Add error tracking (Sentry) and analytics

## 🔐 Security Checklist

- [ ] Environment variables are secure
- [ ] Supabase RLS policies are configured
- [ ] HTTPS is enabled in production
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place

## 📞 Support

If you encounter issues:

1. Check the `PROJECT_HANDOFF_REPORT.md` for technical details
2. Review Supabase logs for authentication issues
3. Check browser console for client-side errors
4. Verify environment variables are set correctly

---

**Status**: Ready for Production Deployment 🚀
