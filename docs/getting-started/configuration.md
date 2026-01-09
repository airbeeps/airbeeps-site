# Configuration

Environment variables and configuration options for Airbeeps.

::: tip
Most configuration happens through the Admin UI after first launch. This page covers environment variables needed before starting the server.
:::

## Core Settings

### `AIRBEEPS_SECRET_KEY`

**Required** for production. Used for JWT token signing and session security.

```bash
# Generate a secure key
openssl rand -hex 32
```

Set in `.env`:
```
AIRBEEPS_SECRET_KEY=your-generated-key-here
```

### `AIRBEEPS_DATABASE_URL`

Database connection string. Defaults to SQLite in the data directory.

**Default:** `sqlite:///./data/airbeeps.db`

**PostgreSQL example:**
```
AIRBEEPS_DATABASE_URL=postgresql://user:pass@localhost/airbeeps
```

### `AIRBEEPS_DATA_DIR`

Directory for storing uploaded files, database, and vector store.

**Default:** `./data`

```bash
AIRBEEPS_DATA_DIR=/var/lib/airbeeps
```

## Server Settings

### `AIRBEEPS_HOST`

Host to bind the server to.

**Default:** `0.0.0.0`

### `AIRBEEPS_PORT`

Port to run the server on.

**Default:** `8500`

### `AIRBEEPS_CORS_ORIGINS`

Comma-separated list of allowed CORS origins.

**Default:** `http://localhost:3000,http://localhost:8500`

```bash
AIRBEEPS_CORS_ORIGINS=https://airbeeps.example.com,https://app.example.com
```

## LLM Provider Settings

Configure default provider credentials via environment variables, or set them in the Admin UI.

### OpenAI

```bash
OPENAI_API_KEY=sk-...
```

### Anthropic

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

### Google Gemini

```bash
GOOGLE_API_KEY=...
```

## ChromaDB Settings

### `CHROMA_MODE`

ChromaDB mode: `embedded` or `server`.

**Default:** `embedded`

### `CHROMA_HOST` & `CHROMA_PORT`

For server mode only:

```bash
CHROMA_MODE=server
CHROMA_HOST=localhost
CHROMA_PORT=8000
```

### `CHROMA_COLLECTION_PREFIX`

Prefix for ChromaDB collection names.

**Default:** `airbeeps_`

## Auth Settings

### `AIRBEEPS_REQUIRE_EMAIL_VERIFICATION`

Require users to verify email before logging in.

**Default:** `false`

### `AIRBEEPS_SMTP_HOST`, `AIRBEEPS_SMTP_PORT`

SMTP settings for email verification (if enabled).

```bash
AIRBEEPS_SMTP_HOST=smtp.gmail.com
AIRBEEPS_SMTP_PORT=587
AIRBEEPS_SMTP_USER=your-email@gmail.com
AIRBEEPS_SMTP_PASSWORD=your-app-password
AIRBEEPS_FROM_EMAIL=noreply@airbeeps.com
```

## Development Settings

### `AIRBEEPS_DEBUG`

Enable debug mode with verbose logging.

**Default:** `false`

```bash
AIRBEEPS_DEBUG=true
```

### `AIRBEEPS_LOG_LEVEL`

Logging level: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`.

**Default:** `INFO`

## Example `.env` file

```bash
# Required
AIRBEEPS_SECRET_KEY=your-secret-key-here

# Database
AIRBEEPS_DATABASE_URL=sqlite:///./data/airbeeps.db
AIRBEEPS_DATA_DIR=./data

# Server
AIRBEEPS_HOST=0.0.0.0
AIRBEEPS_PORT=8500

# LLM Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# ChromaDB
CHROMA_MODE=embedded

# Development
AIRBEEPS_DEBUG=false
AIRBEEPS_LOG_LEVEL=INFO
```

## Runtime Configuration

Most settings can be configured through the Admin UI at `/admin/system`:

- Default models per provider
- Embedding models
- Chunking parameters
- Retrieval strategies
- System prompts

Changes made in the UI are stored in the database and persist across restarts.

