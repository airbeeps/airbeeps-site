# Introduction

**Airbeeps** is a self-hosted, local-first assistant-based **Retrieval-Augmented Generation (RAG)** system for individuals and small teams who want to build AI assistants on top of their own documents.

You run it yourself, upload your data, and interact with multiple AI assistants backed by your private knowledge base. All data stays on your machine or server.

## Who is this for?

Airbeeps is well suited for:

- **Individuals** running personal or local AI assistants
- **Small teams** sharing internal documents
- **Internal tools**, labs, and early production setups
- **Developers** who want a hackable, self-hosted RAG system

## Quick install

```bash
pip install airbeeps
airbeeps run
```

Open `http://localhost:8500` and sign up — the first user becomes admin.

## Key features

### Multi-Assistant Platform
Create multiple assistants with configurable system prompts, model parameters, and knowledge base access.

### RAG Knowledge Base
Upload PDFs, DOCX, TXT, Markdown, Excel, and CSV. Automatic chunking, vector embedding, and semantic search with citations.

### Pluggable LLM Providers
Uses LiteLLM to support OpenAI, Anthropic, Gemini, and any OpenAI-compatible API.

### Local-First
All data (database, files, vectors) stored locally with no external dependencies. SQLite + ChromaDB by default.

## Next steps

- [Quickstart](/docs/getting-started/quickstart) — Get up and running in 5 minutes
- [Configuration](/docs/getting-started/configuration) — Environment variables and settings
- [Knowledge Bases](/docs/core-concepts/knowledge-bases) — Learn how document storage works
- [Retrieval](/docs/core-concepts/retrieval) — Understand dense, hybrid, and rerank strategies

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | FastAPI, SQLAlchemy, Alembic, LangChain, LiteLLM |
| Vector Store | ChromaDB (embedded or server mode) |
| Frontend | Nuxt 3, Vue 3, TailwindCSS, Reka UI |
| Auth | FastAPI Users (JWT, OAuth) |

## License

Airbeeps is open source under the [MIT License](https://github.com/airbeeps/airbeeps/blob/main/LICENSE).

