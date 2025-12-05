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

1. **Update the homepage URL** in `package.json`:
   - Replace `YOUR_USERNAME` with your GitHub username
   - If your repo name is different, update that too

2. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

3. **Add your Amazon Store ID as a secret** (optional but recommended):
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `REACT_APP_AMAZON_STORE_ID`
   - Value: Your Amazon affiliate store ID

4. **Push to main/master branch**:
   - The GitHub Actions workflow will automatically build and deploy your app

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

