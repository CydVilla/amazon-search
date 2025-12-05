# Amazon Search

A simple single-page React app for searching Amazon with affiliate links.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Amazon affiliate store ID:
```
REACT_APP_AMAZON_STORE_ID=your-store-id-here
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Features

- Clean, modern search interface
- Dynamically generates Amazon affiliate links
- Opens search results in a new tab
- Displays the generated URL for reference

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deploying to GitHub Pages

### Automatic Deployment (Recommended)

The repository is configured for automatic deployment via GitHub Actions.

**To enable deployment:**

1. **Enable GitHub Pages** in your repository settings:
   - Go to: https://github.com/CydVilla/amazon-search/settings/pages
   - Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
   - Save the settings

2. **Add your Amazon Store ID as a secret** (optional but recommended):
   - Go to: https://github.com/CydVilla/amazon-search/settings/secrets/actions
   - Click "New repository secret"
   - Name: `REACT_APP_AMAZON_STORE_ID`
   - Value: Your Amazon affiliate store ID
   - Click "Add secret"

3. **Trigger the deployment**:
   - The workflow will run automatically on pushes to `main`
   - Or manually trigger: Go to Actions tab → "Deploy to GitHub Pages" → "Run workflow"

Once enabled, your app will be available at: **https://CydVilla.github.io/amazon-search**

### Manual Deployment

1. Install `gh-pages` (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update the `homepage` field in `package.json` with your GitHub Pages URL

3. Deploy:
   ```bash
   npm run deploy
   ```

   Note: For manual deployment, you'll need to set `REACT_APP_AMAZON_STORE_ID` in your environment before running `npm run build`.

## Note

This project is set up as a separate, independent React app within the play-villa repository for testing purposes. It can be easily moved to its own repository when ready.

