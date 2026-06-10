# Haridasa Kosha - Haridasa Compositions Digital Library

A modern web application showcasing the largest searchable digital library of Haridasa compositions from the Dvaita Vedanta tradition.

> **⚠️ Note:** This project is currently in an **early prototype phase**. Functionalities may be limited, and some data may be placeholder-based.

## 🎯 Project Overview

Haridasa Kosha is a digital repository dedicated to preserving and promoting the divine devotional compositions of the Haridasa tradition. The application features advanced search capabilities, detailed composer profiles, and complete composition information.

## ✨ Features

- **Homepage with Hero Section**
- **Advanced Search**
- **Composer Directory**
- **Library (Compositions Directory)** - Browse and search all Haridasa compositions.
- **Detailed Pages** for Composers and Compositions.
- **Ask AI** (Experimental) - AI companion to answer questions about Dasa Sahitya.
- **Multilingual Support** (English & Kannada).

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 4.3, PostCSS
- **Database**: PostgreSQL (Prisma ORM)
- **Deployment**: Configured for Neon Cloud PostgreSQL

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or LTS)
- Neon Cloud PostgreSQL account
- npm or yarn

### Installation

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Configure the following in your `.env` file (do **not** commit this file):
   ```env
   DATABASE_URL="your-neon-pooled-connection-string"
   DIRECT_URL="your-neon-direct-connection-string"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Key Directories

- `app/(catalog)/library/` - Compositions directory (formerly `compositions`)
- `app/ask-ai/` - AI companion interface

## 🌐 Deployment

For public launch, ensure you:
1. Use **Neon Cloud** for PostgreSQL.
2. Use platform-native Secret Management for `DATABASE_URL`, `DIRECT_URL`, and `GEMINI_API_KEY`.
3. Never commit your `.env` file.

## 🤝 Contributing

Contributions are welcome!

## 📄 License

This project is open source and available under the MIT License.
