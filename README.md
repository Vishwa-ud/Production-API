# Production-API

A production-ready Express.js API template featuring PostgreSQL database integration, comprehensive security measures, and modern developer tooling.

## 🚀 Key Technologies

- **Database**: [Neon](https://neon.com/) - Serverless PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- **Security**: [Arcjet](https://arcjet.com/) - Rate limiting, bot detection, and data protection
- **Framework**: [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- **Developer Tools**: [Warp](https://www.warp.dev/) - Modern terminal for enhanced productivity

## ✨ Features

- ✅ PostgreSQL database hosted on Neon (serverless)
- ✅ Drizzle ORM for type-safe database operations
- ✅ Rate limiting, bot detection, email validation, and data redaction via Arcjet
- ✅ Security headers with Helmet
- ✅ CORS configuration
- ✅ Request logging with Winston and Morgan
- ✅ Environment-based configuration
- ✅ ESLint + Prettier for code quality
- ✅ Hot reload in development mode
- ✅ Cookie parsing support

## 📁 Project Structure

```
Production-API/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, logging, validation)
│   ├── models/          # Database schemas (Drizzle)
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic layer
│   ├── utils/           # Helper functions
│   ├── validations/     # Input validation schemas
│   ├── app.js           # Express app configuration
│   ├── server.js        # Server setup
│   └── index.js         # Application entry point
├── drizzle/             # Database migrations
├── .env                 # Environment variables (not tracked)
├── .env.example         # Environment variables template
├── drizzle.config.js    # Drizzle ORM configuration
└── package.json         # Project dependencies and scripts
```

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Neon account (for PostgreSQL database)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishwa-ud/Production-API.git
   cd Production-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgresql://user:password@host/database
   ```

4. **Generate database schema**
   ```bash
   npm run db:generate
   ```

5. **Run migrations**
   ```bash
   npm run db:migrate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting without making changes |
| `npm run db:generate` | Generate database migration files from schema |
| `npm run db:migrate` | Apply pending migrations to database |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |

## 🗄️ Database Management

### Creating a New Schema

1. Define your schema in `src/models/`:
   ```javascript
   import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
   
   export const users = pgTable('users', {
     id: serial('id').primaryKey(),
     name: text('name').notNull(),
     email: text('email').notNull().unique(),
     createdAt: timestamp('created_at').defaultNow(),
   });
   ```

2. Generate migration:
   ```bash
   npm run db:generate
   ```

3. Apply migration:
   ```bash
   npm run db:migrate
   ```

## 🔒 Security Features

- **Helmet**: Sets secure HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Arcjet**: Advanced bot protection and rate limiting
- **Cookie Parser**: Secure cookie handling
- **Environment Variables**: Sensitive data protection

## 🧪 Development

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Node.js watch mode** for automatic server restart during development

## 📝 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Vishwa-ud**
- GitHub: [@Vishwa-ud](https://github.com/Vishwa-ud)

## 🔗 Links

- Repository: [https://github.com/Vishwa-ud/Production-API](https://github.com/Vishwa-ud/Production-API)
- Issues: [https://github.com/Vishwa-ud/Production-API/issues](https://github.com/Vishwa-ud/Production-API/issues) 