# GitHub Copilot Instructions

## Repository-Specific Guidelines

This file provides additional context for GitHub Copilot coding agent when working on issues and pull requests in this repository.

## Workflow and CI/CD

### GitHub Actions
- The repository uses GitHub Actions for automated deployment
- Workflow file: `.github/workflows/deploy.yml`
- Deploys to GitHub Pages on push to `main` or `master`
- Can be manually triggered via workflow_dispatch
- Requires `REACT_APP_AMAZON_STORE_ID` secret for full functionality

### Branch Protection
- Main branch should be protected
- All changes should go through pull requests
- CI must pass before merging

## Issue and PR Guidelines

### When Working on Issues
1. **Understand the context:** Review README.md and AGENTS.md first
2. **Test locally:** Always run `npm start` to verify changes in browser
3. **Build verification:** Run `npm run build` to ensure production build works
4. **Small changes:** Make minimal, focused changes that address the specific issue
5. **Documentation:** Update README.md if adding user-facing features

### Code Review Checklist
- [ ] Code follows React and JavaScript best practices
- [ ] No sensitive data (API keys, store IDs) committed to repository
- [ ] Environment variables properly prefixed with `REACT_APP_`
- [ ] External links include `rel="noopener noreferrer"`
- [ ] Error handling and fallbacks implemented
- [ ] Responsive design maintained
- [ ] Accessibility attributes preserved (aria-labels)
- [ ] Build completes without errors: `npm run build`

## Common Issue Types

### Bug Fixes
- Identify root cause before making changes
- Test both with and without environment variables configured
- Verify fix doesn't break existing functionality
- Add appropriate error handling

### Feature Additions
- Consider impact on existing UI and UX
- Maintain consistent styling with current design
- Update README.md with new features
- Test on multiple browsers if possible

### Dependency Updates
- Check for breaking changes in release notes
- Update package.json and package-lock.json
- Test full build and deployment workflow
- Verify no deprecation warnings

### Documentation Updates
- Keep README.md and AGENTS.md in sync
- Use clear, concise language
- Include code examples where helpful
- Verify all links work

## Security Considerations

### What NOT to Commit
- `.env` files (already gitignored)
- API keys or credentials
- Personal Amazon affiliate store IDs
- Any secrets or sensitive data

### Best Practices
- Use GitHub Secrets for sensitive configuration
- Validate and sanitize user inputs
- Keep dependencies updated for security patches
- Use `rel="noopener noreferrer"` for external links

## Testing Strategy

### Manual Testing
Since this is a simple React app without automated tests:
1. Start development server: `npm start`
2. Test search functionality with various queries
3. Verify affiliate links generate correctly
4. Test carousel navigation (previous/next)
5. Check featured game cards are clickable
6. Verify display of last search URL
7. Test with and without `REACT_APP_AMAZON_STORE_ID` set

### Browser Testing
- Chrome (primary)
- Firefox
- Safari
- Test responsive design on mobile viewport

## Deployment Verification

After changes are merged:
1. Check GitHub Actions workflow completed successfully
2. Visit https://CydVilla.github.io/amazon-search
3. Verify changes are live
4. Test functionality in production environment

## Helpful Commands Quick Reference

```bash
# Development
npm start              # Start dev server

# Building
npm run build          # Production build

# Testing
npm test              # Run tests (if any)

# Deployment
npm run deploy        # Manual deploy (if needed)

# Git
git status            # Check current state
git diff              # See changes
git log --oneline -10 # Recent commits
```

## Additional Resources

- Main instructions: See `AGENTS.md` in repository root
- Project README: See `README.md` for user documentation
- React docs: https://react.dev/
- Create React App: https://create-react-app.dev/
