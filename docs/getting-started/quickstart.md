# Quickstart

Get Airbeeps up and running in 5 minutes.

## Requirements

- **Python 3.13+** with [`uv`](https://docs.astral.sh/uv/) (recommended) or pip
- **Node.js 20+** with [`pnpm`](https://pnpm.io/) (for development mode)

## Option 1: Install from PyPI

The fastest way to get started:

```bash
pip install airbeeps
airbeeps run
```

Open `http://localhost:8500` and sign up. The first registered user automatically becomes an admin.

## Option 2: Development setup

For contributors or those who want to modify the source:

### 1. Clone the repository

```bash
git clone https://github.com/airbeeps/airbeeps.git
cd airbeeps
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
```

Generate a secret key and add it to `.env`:

**Linux/macOS:**
```bash
echo "AIRBEEPS_SECRET_KEY=$(openssl rand -hex 32)" >> .env
```

**Windows PowerShell:**
```powershell
"AIRBEEPS_SECRET_KEY=$(openssl rand -hex 32)" | Out-File .env -Append
```

### 3. Install dependencies and initialize the database

```bash
uv sync --locked
uv run scripts/bootstrap.py init
```

### 4. Start the backend

```bash
uv run fastapi dev --port 8500 airbeeps/main.py
```

Backend runs at `http://localhost:8500`

### 5. Start the frontend (in another terminal)

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend runs at `http://localhost:3000`

### 6. Create your account

Open `http://localhost:3000` and sign up. The first user becomes admin.

## Bootstrap options

The `bootstrap.py init` command handles migrations and seeding:

| Flag | Description |
|------|-------------|
| `--skip-migrate` | Skip database migrations |
| `--skip-seed` | Skip seeding default data |
| `--seed-file path/to/custom.yaml` | Use a custom seed file |

If you add new system config keys later, reseed defaults with:

```bash
uv run scripts/bootstrap.py config-init
```

## Admin CLI reference

All commands run from the `backend/` directory:

| Command | Description |
|---------|-------------|
| `bootstrap.py init` | Full initialization (migrations + seeding) |
| `bootstrap.py migrate` | Run migrations only |
| `bootstrap.py config-init` | Reseed system configs from YAML |
| `bootstrap.py reset-db --force` | Drop all data (dev only) |
| `bootstrap.py superuser --email user@example.com` | Create an admin manually |
| `bootstrap.py list-superusers` | List all admin users |

## Next steps

:::tip
Configure your LLM provider first! Without one, the chat won't work.
:::

1. **Configure LLM providers** at `/admin/model-providers`
2. **Create your first assistant** at `/admin/assistants`
3. **Upload documents** to a knowledge base at `/admin/kbs`
4. **Start chatting!**

See [Configuration](/docs/getting-started/configuration) for all available settings.

