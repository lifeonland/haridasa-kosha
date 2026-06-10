# 🚀 Haridasa Kosha - Setup & Getting Started

> **⚠️ Note:** This project is in an **early prototype phase**. Functionalities may be limited, and some data may be placeholders.

---

## 🛠️ Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Configure your `.env` with the following:
```env
# Database (Use Neon Cloud PostgreSQL)
DATABASE_URL="your-pooled-connection-string"
DIRECT_URL="your-direct-connection-string"

# AI Integration
GEMINI_API_KEY="your-gemini-api-key"
```

### Step 3: Initialize Database
```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed with sample data
npm run prisma:seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

---

## 📁 Project Structure Overview

```
Haridasa Kosha/
├── app/
│   ├── (marketing)/          # Public pages (home, about)
│   ├── (catalog)/            # Main catalog
│   │   ├── library/          # Compositions directory
│   │   └── composers/        # Composers directory
│   └── ask-ai/               # AI companion (Experimental)
├── components/               # UI & shared components
├── lib/                      # Database & utility functions
└── prisma/                   # Database schema & seeding
```

---

## 🔗 Key Routes

- **Homepage**: `/`
- **Library**: `/library`
- **Composers**: `/haridasaru`
- **Ask AI**: `/ask-ai`

---

## 🚀 Deployment

For public launch, ensure you:
1. Use **Neon Cloud** for PostgreSQL.
2. Use platform-native Secret Management for `DATABASE_URL`, `DIRECT_URL`, and `GEMINI_API_KEY`.
3. Never commit your `.env` file to version control.

---

**Happy exploring! 🙏 May this application preserve and celebrate the divine heritage of the Haridasa tradition.**
