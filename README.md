# Production-API

A production-ready Express.js API template featuring PostgreSQL database integration with Neon, comprehensive security measures, Docker support, and modern developer tooling.

## 🚀 Key Technologies

- **Database**: [Neon](https://neon.com/) - Serverless PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- **Security**: [Arcjet](https://arcjet.com/) - Rate limiting, bot detection, and data protection
- **Framework**: [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- **Containerization**: Docker & Docker Compose - Development and production environments
- **Developer Tools**: [Warp](https://www.warp.dev/) - Modern terminal for enhanced productivity

## ✨ Features

- ✅ PostgreSQL database hosted on Neon (serverless)
- ✅ Drizzle ORM for type-safe database operations
- ✅ Rate limiting, bot detection, email validation, and data redaction via Arcjet
- ✅ Security headers with Helmet
- ✅ CORS configuration
- ✅ Request logging with Winston and Morgan
- ✅ Environment-based configuration (development & production)
- ✅ ESLint + Prettier for code quality
- ✅ Hot reload in development mode
- ✅ Cookie parsing support
- ✅ **Docker support with Neon Local for development**
- ✅ **Production-ready Docker configuration**
- ✅ **Health checks for both dev and prod**
- ✅ **Automatic database migrations on container startup**

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

- **For Local Development (Non-Docker)**:
  - Node.js (v20 or higher)
  - npm or yarn
  - Neon account (for PostgreSQL database)

- **For Docker Development**:
  - Docker Desktop (Windows/Mac) or Docker Engine (Linux)
  - Docker Compose v2.0+
  - Neon account with API key

### 🐳 Docker Setup (Recommended)

#### Development Environment with Neon Local

Neon Local allows you to run a local PostgreSQL database with Neon's ephemeral branching capabilities.

1. **Clone the repository**

   ```bash
   git clone https://github.com/Vishwa-ud/Production-API.git
   cd Production-API
   ```

2. **Configure environment for development**

   The `.env.development` file is already configured for Neon Local. Update the following values:

   ```env
   # Neon Local Configuration
   NEON_API_KEY=napi_v7ss391f3vhi9m2lrq3i6cuikxs3qt4gz0dyjrryowsjk8iy5irg1fx29h36c2zm
   NEON_PROJECT_ID=your-project-id-here
   PARENT_BRANCH_ID=your-parent-branch-id-here

   # Other configurations
   JWT_SECRET=your-dev-jwt-secret
   COOKIE_SECRET=your-dev-cookie-secret
   ARCJET_KEY=your-arcjet-key-here
   ```

3. **Start the development environment**

   ```bash
   docker-compose -f docker-compose.dev.yaml up --build
   ```

   This will:
   - Start Neon Local proxy on port 5432
   - Build and start your application on port 3000
   - Automatically run database migrations
   - Enable hot-reload for code changes

4. **Access the application**
   - API: http://localhost:3000
   - Health Check: http://localhost:3000/health

5. **Stop the development environment**
   ```bash
   docker-compose -f docker-compose.dev.yaml down
   ```

#### Production Environment with Neon Cloud

1. **Configure environment for production**

   Update `.env.production` with your Neon Cloud credentials:

   ```env
   # Database Configuration (Neon Cloud)
   DATABASE_URL=postgres://user:password@your-project.neon.tech/neondb?sslmode=require

   # Security - Use strong secrets!
   JWT_SECRET=CHANGE_THIS_TO_A_STRONG_SECRET
   COOKIE_SECRET=CHANGE_THIS_TO_A_STRONG_COOKIE_SECRET

   # CORS - Your production domain
   CORS_ORIGIN=https://your-production-domain.com

   # Neon Configuration
   NEON_API_KEY=napi_v7ss391f3vhi9m2lrq3i6cuikxs3qt4gz0dyjrryowsjk8iy5irg1fx29h36c2zm
   NEON_PROJECT_ID=your-production-project-id
   PARENT_BRANCH_ID=your-production-parent-branch-id
   ```

2. **Run in Development**

   ```bash
   npm run dev:docker (bash)
   ```

3. **Deploy to production**

   ```bash
   npm run prod:docker (bash)
   ```

   This will:
   - Build a production-optimized image
   - Connect to your Neon Cloud database
   - Run database migrations
   - Start the application with resource limits
   - Run in detached mode

   ```

   ```

### 💻 Non-Docker Setup (Traditional)

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

### Docker Commands

| Command                                                    | Description                                   |
| ---------------------------------------------------------- | --------------------------------------------- |
| `docker-compose -f docker-compose.dev.yaml up --build`     | Start development environment with Neon Local |
| `docker-compose -f docker-compose.dev.yaml down`           | Stop development environment                  |
| `docker-compose -f docker-compose.dev.yaml logs -f`        | View development logs                         |
| `docker-compose -f docker-compose.prod.yaml up --build -d` | Start production environment (detached)       |
| `docker-compose -f docker-compose.prod.yaml down`          | Stop production environment                   |
| `docker-compose -f docker-compose.prod.yaml logs -f app`   | View production logs                          |

### NPM Scripts

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start development server with hot reload      |
| `npm start`            | Start production server                       |
| `npm run lint`         | Run ESLint to check code quality              |
| `npm run lint:fix`     | Auto-fix ESLint issues                        |
| `npm run format`       | Format code with Prettier                     |
| `npm run format:check` | Check code formatting without making changes  |
| `npm run db:generate`  | Generate database migration files from schema |
| `npm run db:migrate`   | Apply pending migrations to database          |
| `npm run db:studio`    | Open Drizzle Studio (database GUI)            |

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
- **JWT**: JSON Web Token authentication
- **Zod**: Runtime type validation
- **Winston & Morgan**: Comprehensive logging

## 🐳 Docker Architecture

### Development Setup

```
┌─────────────────────────────────────────┐
│         Docker Compose (Dev)            │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │              │    │              │  │
│  │  Neon Local  │◄───│  Your App    │  │
│  │   (Proxy)    │    │ (Dev Mode)   │  │
│  │              │    │              │  │
│  │  Port: 5432  │    │  Port: 3000  │  │
│  └──────────────┘    └──────────────┘  │
│                                         │
│  - Ephemeral branches                   │
│  - Hot reload enabled                   │
│  - Volume mounting                      │
│  - Health checks                        │
└─────────────────────────────────────────┘
```

### Production Setup

```
┌─────────────────────────────────────────┐
│         Docker Compose (Prod)           │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐                       │
│  │              │                       │
│  │  Your App    │───────────────┐       │
│  │ (Prod Mode)  │               │       │
│  │              │               ▼       │
│  │  Port: 3000  │        ┌────────────┐ │
│  └──────────────┘        │ Neon Cloud │ │
│                          │ (External) │ │
│  - Resource limits       └────────────┘ │
│  - No volume mounting                   │
│  - Optimized build                      │
│  - Health checks                        │
└─────────────────────────────────────────┘
```

## 🔄 Environment Variable Switching

The application automatically uses the correct database based on the environment:

- **Development (Docker)**: `DATABASE_URL=postgres://user:password@neon-local:5432/neondb`
- **Production (Docker)**: `DATABASE_URL=postgres://user:password@your-project.neon.tech/neondb?sslmode=require`

Environment files:

- `.env.development` → Used by `docker-compose.dev.yaml`
- `.env.production` → Used by `docker-compose.prod.yaml`
- `.env.example` → Template for manual setup

## 📊 Health Checks

Both development and production environments include health checks:

**Endpoint**: `GET /health`

**Response**:

```json
{
  "status": "OK",
  "timestamp": "2025-11-27T10:30:00.000Z",
  "uptime": 123.456
}
```

**Docker Health Check Configuration**:

- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3
- **Start Period**: 40 seconds

## 🧪 Development

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Node.js watch mode** for automatic server restart during development
- **Docker volumes** for live code updates without rebuilding

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
