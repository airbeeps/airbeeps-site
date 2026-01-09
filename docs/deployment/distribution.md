# Distribution

Airbeeps can be distributed as a Python wheel for easy installation.

## Quick install

```bash
pip install airbeeps
airbeeps run
```

Open `http://localhost:8500` and sign up.

## Building from source

### Prerequisites

- **Python 3.13+** with `uv`
- **Node.js 18+** with `pnpm`

### Build the wheel

```bash
uv run scripts/build_wheel.py
```

This script:

1. Builds the Nuxt frontend (`pnpm run generate`)
2. Copies static assets to `backend/airbeeps/static/`
3. Builds the Python wheel with `uv build`
4. Outputs to `backend/dist/`
5. Cleans up temporary files

:::tip
Override the version with `--version 0.2.0` for specific releases.
:::

### Manual build

1. Build the frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm run generate
   ```

2. Copy static files:
   ```bash
   mkdir -p ../backend/airbeeps/static
   cp -r .output/public/* ../backend/airbeeps/static/
   ```

3. Build the wheel:
   ```bash
   cd ../backend
   uv build
   ```

## Package structure

```
airbeeps/
├── __init__.py
├── main.py              # FastAPI app
├── cli.py               # CLI entry point
├── config.py            # Configuration
├── migrations.py        # Programmatic Alembic
├── alembic/             # Database migrations
├── static/              # Bundled frontend
├── templates/           # Email templates
└── [other modules]
```

## Installation modes

### Installed (pip)
```bash
pip install airbeeps
airbeeps run
```

- Data stored in `~/.local/share/airbeeps` (Linux/Mac) or `%APPDATA%\airbeeps` (Windows)
- Migrations run automatically on first start
- Single port serves both API and frontend (8080)
- Embedded ChromaDB (no external services)

### Development
```bash
# Terminal 1 - Backend
cd backend
uv run fastapi dev airbeeps/main.py

# Terminal 2 - Frontend
cd frontend
pnpm dev
```

- Backend at `http://localhost:8500`
- Frontend at `http://localhost:3000`
- Hot reload for both

## CLI commands

| Command | Description |
|---------|-------------|
| `airbeeps run` | Start the server |
| `airbeeps info` | Show configuration |
| `airbeeps version` | Show version |
| `airbeeps --help` | All available commands |

## Version management

Airbeeps uses **dynamic versioning** from Git tags:

```bash
# Tag a release
git tag v0.2.0
git push origin v0.2.0

# Build will produce: airbeeps-0.2.0-py3-none-any.whl
```

Development builds include commit info: `0.1.0.post4+g8a2b3c`

## Publishing to PyPI

### Test PyPI

```bash
cd backend
uv publish --publish-url https://test.pypi.org/legacy/ dist/*
```

### Production PyPI

```bash
cd backend
uv publish dist/*
```

### GitHub Actions (recommended)

Add `PYPI_API_TOKEN` as a repository secret. Create a release on GitHub and the workflow handles building and publishing.

## Testing the build

```bash
# Create test environment
uv venv test-env
source test-env/bin/activate

# Install the wheel
uv pip install backend/dist/airbeeps-0.1.0-py3-none-any.whl

# Test
airbeeps run
```

## Dependencies

**Required:**
- Python 3.13+
- SQLite (usually included)

**Optional:**
- PostgreSQL/MySQL for production
- External ChromaDB server

## Troubleshooting

### Frontend not showing

- Check `backend/airbeeps/static/index.html` exists in the wheel
- Verify build script completed successfully

### Migrations failing

- Ensure `airbeeps/alembic/` directory is in the wheel
- Check `migrations.py` can locate alembic directory

### Import errors

- Use `airbeeps.` prefix for all imports, not `src.`

