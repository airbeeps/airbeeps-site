# Airbeeps VitePress Site

Documentation and blog site for Airbeeps built with VitePress.

## Structure

- `/` - Landing page with hero and features
- `/docs/` - Documentation
- `/blog/` - Blog posts

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Tech Stack

- **VitePress** - Static site generator
- **Vue 3** - Frontend framework
- **Custom Theme** - Dark theme with gradient accents

## Features

- 📝 Markdown documentation with frontmatter
- 🎨 Modern dark theme with custom styling
- 🚀 Fast static site generation
- 📱 Mobile responsive
- 🔍 Built-in search
- 🎯 SEO optimized

## Content

Content is organized as:

```
├── index.md                 # Landing page
├── docs/
│   ├── index.md            # Docs home
│   ├── getting-started/
│   ├── core-concepts/
│   ├── admin/
│   └── deployment/
└── blog/
    ├── index.md            # Blog home
    └── what-is-rag.md      # Blog posts
```

## Customization

Theme customization is in `.vitepress/theme/style.css` with custom CSS variables for:
- Brand colors (cyan/blue gradient)
- Dark theme backgrounds
- Component styling

## License

MIT

