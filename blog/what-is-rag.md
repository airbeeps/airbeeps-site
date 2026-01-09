---
title: What is RAG?
description: Retrieval-Augmented Generation explained — what it is, why it matters, and how Airbeeps implements it.
date: 2026-01-06
---

# What is RAG?

**Retrieval-Augmented Generation (RAG)** is a technique that combines the power of large language models with external knowledge retrieval. Instead of relying solely on what the model learned during training, RAG lets you ground responses in your own documents.

## The problem with vanilla LLMs

Large language models like GPT-4 or Claude are trained on massive datasets, but they have limitations:

1. **Knowledge cutoff** — They don't know about events or documents after their training date
2. **No access to private data** — They can't read your company docs, PDFs, or internal wikis
3. **Hallucinations** — They sometimes make up plausible-sounding but incorrect information
4. **No citations** — You can't trace answers back to source documents

## How RAG solves this

RAG adds a **retrieval step** before generation:

```
User Question
      ↓
┌─────────────┐
│   Retrieve  │ ← Search your documents
│   Relevant  │
│   Chunks    │
└─────────────┘
      ↓
┌─────────────┐
│  Augment    │ ← Add chunks to prompt
│   Prompt    │
└─────────────┘
      ↓
┌─────────────┐
│  Generate   │ ← LLM answers with context
│  Response   │
└─────────────┘
      ↓
Grounded Answer + Citations
```

The key steps:

1. **Index** — Convert your documents into searchable vector embeddings
2. **Retrieve** — When a user asks a question, find the most relevant chunks
3. **Augment** — Include those chunks in the LLM prompt as context
4. **Generate** — The LLM answers based on the provided context

## Why vectors?

Traditional keyword search (like Ctrl+F) only finds exact matches. But users rarely phrase questions exactly like your documents.

**Vector embeddings** capture semantic meaning. A query like "How do I change my password?" will match a document that says "To update your account credentials..." even though they share no keywords.

```
"reset password" → [0.12, -0.34, 0.56, ...]
"update credentials" → [0.11, -0.32, 0.58, ...]
                        ↑ Similar vectors!
```

## RAG vs fine-tuning

| Approach | Best for | Tradeoffs |
|----------|----------|-----------|
| **RAG** | Dynamic, frequently updated content; need citations; privacy-sensitive data | Requires retrieval infrastructure |
| **Fine-tuning** | Teaching new behaviors or styles; domain-specific terminology | Expensive, static, no citations |

Most production systems use RAG because:
- Documents change frequently
- Users need to verify answers with sources
- You want to keep data private (no sharing with model providers)

## How Airbeeps implements RAG

Airbeeps provides a complete RAG stack:

### 1. Ingestion

Upload documents (PDF, DOCX, Markdown, Excel). They're parsed and split into chunks optimized for retrieval.

```python
# Airbeeps uses intelligent chunking
chunk_size = 1000  # tokens
chunk_overlap = 200  # overlap for context continuity
```

### 2. Embedding

Each chunk is converted to a vector using models like OpenAI's `text-embedding-3-small` or local alternatives.

### 3. Storage

Vectors are stored in ChromaDB — either embedded (single binary) or as a separate server.

### 4. Retrieval

When you ask a question, Airbeeps supports multiple strategies:

- **Dense search** — Standard vector similarity
- **Hybrid search** — Combine vectors with BM25 keyword matching
- **Multi-query** — Expand your question into variations for better recall
- **Reranking** — Re-score top candidates for precision

### 5. Generation

Retrieved chunks are injected into the prompt, and the LLM generates a response with citations pointing back to source documents.

## Example flow

```
User: "What's the refund policy for enterprise customers?"

1. Embed query → [0.23, -0.45, ...]

2. Search knowledge base → 
   - Chunk from "enterprise-pricing.pdf" (score: 0.91)
   - Chunk from "refund-policy.md" (score: 0.87)
   - Chunk from "faq.docx" (score: 0.72)

3. Augment prompt:
   "Based on the following context, answer the question...
   
   [Context from retrieved chunks]
   
   Question: What's the refund policy for enterprise customers?"

4. LLM generates:
   "Enterprise customers are eligible for a full refund within
   30 days of purchase, as stated in the Enterprise Agreement
   section 4.2 [1]. After 30 days, pro-rated refunds are
   available for annual subscriptions [2]."
   
   Citations:
   [1] enterprise-pricing.pdf, page 3
   [2] refund-policy.md
```

## Getting started

Ready to build your own RAG system? Install Airbeeps:

```bash
pip install airbeeps
airbeeps run
```

Then:
1. Configure an LLM provider (OpenAI, Anthropic, etc.)
2. Create a knowledge base
3. Upload your documents
4. Start chatting!

Check out our [quickstart guide](/docs/getting-started/quickstart) to get up and running in 5 minutes.

---

*Have questions about RAG or Airbeeps? Open an issue on [GitHub](https://github.com/airbeeps/airbeeps).*

