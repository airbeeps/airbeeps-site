# Ingestion & Chunking

When you upload a document, Airbeeps runs an **ingestion pipeline** that extracts content, splits it into chunks, and stores vectors for retrieval.

## Pipeline overview

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Upload  │───▶│ Extract │───▶│  Chunk  │───▶│  Embed  │───▶ ChromaDB
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

## Content extraction

Airbeeps uses specialized extractors for each file type:

| File type | Extractor | Notes |
|-----------|-----------|-------|
| PDF | PyMuPDF | Extracts text, preserves layout hints |
| DOCX | python-docx | Paragraphs and tables |
| TXT/MD | Direct read | UTF-8 encoding |
| Excel/CSV | pandas | Row-based processing |

### PDF processing

PDFs are processed page by page. The extractor:

1. Extracts raw text from each page
2. Preserves paragraph boundaries where possible
3. Handles multi-column layouts (best effort)

:::info
Scanned PDFs without embedded text are not currently supported. Use OCR preprocessing if needed.
:::

## Chunking strategies

### Text-based chunking (default)

For most documents, Airbeeps uses **recursive character splitting**:

1. Split on paragraph boundaries (`\n\n`)
2. If chunks are still too large, split on sentences
3. If still too large, split on words
4. Add overlap between adjacent chunks

```python
# Conceptual example
chunks = chunker.chunk_document(
    content,
    chunk_size=1000,      # Target tokens per chunk
    chunk_overlap=200,    # Overlapping tokens
    max_tokens_per_chunk=1000
)
```

### Row-wise chunking (Excel/CSV)

Tabular files get special treatment:

- Each row becomes a separate chunk
- Column headers are prepended: `Column: Value`
- Empty cells are skipped
- Token limit is still enforced (long rows are truncated)

This preserves the structure and enables **per-row citations**.

## Chunk metadata

Every chunk includes rich metadata:

```json
{
  "chunk_id": "uuid",
  "document_id": "uuid",
  "knowledge_base_id": "uuid",
  "chunk_index": 0,
  "title": "Document title",
  "file_path": "files/abc123.pdf",
  "file_type": "pdf",
  "embedding_model_id": "uuid",
  "embedding_model_name": "text-embedding-3-small"
}
```

For Excel files, additional fields:

```json
{
  "sheet": "Sheet1",
  "row_number": 42,
  "original_filename": "data.xlsx"
}
```

## Token counting

Airbeeps uses `tiktoken` with the `cl100k_base` encoding (GPT-4 tokenizer) to count tokens consistently. This ensures chunk sizes work well with most modern LLMs.

## Ingestion profiles (experimental)

For advanced tabular processing, you can define **ingestion profiles** that control:

- Which columns to include
- Custom text templates per row
- Metadata extraction rules

Profiles are configured via the API and applied during ingestion.

## Monitoring ingestion

Document status values:

| Status | Meaning |
|--------|---------|
| `INDEXING` | Currently processing |
| `ACTIVE` | Successfully indexed |
| `FAILED` | Indexing failed (check logs) |
| `DELETED` | Soft-deleted |

Check the admin UI or API for failed documents and review backend logs for details.

## Data cleaning

Airbeeps applies optional cleaners during ingestion:

- Unicode normalization
- Whitespace collapse
- HTML tag stripping (if present)

Enable via the `clean_data` flag during upload.

