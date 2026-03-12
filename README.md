# Nikolay Mantchev — CV Portfolio

Personal portfolio and CV website built with React, Node.js, and MongoDB. Deployed on Vercel.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Icons | react-icons v5 |
| Backend | Node.js, Express (Vercel serverless) |
| Database | MongoDB (contact form submissions) |
| Deployment | Vercel |

## Project Structure

```
cv/
├── CV_DATA.js              # Single source of truth for all CV content
├── vercel.json             # Vercel deployment config
├── api/
│   └── index.js            # Serverless API (contact form → MongoDB)
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── styles/
        │   └── global.css  # Design tokens (CSS variables)
        ├── utils/
        │   └── icons.jsx   # Icon registry (string key → react-icons)
        └── components/
            ├── Navigation.jsx
            ├── Hero.jsx
            ├── About.jsx
            ├── Experience.jsx
            ├── Skills.jsx
            ├── Projects.jsx
            ├── Creative.jsx
            ├── Education.jsx
            └── Contact.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB connection string (for contact form)

### Install & Run

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Run frontend dev server
npm run dev
```

The frontend dev server runs at `http://localhost:5173`. API requests to `/api/*` are proxied to the Express server.

### Environment Variables

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
```

## Updating CV Content

All content lives in [`CV_DATA.js`](./CV_DATA.js) at the root. Edit that file to update:

- Personal info, social links
- Experience, skills, projects
- Education and certifications
- Contact section text

## Design System

The visual design is defined through CSS custom properties in [`frontend/src/styles/global.css`](./frontend/src/styles/global.css).

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#C8FF00` | Electric chartreuse accent |
| `--color-background` | `#0B0B0B` | Near-black base |
| `--font-display` | Bebas Neue | Large headings |
| `--font-heading` | Cormorant Garamond | Section titles |
| `--font-body` | JetBrains Mono | Body text, labels |

## Deployment

The project deploys to Vercel automatically. Configuration is in [`vercel.json`](./vercel.json):

- Frontend is built with Vite and served as static files
- `api/index.js` runs as a Vercel serverless function
- All `/api/*` requests are routed to the serverless function

```bash
# Manual deploy
vercel --prod
```
