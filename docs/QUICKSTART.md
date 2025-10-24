# Inkory - Quick Start Guide

Quick guide to get Inkory running in 5 minutes.

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Database Setup (1 minute)

```bash
# Create database
psql postgres

# In PostgreSQL:
CREATE DATABASE inkory_db;
\q
```

### 2️⃣ Backend Setup (2 minutes)

```bash
cd backend

# Copy env file
cp .env.example .env

# Install dependencies
npm install

# Start server
npm run start:dev
```

✅ Backend running at: `http://localhost:3001`

### 3️⃣ Frontend Setup (2 minutes)

```bash
# Open new terminal
cd frontend

# Copy env file
cp .env.local.example .env.local

# Install dependencies
npm install

# Start server
npm run dev
```

✅ Frontend running at: `http://localhost:3000`

## 🎯 Test Now

1. **Open browser**: `http://localhost:3000`
2. **Click "Get started"** → Register account
3. **Click "Write"** → Write your first article
4. **Add content** → Markdown supported
5. **Publish** → Article appears on home

## 🖼️ Upload Images (Optional)

To upload images, setup Cloudinary:

1. Create account: https://cloudinary.com/
2. Copy credentials from Dashboard
3. Update `backend/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart backend

## 🧪 Test API

Swagger docs: `http://localhost:3001/api`

Or test with curl:

```bash
# Register
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "username": "testuser"
  }'

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get articles
curl http://localhost:3001/articles
```

## 📋 Main Features

- ✍️ Write articles with Markdown
- 👏 Clap (like) articles
- 💬 Comment
- 🔖 Bookmark
- 👥 Follow users
- 🔍 Search
- 🏷️ Tags
- 📊 Stats

## 🛠️ Troubleshooting

### Port already in use?
```bash
# Kill process on port 3001
lsof -i :3001
kill -9 <PID>
```

### Database error?
```bash
# Check PostgreSQL
brew services list | grep postgresql

# Start if not running
brew services start postgresql@14
```

### Frontend cannot connect to backend?
- Check backend is running: `http://localhost:3001/api`
- Check `.env.local` has correct URL
- Clear browser cache

## 📚 Detailed Documentation

- **Full Setup**: See `SETUP.md`
- **API docs**: See `API.md`
- **Features**: See `FEATURES.md`
- **README**: See `README.md`

## 🚀 Next Steps

1. ✅ Run both backend and frontend
2. ✅ Create account
3. ✅ Write your first article
4. ✅ Test all features
5. ✅ Customize as needed

## 💡 Tips

- Use Swagger UI to test API
- Check browser DevTools Network tab for debugging
- Backend logs will display in terminal
- Markdown cheat sheet: https://www.markdownguide.org/

## 🎉 Done!

You now have a complete Inkory blogging platform!

Customize and extend as needed. Happy coding! 🚀
