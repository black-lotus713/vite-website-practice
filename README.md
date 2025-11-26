# Personal Website

A modern personal website built with **React**, **TypeScript**, and **Vite**, designed for fast development and performance-optimized production builds.

## Prerequisites

- **Node.js**: v20.19.0 or later (Vite requires this version)
- **npm**: v8.19.2 or later

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The dev server will run on `http://localhost:5173`.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for **Netlify** deployment using `netlify.toml`.

### Deploy to Netlify

1. **Connect your GitHub repository** to Netlify
2. Netlify will automatically detect the `netlify.toml` configuration
3. Configure build settings in Netlify dashboard if needed:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deployment

If deploying manually:

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting service
```

## Project Structure

- `src/` - React components and source code
- `public/` - Static assets
- `dist/` - Production build output (generated)
- `index.html` - Entry HTML file
- `vite.config.ts` - Vite configuration
- `netlify.toml` - Netlify deployment configuration
- `tsconfig.json` - TypeScript configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Netlify** - Hosting and deployment

## Next Steps

1. **Upgrade Node.js** to v20.19.0 or later
2. **Run `npm install`** to rebuild dependencies with the new Node.js version
3. **Start development** with `npm run dev`
4. **Customize your content** in `src/` directory
5. **Connect to GitHub** and link to Netlify for automatic deployments
