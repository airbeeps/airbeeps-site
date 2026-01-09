---
layout: home

hero:
  name: Airbeeps
  text: Your RAG Assistant
  tagline: Self-hosted AI assistants powered by your documents. Complete control. Privacy-First. Production-ready.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/getting-started/quickstart
    - theme: alt
      text: View on GitHub
      link: https://github.com/airbeeps/airbeeps

features:
  - icon: 🚀
    title: Production Ready
    details: Built for real workloads with FastAPI, SQLAlchemy, and ChromaDB. Multi-assistant platform with configurable knowledge bases.

  - icon: 🔒
    title: Privacy First
    details: Self-hosted on your infrastructure. All data stays local with no external dependencies.

  - icon: 🔌
    title: Flexible LLMs
    details: Bring your own provider - OpenAI, Anthropic, Gemini, or any OpenAI-compatible API.

  - icon: 📚
    title: Smart Retrieval
    details: Hybrid search combining vector similarity with BM25. Multi-query expansion and reranking.

  - icon: 📄
    title: Multi-Format Support
    details: Ingest PDFs, DOCX, Markdown, Excel, and CSV with intelligent chunking and citations.

  - icon: ⚡
    title: Easy Setup
    details: Single pip install command. Embedded database and vector store. Web UI included.
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const actions = document.querySelector('.VPHero .actions')
  if (actions && !document.querySelector('.install-command')) {
    const installCmd = document.createElement('div')
    installCmd.className = 'install-command'
    installCmd.innerHTML = '<span style="opacity: 0.6;">$</span> pip install airbeeps && airbeeps run'
    actions.parentElement.appendChild(installCmd)
  }
})
</script>
