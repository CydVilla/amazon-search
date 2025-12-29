# Copilot Coding Agent Instructions

## Project Overview

This is a React-based single-page application that provides an Amazon affiliate search tool. The app allows users to search for products on Amazon with automatic affiliate link generation and features a carousel of featured games.

**Tech Stack:**
- React 19.2.0
- react-scripts 5.0.1 (Create React App)
- Deployed to GitHub Pages

## Project Structure

```
amazon-search/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                      # Public assets
├── src/
│   ├── App.js                  # Main application component with search and carousel
│   ├── App.css                 # Application styles
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies and scripts
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

## Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in the root directory
   - Add: `REACT_APP_AMAZON_STORE_ID=your-store-id-here`
   - Note: `.env` is gitignored - never commit it

3. **Start development server:**
   ```bash
   npm start
   ```
   - Opens at http://localhost:3000
   - Hot-reload enabled for development

## Building and Testing

### Build Commands
- **Development:** `npm start` - Start development server with hot reload
- **Production Build:** `npm run build` - Creates optimized build in `build/` folder
- **Test:** `npm test` - Run tests (using react-scripts test runner)
- **Deploy:** `npm run deploy` - Manual deployment to GitHub Pages (requires gh-pages)

### Automated Deployment
- GitHub Actions workflow runs on push to `main`/`master` branches
- Requires `REACT_APP_AMAZON_STORE_ID` secret set in GitHub repository settings
- Deploys to GitHub Pages automatically
- Located at: `.github/workflows/deploy.yml`

## Coding Conventions and Best Practices

### React Conventions
1. **Functional Components:** Use functional components with hooks (useState, useEffect, etc.)
2. **Component Structure:** Keep components in single files with associated CSS
3. **Strict Mode:** App is wrapped in `<React.StrictMode>` for development checks
4. **PropTypes:** Not currently used, but can be added for type checking

### Code Style
1. **Naming:**
   - Use camelCase for variables and functions (e.g., `handleSearch`, `searchQuery`)
   - Use PascalCase for components (e.g., `App`)
   - Use descriptive names for event handlers (e.g., `handleInputChange`, `handleGameClick`)

2. **Comments:**
   - Add comments for non-obvious business logic
   - Document complex algorithms or helper functions
   - Example: `// Generate Amazon affiliate link for a search query`

3. **Code Organization:**
   - Define constants and helper functions at the top of files
   - Keep component logic organized: state, handlers, render
   - Extract complex logic into separate functions

4. **Formatting:**
   - Use 2-space indentation (configured in eslint via react-scripts)
   - Use single quotes for strings
   - Follow eslint-config-react-app rules (extends "react-app")

### Environment Variables
- All React environment variables must be prefixed with `REACT_APP_`
- Access via `process.env.REACT_APP_VARIABLE_NAME`
- Current variables:
  - `REACT_APP_AMAZON_STORE_ID` - Amazon affiliate store ID

### External Links and Security
- Always use `target="_blank"` with `rel="noopener noreferrer"` for external links
- Handle missing environment variables gracefully with fallbacks
- Example: App falls back to non-affiliate links if store ID is missing

### Error Handling
- Use console.warn for non-critical issues (e.g., missing env vars)
- Implement graceful fallbacks (e.g., placeholder images for broken links)
- Display user-friendly warnings in the UI when appropriate

### CSS Conventions
- Use semantic class names (e.g., `search-container`, `featured-games-section`)
- Follow BEM-like naming where appropriate
- Keep styles component-specific in corresponding CSS files

## Common Tasks

### Adding a New Feature
1. Create or modify components in `src/`
2. Update styling in corresponding `.css` files
3. Test locally with `npm start`
4. Build with `npm run build` to ensure no production errors
5. Update README.md if adding user-facing features

### Modifying Featured Games
- Update the `featuredGames` array in `src/App.js`
- Each game needs: `name`, `searchQuery`, and `image` URL
- Test that affiliate links generate correctly

### Updating Dependencies
- Use `npm install <package>` for new dependencies
- Update package.json version constraints carefully
- Test build process after updates: `npm run build`
- Verify deployment workflow still works

### Environment Configuration
- Never commit `.env` files (already in .gitignore)
- Document new environment variables in README.md
- Update GitHub Actions secrets if needed for deployment

## Testing Guidelines

- Run tests with `npm test` before committing changes
- For UI changes, manually test in browser with `npm start`
- Test affiliate link generation with and without store ID configured
- Verify responsive design on different screen sizes
- Test carousel navigation (previous/next buttons)

## Deployment

### Via GitHub Actions (Automatic)
1. Push to `main` or `master` branch
2. Workflow automatically builds and deploys
3. View deployment at: https://CydVilla.github.io/amazon-search

### Manual Deployment
1. Ensure `REACT_APP_AMAZON_STORE_ID` is set in environment
2. Run `npm run deploy`
3. Verify deployment at GitHub Pages URL

## Important Notes for AI Agents

1. **Environment Variables:** Always handle `process.env.REACT_APP_AMAZON_STORE_ID` being undefined
2. **Build Artifacts:** The `build/` folder is gitignored - never commit it
3. **Dependencies:** `node_modules/` is gitignored - never commit it
4. **Affiliate Links:** Core business logic - test thoroughly when modifying
5. **Accessibility:** Maintain `aria-label` attributes on interactive elements
6. **Browser Compatibility:** Follow browserslist configuration in package.json
7. **GitHub Pages:** Homepage URL in package.json must match repository for proper routing

## Resources

- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://react.dev/)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)
