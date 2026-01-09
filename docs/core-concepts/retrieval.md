# Retrieval

Retrieval is the core of RAG — finding the most relevant chunks from your knowledge base to include in the LLM prompt. Airbeeps supports multiple retrieval strategies.

## Retrieval modes

### Dense vector search (default)

Uses embedding similarity to find semantically related chunks:

1. Embed the user query with the same model used for documents
2. Find nearest neighbors in vector space
3. Return top-k chunks above the similarity threshold

```
Query: "How do I reset my password?"
        ↓ embed
   [0.12, -0.34, 0.56, ...]
        ↓ nearest neighbors
   Chunk A (score: 0.89)
   Chunk B (score: 0.85)
   Chunk C (score: 0.72)
```

### MMR (Maximal Marginal Relevance)

Balances relevance with diversity. Useful when top results are too similar:

```python
search_type="mmr"
mmr_lambda=0.5  # 0 = full diversity, 1 = full relevance
fetch_k=15      # Candidates to consider
k=5             # Final results
```

:::tip
Use MMR when your knowledge base has many similar documents and you want broader coverage.
:::

## Advanced retrieval features

### Multi-query expansion

Generate alternative phrasings of the user query to improve recall:

```python
multi_query=True
multi_query_count=3
```

Airbeeps uses **deterministic query rewriting** (no LLM call):

1. Original query
2. Simplified version (punctuation removed)
3. Sentence fragments (if query is complex)

Results from all queries are merged and deduplicated.

### Hybrid search (BM25 + dense)

Combine semantic search with lexical matching:

```python
hybrid_enabled=True
hybrid_corpus_limit=1000  # Max chunks for BM25 index
```

The hybrid pipeline:

1. Run dense vector search
2. Build lightweight BM25 index over recent chunks
3. Score chunks with both methods
4. Merge results (union of top candidates)

:::info
BM25 is computed in-memory per query. The `corpus_limit` prevents memory issues with large knowledge bases.
:::

### Reranking

Re-score top candidates using a more expensive similarity computation:

```python
rerank_top_k=10  # Rerank top 10 before returning top-k
```

By default, reranking uses embedding cosine similarity (approximates cross-encoder behavior without a dedicated reranker model).

## API parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `k` | int | Number of chunks to return | `5` |
| `fetch_k` | int | Candidates for MMR | `k * 3` |
| `score_threshold` | float | Minimum similarity score | `0.0` |
| `search_type` | string | `similarity` or `mmr` | `similarity` |
| `multi_query` | bool | Enable query expansion | `false` |
| `multi_query_count` | int | Number of query variants | `3` |
| `hybrid_enabled` | bool | Enable BM25 fusion | `false` |
| `hybrid_corpus_limit` | int | Max chunks for BM25 | `1000` |
| `rerank_top_k` | int | Chunks to rerank | — |

## Choosing a strategy

### Simple Q&A
Default dense search works well:
```python
k=5
search_type="similarity"
score_threshold=0.7
```

### Diverse Results
MMR with moderate diversity:
```python
k=5
search_type="mmr"
mmr_lambda=0.5
fetch_k=15
```

### High Recall
Multi-query + hybrid for comprehensive retrieval:
```python
k=8
multi_query=True
hybrid_enabled=True
rerank_top_k=15
```

## Platform defaults

Configure default RAG settings at `/admin/assistant-defaults`:

- **Retrieval count** (`k`)
- **Similarity threshold**
- **Search type** (similarity/MMR)
- **Multi-query** toggle
- **Hybrid search** toggle

Individual assistants can override these settings.

## Debugging retrieval

Use the search endpoint to test retrieval without chat:

```bash
POST /api/v1/rag/knowledge-bases/{kb_id}/search
{
  "query": "your question",
  "k": 5,
  "score_threshold": 0.5
}
```

Check returned scores and metadata to tune parameters.

