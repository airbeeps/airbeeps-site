# System Configuration

Access the admin panel at `/admin/system-config` to control system-wide settings. These are stored in the database and take effect immediately.

## Chat UI controls

Toggle visibility of chat interface elements:

| Setting | Description |
|---------|-------------|
| **Share Button** | Share entire conversations |
| **Message Share** | Share individual messages |
| **Message Feedback** | Thumbs up/down on responses |
| **Message Stats** | Token usage and timing info |
| **Pin Button** | Pin conversations to top |
| **Create Button** | New conversation button |
| **Assistant Dropdown** | Switch assistants mid-chat |
| **Agent Thinking** | Show reasoning traces |
| **Chat Suggestions** | Starter questions on new chat |

## Follow-up questions

| Setting | Description |
|---------|-------------|
| **Generate Follow-ups** | Auto-suggest next questions after responses |
| **Question Count** | How many to generate (1-5) |

:::info
Follow-up generation uses an additional LLM call per response. Consider the cost impact.
:::

## Authentication & legal

| Setting | Description |
|---------|-------------|
| **User Registration** | Enable/disable new signups |
| **Terms & Privacy Links** | Show legal documents on signup form |

:::warning
Only enable terms and privacy links if you have proper legal documents set up.
:::

## Conversation titles

| Setting | Description |
|---------|-------------|
| **Auto-generate** | Uses first message as title |
| **AI Model** | Select a model to generate smart titles |

When an AI model is selected, titles are generated from the first message using that model.

## Assistant defaults

Set platform-wide defaults at `/admin/assistant-defaults`:

### Generation settings

| Setting | Description |
|---------|-------------|
| Temperature | Creativity/randomness (0-2) |
| Max tokens | Response length limit |
| Top P | Nucleus sampling parameter |
| Other LiteLLM params | Model-specific settings |

### RAG settings

| Setting | Description |
|---------|-------------|
| Retrieval count | Number of chunks to retrieve |
| Similarity threshold | Minimum score for inclusion |
| Search type | Similarity or MMR |
| Multi-query | Enable query expansion |
| Reranking | Re-score top candidates |
| Hybrid search | BM25 + dense fusion |

Individual assistants can override these defaults.

## Models & providers

### Managing providers (`/admin/providers`)

Add LLM providers with their API configuration:

- **OpenAI** — API key and base URL
- **Anthropic** — API key
- **Google Gemini** — API key
- **Custom** — Any OpenAI-compatible API

### Managing models (`/admin/models`)

Configure available models:

| Field | Description |
|-------|-------------|
| Name | API model identifier |
| Display name | Human-readable name |
| Provider | Which provider hosts this model |
| Capabilities | Chat, embedding, vision, etc. |
| Token limits | Context and output limits |
| Status | Active, inactive, or deprecated |

## Knowledge bases (`/admin/kbs`)

| Action | Description |
|--------|-------------|
| Create | New KB with embedding model and chunk settings |
| Upload | Add documents via drag-and-drop |
| Configure | Adjust chunking, embedding model |
| Reindex | Regenerate all embeddings |
| Delete | Remove KB and all documents |

## User management (`/admin/users`)

| Action | Description |
|--------|-------------|
| View users | List all users with activity info |
| Activate/deactivate | Control user access |
| Grant superuser | Promote to admin |
| Revoke superuser | Remove admin privileges |

:::tip
The first registered user automatically becomes a superuser.
:::

## OAuth providers (`/admin/oauth-providers`)

Configure social login:

1. **Google** — Client ID, secret, scopes
2. **GitHub** — Client ID, secret
3. **Microsoft** — Client ID, secret
4. **Custom** — Any OAuth 2.0 provider

Set user mapping rules (email, name, avatar).

## Analytics (`/admin/analytics`)

View usage statistics:

- Token usage trends
- Request counts
- Response latency
- Daily/weekly breakdowns

## Tips

- **Refresh frontend** after changing public configs to see changes
- **Test in incognito** to verify behavior for new users
- **Monitor analytics** to optimize model selection and costs
- **Keep terms hidden** unless you have proper legal documents

