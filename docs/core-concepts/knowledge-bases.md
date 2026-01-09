# Knowledge Bases

A **knowledge base** is a collection of documents that an assistant can search when answering questions. Each knowledge base has its own vector store collection and configuration.

## Key concepts

### Documents

A document is a single file or piece of content you upload. Supported formats:

| Format | Extensions | Notes |
|--------|------------|-------|
| PDF | `.pdf` | Full text extraction |
| Word | `.doc`, `.docx` | Microsoft Word documents |
| Plain text | `.txt`, `.md`, `.rtf` | Markdown supported |
| Spreadsheets | `.xlsx`, `.xls`, `.csv` | Row-wise chunking for citations |

### Chunks

Documents are split into **chunks** — smaller segments optimized for retrieval. Each chunk becomes a vector in the embedding space.

| Setting | Description | Default |
|---------|-------------|---------|
| `chunk_size` | Target tokens per chunk | `1000` |
| `chunk_overlap` | Overlapping tokens between chunks | `200` |

:::tip
Smaller chunks improve precision but may lose context. Larger chunks preserve context but reduce retrieval specificity. Start with defaults and tune based on your use case.
:::

### Embeddings

Each chunk is converted to a **vector embedding** — a numerical representation of its semantic meaning. Airbeeps supports multiple embedding models:

- OpenAI `text-embedding-3-small` / `text-embedding-3-large`
- Local models via sentence-transformers
- Any OpenAI-compatible embedding API

The embedding model is configured per knowledge base. Changing it requires reindexing.

## Creating a knowledge base

1. Navigate to `/admin/kbs` in the admin UI
2. Click **Create Knowledge Base**
3. Configure:
   - **Name** — descriptive identifier
   - **Embedding model** — select from configured models
   - **Chunk size** and **overlap** (optional)
4. Save and start uploading documents

## Uploading documents

You can upload files through:

1. **Admin UI** — drag and drop at `/admin/kbs/{id}`
2. **API** — `POST /api/v1/rag/knowledge-bases/{kb_id}/documents/upload`

### Deduplication strategies

When uploading a file that already exists (by hash or filename):

| Strategy | Behavior |
|----------|----------|
| `replace` | Delete existing document, add new one |
| `skip` | Keep existing, ignore upload |
| `version` | Add as new version with `(v2)` suffix |

## Indexing workflow

```
Upload → Extract content → Chunk → Embed → Store vectors
```

1. **Extract** — Parse file content (PDF text, DOCX paragraphs, etc.)
2. **Chunk** — Split into overlapping segments
3. **Embed** — Generate vector for each chunk
4. **Store** — Save to ChromaDB with metadata

### Excel/CSV special handling

Tabular files use **row-wise chunking** instead of text-based chunking:

- Each row becomes a separate chunk
- Column headers are included in chunk text
- Row numbers are preserved in metadata for citations

## Reindexing

If you change the embedding model or chunk settings, existing documents need reindexing:

```bash
# Via API
POST /api/v1/rag/knowledge-bases/{kb_id}/reindex
```

Or use the **Reindex** button in the admin UI.

:::warning
Reindexing regenerates all embeddings. This can be slow and expensive for large knowledge bases with paid embedding APIs.
:::

## Best practices

1. **One topic per KB** — group related documents together
2. **Use descriptive names** — makes assistant configuration easier
3. **Monitor document status** — check for `FAILED` documents after upload
4. **Test retrieval** — use the search endpoint to verify chunk quality

