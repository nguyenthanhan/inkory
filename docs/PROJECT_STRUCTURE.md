# Inkory - Project Structure

## 📁 Directory Layout

```
inkory/
├── backend/                          # NestJS Backend
│   ├── src/
│   │   ├── auth/                    # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   │
│   │   ├── users/                   # User management
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   │       └── update-user.dto.ts
│   │   │
│   │   ├── articles/                # Article CRUD
│   │   │   ├── articles.controller.ts
│   │   │   ├── articles.service.ts
│   │   │   ├── articles.module.ts
│   │   │   └── dto/
│   │   │       ├── create-article.dto.ts
│   │   │       └── update-article.dto.ts
│   │   │
│   │   ├── comments/                # Comments system
│   │   │   ├── comments.controller.ts
│   │   │   ├── comments.service.ts
│   │   │   ├── comments.module.ts
│   │   │   └── dto/
│   │   │       └── create-comment.dto.ts
│   │   │
│   │   ├── claps/                   # Claps feature
│   │   │   ├── claps.controller.ts
│   │   │   ├── claps.service.ts
│   │   │   └── claps.module.ts
│   │   │
│   │   ├── bookmarks/               # Bookmarks feature
│   │   │   ├── bookmarks.controller.ts
│   │   │   ├── bookmarks.service.ts
│   │   │   └── bookmarks.module.ts
│   │   │
│   │   ├── follows/                 # Follow system
│   │   │   ├── follows.controller.ts
│   │   │   ├── follows.service.ts
│   │   │   └── follows.module.ts
│   │   │
│   │   ├── tags/                    # Tags management
│   │   │   ├── tags.controller.ts
│   │   │   ├── tags.service.ts
│   │   │   └── tags.module.ts
│   │   │
│   │   ├── upload/                  # File upload
│   │   │   ├── upload.controller.ts
│   │   │   ├── upload.service.ts
│   │   │   └── upload.module.ts
│   │   │
│   │   ├── entities/                # Database entities
│   │   │   ├── user.entity.ts
│   │   │   ├── article.entity.ts
│   │   │   ├── comment.entity.ts
│   │   │   ├── clap.entity.ts
│   │   │   ├── bookmark.entity.ts
│   │   │   ├── follow.entity.ts
│   │   │   └── tag.entity.ts
│   │   │
│   │   ├── config/                  # Configuration
│   │   │   ├── typeorm.config.ts
│   │   │   └── cloudinary.config.ts
│   │   │
│   │   ├── app.module.ts            # Root module
│   │   └── main.ts                  # Entry point
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                         # Next.js Frontend
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx             # Registration page
│   │   │
│   │   ├── write/
│   │   │   └── page.tsx             # Write article page
│   │   │
│   │   ├── article/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx         # Article detail page
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx     # Edit article page
│   │   │
│   │   ├── feed/
│   │   │   └── page.tsx             # Personalized feed
│   │   │
│   │   ├── bookmarks/
│   │   │   └── page.tsx             # Bookmarks page
│   │   │
│   │   ├── search/
│   │   │   └── page.tsx             # Search page
│   │   │
│   │   ├── tag/
│   │   │   └── [name]/
│   │   │       └── page.tsx         # Tag page
│   │   │
│   │   ├── profile/
│   │   │   └── [username]/
│   │   │       └── page.tsx         # User profile page
│   │   │
│   │   └── settings/
│   │       └── page.tsx             # User settings page
│   │
│   ├── components/                  # Reusable components
│   │   ├── Header.tsx               # Navigation header
│   │   ├── ArticleCard.tsx          # Article card component
│   │   ├── MarkdownEditor.tsx       # Markdown editor
│   │   ├── ClapButton.tsx           # Clap button
│   │   └── AuthProvider.tsx         # Auth context provider
│   │
│   ├── lib/                         # Utilities
│   │   ├── api.ts                   # Axios API client
│   │   └── utils.ts                 # Helper functions
│   │
│   ├── store/                       # State management
│   │   └── authStore.ts             # Zustand auth store
│   │
│   ├── types/                       # TypeScript types
│   │   └── index.ts                 # Type definitions
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .env.local.example
│   ├── .eslintrc.json
│   └── .gitignore
│
├── README.md                        # Project overview
├── SETUP.md                         # Detailed setup guide
├── QUICKSTART.md                    # Quick start guide
├── FEATURES.md                      # Features documentation
├── API.md                           # API documentation
├── PROJECT_STRUCTURE.md             # This file
└── .gitignore                       # Git ignore rules
```

## 🔄 Data Flow

### Authentication Flow
```
User Registration/Login
    ↓
Backend validates credentials
    ↓
JWT token generated
    ↓
Token stored in localStorage
    ↓
Token included in API requests
    ↓
Protected routes accessible
```

### Article Creation Flow
```
User clicks "Write"
    ↓
Opens write page
    ↓
User fills title, content (Markdown)
    ↓
Optional: Upload cover image to Cloudinary
    ↓
Add tags
    ↓
Click Publish
    ↓
POST /articles endpoint
    ↓
Article saved to PostgreSQL
    ↓
Redirect to article page
```

### Article Reading Flow
```
User visits home/feed
    ↓
Frontend fetches articles from API
    ↓
Display article cards
    ↓
User clicks article
    ↓
GET /articles/:id endpoint
    ↓
View count incremented
    ↓
Display full article with Markdown rendering
    ↓
Show comments, claps, bookmarks
```

## 🗄️ Database Schema

### Users Table
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- username (VARCHAR)
- bio (TEXT, nullable)
- avatar (VARCHAR, nullable)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Articles Table
```sql
- id (UUID, PK)
- title (VARCHAR)
- subtitle (VARCHAR, nullable)
- content (TEXT)
- coverImage (VARCHAR, nullable)
- viewCount (INT, default 0)
- readingTime (INT)
- published (BOOLEAN, default true)
- authorId (UUID, FK → Users)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Comments Table
```sql
- id (UUID, PK)
- content (TEXT)
- authorId (UUID, FK → Users)
- articleId (UUID, FK → Articles)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Claps Table
```sql
- id (UUID, PK)
- count (INT, default 1, max 50)
- userId (UUID, FK → Users)
- articleId (UUID, FK → Articles)
- UNIQUE(userId, articleId)
- createdAt (TIMESTAMP)
```

### Bookmarks Table
```sql
- id (UUID, PK)
- userId (UUID, FK → Users)
- articleId (UUID, FK → Articles)
- UNIQUE(userId, articleId)
- createdAt (TIMESTAMP)
```

### Follows Table
```sql
- id (UUID, PK)
- followerId (UUID, FK → Users)
- followingId (UUID, FK → Users)
- UNIQUE(followerId, followingId)
- createdAt (TIMESTAMP)
```

### Tags Table
```sql
- id (UUID, PK)
- name (VARCHAR, UNIQUE)
- description (TEXT, nullable)
- createdAt (TIMESTAMP)
```

### ArticleTags Table (Junction)
```sql
- articleId (UUID, FK → Articles)
- tagId (UUID, FK → Tags)
- PRIMARY KEY(articleId, tagId)
```

## 🔌 API Modules

### Auth Module
- Register user
- Login user
- JWT token generation

### Users Module
- Get user profile
- Update profile
- Get user by username

### Articles Module
- CRUD operations
- Search articles
- Get user feed
- Get user articles
- Calculate reading time

### Comments Module
- Create comment
- Get article comments
- Delete comment

### Claps Module
- Clap article
- Get claps count
- Get user claps

### Bookmarks Module
- Toggle bookmark
- Get user bookmarks
- Check bookmark status

### Follows Module
- Toggle follow
- Get followers
- Get following
- Check following status

### Tags Module
- Get all tags
- Get popular tags
- Get tag details

### Upload Module
- Upload image to Cloudinary
- Validate file type/size

## 🎨 Frontend Components

### Pages (18 total)
- Home page
- Login page
- Register page
- Write article page
- Article detail page
- Edit article page
- Feed page
- Bookmarks page
- Search page
- Tag page
- User profile page
- Settings page

### Components (5 main)
- Header (navigation)
- ArticleCard (article preview)
- MarkdownEditor (write/edit)
- ClapButton (engagement)
- AuthProvider (auth context)

## 🔐 Security Features

- JWT authentication
- Password hashing (bcrypt)
- CORS configuration
- Input validation (class-validator)
- Protected routes
- Authorization checks
- SQL injection prevention (TypeORM)
- XSS protection (React)

## ⚡ Performance Optimizations

- Pagination on list endpoints
- Lazy loading images
- Code splitting (Next.js)
- Efficient database queries
- Cloudinary CDN for images
- Stateless authentication

## 📦 Dependencies Summary

### Backend
- NestJS 10.x
- TypeORM
- PostgreSQL driver
- JWT & Passport
- Cloudinary SDK
- Class Validator
- Swagger

### Frontend
- Next.js 14
- React 18
- TailwindCSS
- Zustand
- Axios
- React Markdown
- Lucide Icons

## 🚀 Deployment Structure

```
Production:
├── Backend (Railway/Render)
│   ├── PostgreSQL database
│   ├── Environment variables
│   └── Cloudinary credentials
│
└── Frontend (Vercel)
    ├── Next.js build
    ├── API URL pointing to backend
    └── Environment variables
```

## 📊 File Statistics

- **Backend**: ~50+ files
- **Frontend**: ~40+ files
- **Documentation**: 6 files
- **Total**: ~100+ files

## 🎯 Key Takeaways

1. **Modular Architecture**: Each feature is a separate module
2. **Type Safety**: Full TypeScript implementation
3. **Database Relations**: Proper foreign keys and constraints
4. **RESTful API**: Standard HTTP methods
5. **Modern Frontend**: Next.js 14 with App Router
6. **Scalable Design**: Ready for production deployment
7. **Well Documented**: Comprehensive guides and API docs

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
