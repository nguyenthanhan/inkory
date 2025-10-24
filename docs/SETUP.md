# Inkory - Setup Guide

Detailed guide to install and run Inkory project.

## 📋 System Requirements

- **Node.js**: version 18.x or higher
- **npm** or **yarn**: package manager
- **PostgreSQL**: version 14.x or higher
- **Cloudinary Account**: for image uploads (free)

## 🚀 Step 1: Install PostgreSQL

### macOS (using Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Create database:
```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE inkory_db;

# Create user (optional)
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE inkory_db TO your_username;

# Exit
\q
```

## 📦 Step 2: Setup Backend (NestJS)

### 1. Navigate to backend folder:
```bash
cd backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create .env file:
```bash
cp .env.example .env
```

### 4. Configure .env file:
Open `.env` file and fill in the information:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=inkory_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary (will setup later)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3001
NODE_ENV=development
```

### 5. Start backend server:
```bash
npm run start:dev
```

Backend will run at: `http://localhost:3001`
Swagger API docs: `http://localhost:3001/api`

## 🎨 Step 3: Setup Frontend (Next.js)

### 1. Open new terminal and navigate to frontend folder:
```bash
cd frontend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create .env.local file:
```bash
cp .env.local.example .env.local
```

### 4. Configure .env.local file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Start frontend server:
```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

## ☁️ Step 4: Setup Cloudinary (For image uploads)

### 1. Create free account:
- Visit: https://cloudinary.com/
- Sign up for free account

### 2. Get credentials:
- After login, go to Dashboard
- Copy the information:
  - **Cloud Name**
  - **API Key**
  - **API Secret**

### 3. Update backend .env:
Paste the information into `backend/.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Restart backend server:
```bash
# In backend terminal, stop server (Ctrl+C) and restart
npm run start:dev
```

## ✅ Verify Installation

### 1. Check Backend:
- Open browser: `http://localhost:3001/api`
- You will see Swagger API documentation

### 2. Check Frontend:
- Open browser: `http://localhost:3000`
- You will see the Inkory home page

### 3. Test user registration:
- Click "Get started" or visit: `http://localhost:3000/register`
- Create new account
- Login and test features

## 🧪 Test Main Features

1. **Register / Login**: ✓
2. **Write blog with Markdown**: Visit `/write`
3. **Upload images**: Test cover image and editor images
4. **Claps**: Click clap on articles
5. **Comments**: Write comments on articles
6. **Bookmarks**: Bookmark articles
7. **Follow users**: Follow other authors
8. **Search**: Search for articles
9. **Tags**: Filter by tags
10. **Feed**: View feed from followed users

## 🐛 Troubleshooting

### Backend cannot connect to database:
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL if not running
brew services start postgresql@14

# Test connection
psql -U postgres -d inkory_db
```

### Port already in use:
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change port in backend/.env
PORT=3002
```

### Frontend cannot connect to Backend:
- Check backend is running: `http://localhost:3001/api`
- Check `frontend/.env.local` has correct backend URL
- Clear browser cache and reload

### CORS Error:
- Backend already configured CORS for `http://localhost:3000`
- If using different port, update in `backend/src/main.ts`

## 📚 Main API Endpoints

### Authentication:
- `POST /auth/register` - Register
- `POST /auth/login` - Login

### Articles:
- `GET /articles` - Get articles list
- `GET /articles/:id` - Article details
- `POST /articles` - Create new article (requires auth)
- `PUT /articles/:id` - Update article (requires auth)
- `DELETE /articles/:id` - Delete article (requires auth)
- `GET /articles/search?q=query` - Search
- `GET /articles/feed` - Feed (requires auth)

### Comments:
- `GET /articles/:articleId/comments` - Get comments
- `POST /articles/:articleId/comments` - Create comment (requires auth)

### Claps:
- `POST /articles/:articleId/claps` - Clap article (requires auth)
- `GET /articles/:articleId/claps` - Get claps count

### User:
- `GET /users/profile` - Current user profile (requires auth)
- `PUT /users/profile` - Update profile (requires auth)
- `GET /users/:username` - Other user profile

### Upload:
- `POST /upload/image` - Upload image (requires auth)

## 🚀 Production Deployment

### Backend (Railway/Render):
1. Push code to Git
2. Connect Git repo with Railway/Render
3. Set environment variables
4. Deploy

### Frontend (Vercel):
1. Push code to Git
2. Import project into Vercel
3. Set `NEXT_PUBLIC_API_URL` = backend production URL
4. Deploy

## 📝 Notes

- Database will auto-sync when `NODE_ENV=development`
- In production use migrations instead of sync
- JWT token expires after 7 days (config in .env)
- Maximum claps per user: 50 (engagement feature)
- Images uploaded via Cloudinary have free tier limits

## 💡 Tips

1. Use Swagger docs to test API: `http://localhost:3001/api`
2. Check backend logs for debugging
3. Use PostgreSQL GUI tool like pgAdmin or TablePlus to view database
4. Enable React DevTools for frontend debugging
5. Check Network tab in browser for API debugging

## 🎉 Happy Coding!

If you encounter any issues, check each step again or review logs for debugging.
