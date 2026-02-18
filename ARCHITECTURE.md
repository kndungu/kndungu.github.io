# Blog Architecture Documentation

## Overview
This GitHub Pages blog uses Jekyll to automatically convert Markdown files into published blog posts. The system is designed for simplicity: write Markdown, push to main, and it's live.

## Technology Stack
- **Static Site Generator**: Jekyll (built into GitHub Pages)
- **Version Control**: Git/GitHub
- **Hosting**: GitHub Pages
- **Content Format**: Markdown

## Directory Structure

```
kndungu.github.io/
├── _config.yml              # Jekyll configuration
├── .github/
│   └── workflows/
│       └── jekyll-deploy.yml  # Auto-extracts Git dates and deploys
├── _layouts/                # HTML templates
│   ├── default.html         # Base layout for all pages
│   ├── home.html           # Homepage layout (lists all posts)
│   └── post.html           # Individual blog post layout
├── _includes/               # Reusable components
│   ├── header.html         # Site header
│   ├── footer.html         # Site footer
│   ├── git-dates.html      # Git date extraction logic
│   └── post-history.html   # Git history component
├── _posts/                  # Blog posts (Markdown files)
│   └── any-filename.md     # Posts can have any filename
├── _data/                   # Auto-generated data
│   └── git_dates.yml       # Git commit dates (auto-generated)
├── assets/                  # Static assets
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── images/             # Blog images
├── index.html              # Homepage
└── README.md               # Repository documentation
```

## How It Works

### Initial Setup

**One-time configuration in GitHub:**

1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to "Deploy from a branch"
3. Set **Branch** to "gh-pages" and "/" (root)
4. Save

That's it! Now every push to main triggers:
- Git date extraction
- Jekyll build
- Automatic deployment to gh-pages branch
- GitHub Pages serves the site from gh-pages

### Pull Request Previews

Additionally, every pull request automatically triggers:
- Separate Jekyll build with PR-specific baseurl
- Deployment to `pr-{number}/` subdirectory on gh-pages
- Bot comment with preview URL
- Automatic cleanup when PR closes

### 1. Writing a Blog Post
Create a new Markdown file in `_posts/`:
```
my-first-post.md
hello-world.md
thoughts-on-architecture.md
```

**Front Matter** (required at the top of each post):
```yaml
---
title: "My First Post"
---
```

That's it! Just the title. Everything else is automatic:
- **Publication date**: First Git commit of the file
- **Last modified date**: Most recent Git commit
- **Revision count**: Number of commits that touched the file
- **Layout**: Set to `post` by default configuration

After the front matter, write your content in Markdown.

### 2. Automatic Publishing
1. Push your Markdown file to the `main` branch
2. GitHub Actions workflow automatically runs:
   - Extracts Git commit dates for all posts
   - Generates `_data/git_dates.yml` with publication/modification dates
   - Builds the Jekyll site
   - Deploys to GitHub Pages
3. Build completes in 1-2 minutes
4. Your post is live at `https://kndungu.github.io/title-from-filename/`

**How Date Extraction Works:**
- GitHub Actions uses `git log` to find the first and last commit for each post
- First commit date = Publication date
- Last commit date = Last modified date
- This data is injected into Jekyll during the build process
- Posts display both published and updated dates automatically

### 3. Git History Integration
Each blog post includes comprehensive Git metadata and interactive version viewing:

**Visible on Each Post:**
- Publication date (from first commit)
- Last modified date (from most recent commit)
- Revision count (number of times the post was edited)
- "View Past Versions & Diffs" interactive panel
- "View History" button linking to full Git history

**Interactive Version Viewer:**
Every post includes a built-in version viewer that lets readers:
1. **Browse all versions** - See every revision with dates, commit messages, and authors
2. **Read past versions** - View the complete content of any previous version
3. **Compare changes** - See diffs between any two versions with additions (green) and deletions (red)

**How It Works:**
- Uses GitHub API to fetch commit history and file content
- Loads dynamically on the client side (no server required)
- Shows readable diffs with syntax highlighting
- Works entirely with static hosting

**History Link Format:**
```
https://github.com/kndungu/kndungu.github.io/commits/main/_posts/filename.md
```

This shows:
- All commits that modified the post
- Exact changes (diffs) for each revision
- When changes were made (timestamps)
- Commit messages explaining why changes were made
- Who made the changes (author)

### 4. Homepage
The homepage (`index.html`) automatically lists all blog posts in reverse chronological order (by first commit date) with:
- Post titles (clickable links)
- Publication dates (from Git)
- Excerpts (first paragraph or custom excerpt)

## Key Features

### Automatic Discovery
Jekyll automatically discovers and publishes any Markdown file in `_posts/`. No manual configuration needed for new posts. Filename can be anything - no date prefix required.

**Technical Note**: This blog uses Jekyll Collections instead of the built-in posts feature. Collections allow completely arbitrary filenames without requiring the `YYYY-MM-DD-` date prefix that traditional Jekyll posts need. This gives you total freedom in naming while maintaining all post functionality.

### Interactive Version Viewer
Every blog post includes a built-in version viewer powered by GitHub API:
- **Browse Versions**: Collapsible timeline of all revisions
- **Read Past Versions**: Click to view content from any point in history
- **Compare Changes**: Visual diff viewer showing additions/deletions
- **Zero Configuration**: Works automatically with static hosting
- **No Rate Limits for Readers**: Cached on client side for performance

### Built-in Markdown Support
Jekyll supports:
- Standard Markdown syntax
- Code blocks with syntax highlighting
- Tables
- Task lists
- Kramdown extensions (footnotes, etc.)

### No Build Step Required
GitHub Pages builds your site automatically. No need for:
- Local Jekyll installation (though you can test locally)
- CI/CD configuration
- Manual deployment

### Pull Request Previews
Every pull request automatically gets its own preview deployment:
- **Automatic deployment**: PR previews build automatically on every push
- **Unique URLs**: Each PR gets its own URL: `https://kndungu.github.io/kndungu.github.io/pr-123/`
- **Live updates**: Preview updates automatically with each push to the PR
- **PR comments**: Bot posts preview link directly in the PR
- **Automatic cleanup**: Preview is removed when PR is closed or merged
- **No configuration**: Works out of the box with GitHub Actions

**How it works:**
1. Open a PR → Workflow builds Jekyll with PR-specific baseurl
2. Deploys to `gh-pages` branch in `pr-{number}/` subdirectory
3. Bot comments on PR with preview link
4. Push updates → Preview automatically rebuilds
5. Close/merge PR → Preview is automatically cleaned up

**Use cases:**
- Review content changes before merging
- Share drafts with others for feedback
- Test layout/styling changes in production environment
- Verify links and images work correctly

### Version History
Since all content is in Git and dates are extracted from commits:
- Every change is tracked automatically
- You can revert to any previous version
- Readers see when posts were published and last updated
- Revision count shows how much a post has evolved
- Full transparency of editorial changes
- No manual date management required
- **Interactive version viewer** - Readers can browse and read any past version
- **Visual diff comparison** - See exactly what changed between versions
- **Complete transparency** - Nothing is hidden from readers

## Configuration (`_config.yml`)

The Jekyll configuration file controls:
- Site title, description, author
- Permalink structure for posts (simple, no dates needed)
- Plugins (GitHub Pages compatible)
- Theme selection
- Default values for all posts
- Site-wide variables

**Key Configuration:**
```yaml
permalink: /:title/  # Simple URLs based on filename
```

No date in URL since filenames don't have dates. Clean, semantic URLs.

## Customization Options

### Themes
- Use GitHub Pages supported themes
- Create custom themes
- Override specific templates in `_layouts/` and `_includes/`

### Permalink Structure
Configure URL patterns in `_config.yml`:
```yaml
permalink: /:title/  # Simple, clean URLs
```

Since dates come from Git (not filenames), we use simple semantic URLs based on filename.

### Advanced Features
- **Collections**: Organize content beyond blog posts (projects, docs)
- **Data Files**: Store structured data in `_data/` (YAML, JSON, CSV)
- **Pagination**: Split post lists across multiple pages
- **Search**: Add client-side search with JavaScript
- **Comments**: Integrate Disqus, utterances, or other comment systems
- **Analytics**: Add Google Analytics or other tracking

## Interactive Version Viewer

### How It Works

The version viewer is a client-side JavaScript application that uses GitHub's public API to fetch and display historical versions of blog posts.

**Technical Architecture:**

1. **Data Attributes**: The `post-history.html` include adds data attributes to the post:
   ```html
   <div class="post-history" 
        data-owner="kndungu" 
        data-repo="kndungu.github.io" 
        data-path="_posts/my-post.md">
   ```

2. **GitHub API Endpoints Used**:
   - `/repos/{owner}/{repo}/commits?path={file}` - Fetch all commits for a file
   - `/repos/{owner}/{repo}/contents/{path}?ref={sha}` - Get file content at specific commit
   - `/repos/{owner}/{repo}/compare/{base}...{head}` - Get diff between commits

3. **Client-Side Rendering**:
   - JavaScript (`post-history.js`) fetches commit history when user clicks "View Past Versions"
   - Displays timeline of all versions with metadata
   - On-demand loading of version content and diffs (reduces API calls)

4. **Modal Interface**:
   - Full-screen modal for viewing versions and diffs
   - Syntax-highlighted diff display (additions in green, deletions in red)
   - Responsive design works on all screen sizes

### API Rate Limits

GitHub API rate limits:
- **Unauthenticated**: 60 requests per hour per IP
- **Authenticated**: 5,000 requests per hour

For most blogs, unauthenticated access is sufficient since:
- Version list is fetched once per page load
- Individual versions are loaded on-demand
- Browser caching reduces repeated requests

**If you need higher limits:**
1. Create a GitHub Personal Access Token (read-only)
2. Readers can optionally provide their token (stored in browser localStorage)
3. Increases limit to 5,000 requests/hour

### User Experience

**Reading Past Versions:**
1. Click "View Past Versions & Diffs" button
2. See timeline of all revisions
3. Click "View this version" to read historical content
4. Content displays in modal with commit metadata

**Comparing Changes:**
1. Click "Compare with previous" on any version
2. See visual diff showing:
   - Added lines (green background)
   - Removed lines (red background)
   - Context lines (gray background)
   - Chunk headers (blue background)

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires JavaScript enabled (graceful degradation: GitHub link still works).

## Workflow Examples

### Creating a New Post
```bash
# Create the file (any filename you want!)
cat > _posts/hello-world.md << 'EOF'
---
title: "Hello World"
---

This is my first blog post!
EOF

# Commit and push
git add _posts/hello-world.md
git commit -m "Add: Hello World blog post"
git push origin main

# The GitHub Action will:
# 1. Extract the commit date (publication date)
# 2. Build Jekyll with Git metadata
# 3. Deploy to GitHub Pages

# Wait 2-3 minutes, then visit:
# https://kndungu.github.io/hello-world/
```

### Updating a Post
```bash
# Edit the file
vim _posts/hello-world.md

# Commit with descriptive message
git add _posts/hello-world.md
git commit -m "Update: Clarify introduction in Hello World post"
git push origin main

# Changes are live in 2-3 minutes
# The post will show:
# - Original publication date (first commit)
# - Updated date (this commit)
# - Revision count (now 2)
# History is visible via the "View History" link
```

### Viewing History
Navigate to:
```
https://github.com/kndungu/kndungu.github.io/commits/main/_posts/hello-world.md
```

Or click the "View History" button on the blog post page.

You'll see:
- All commits in chronological order
- Commit messages explaining changes
- Diffs showing exactly what changed
- Timestamps for each revision
- Author information

### Creating a Pull Request with Preview
```bash
# Create a new branch for your changes
git checkout -b add-new-post

# Create or edit a post
cat > _posts/my-new-post.md << 'EOF'
---
title: "My New Post"
---

This is a draft post I want to review before publishing.
EOF

# Commit and push to your branch
git add _posts/my-new-post.md
git commit -m "Add: New post about X"
git push origin add-new-post

# Open a PR on GitHub
# Within minutes, you'll receive a comment with a preview link like:
# https://kndungu.github.io/kndungu.github.io/pr-123/

# Review the preview, make changes if needed
vim _posts/my-new-post.md
git add _posts/my-new-post.md
git commit -m "Fix typo in new post"
git push origin add-new-post

# Preview automatically updates with your changes

# Once satisfied, merge the PR
# The preview is automatically cleaned up
# The post goes live on the main site
```

**Benefits of PR Previews:**
- **Safe experimentation**: Test changes without affecting the live site
- **Collaborative review**: Share preview link with others for feedback
- **Visual verification**: See exactly how posts will look before publishing
- **Catch issues early**: Spot broken links, formatting problems, or layout issues

## Benefits of This Architecture

1. **Ultimate Simplicity**: Write Markdown with just a title, push to Git, done
2. **Transparent History**: All changes tracked, dates automatic from Git
3. **No Manual Date Management**: Publication and modification dates extracted from commits
4. **Semantic URLs**: Clean URLs without dates (e.g., `/hello-world/`)
5. **No Server Management**: GitHub handles everything
6. **Version Control**: Built-in backup and history
7. **Free Hosting**: GitHub Pages is free for public repositories
8. **Custom Domain**: Can use your own domain name
9. **HTTPS**: Free SSL certificate included
10. **Portable**: Standard Markdown files can be moved anywhere
11. **Offline Writing**: Write locally, push when ready
12. **Collaboration**: Others can submit posts via pull requests
13. **Revision Tracking**: Automatic count of how many times each post was edited
14. **True Single Source**: Git is the only source of truth for all metadata
15. **Interactive History**: Readers can view and compare past versions directly on the site
16. **Visual Diffs**: Color-coded changes make it easy to see what was modified
17. **Pull Request Previews**: Automatic preview deployments for every PR with unique URLs
18. **Safe Collaboration**: Review changes in production-like environment before publishing

## Limitations & Considerations

1. **Build Time**: 2-3 minutes delay between push and publish (GitHub Actions workflow)
2. **Public Repository**: Content is visible in the repository (for private blogs, use private repos with GitHub Pro)
3. **Static Only**: No server-side processing, databases, or user authentication
4. **Git Required**: Dates depend on Git history, don't modify from web UI without committing
5. **Initial Commit Matters**: First commit sets publication date (can't be changed without history rewrite)
6. **Size Limits**: Repository size should be < 1GB, published site < 100MB
7. **Actions Minutes**: Free tier includes 2000 Actions minutes/month (more than enough for a blog)

## Future Enhancements

- RSS/Atom feed generation
- Author pages (for multi-author blogs)
- Related posts suggestions
- Full-text search
- Dark mode toggle
- Table of contents generation
- Reading time estimates
- Social sharing buttons
- Newsletter integration

## Testing Locally

To preview changes before pushing:

```bash
# Install Jekyll
gem install bundler jekyll

# Install dependencies
bundle install

# Manually generate Git dates (mimics GitHub Action)
mkdir -p _data
./scripts/generate-git-dates.sh  # Or run the extraction manually

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

**Note**: For local development, you'll need to manually generate the `_data/git_dates.yml` file since the GitHub Action only runs on push. Alternatively, you can create a local script that extracts Git dates before serving.

## Troubleshooting

### Post Not Showing Up
- Check that file is in `_posts/` directory
- Verify front matter YAML is valid (at minimum: `title: "Your Title"`)
- Check GitHub Actions workflow status in Actions tab
- Look at workflow logs for errors

### Build Failing
- View workflow run details in repository Actions tab
- Check for YAML syntax errors in front matter
- Ensure Markdown is valid
- Verify Gemfile dependencies are correct

### Dates Not Showing Correctly
- Ensure Git history exists (file has been committed)
- Check `_data/git_dates.yml` in the workflow logs
- Verify `fetch-depth: 0` in workflow (fetches full history)

### Styling Issues
- Clear browser cache
- Check CSS file paths
- Inspect with browser dev tools
- Verify deployment succeeded in Actions tab

### PR Preview Not Working
- **No comment on PR**: Check workflow runs in Actions tab for errors
- **404 on preview link**: Wait a few minutes for deployment to complete
- **Preview not updating**: Push a new commit to trigger rebuild
- **Permission denied**: Ensure workflow has `contents: write` permission
- **gh-pages branch doesn't exist**: Create it manually first: `git checkout --orphan gh-pages && git rm -rf . && git commit --allow-empty -m "Init gh-pages" && git push origin gh-pages`

### PR Preview Shows Wrong Content
- **Old content**: Clear browser cache, preview might be cached
- **Broken CSS/images**: Check that all asset paths use `relative_url` filter
- **Links not working**: Ensure all internal links use `relative_url` filter
- **Wrong base URL**: Verify workflow is building with correct `--baseurl` flag

### PR Preview Not Cleaned Up
- Check that cleanup workflow ran successfully in Actions tab
- Manually delete directory from gh-pages branch if needed:
  ```bash
  git checkout gh-pages
  rm -rf pr-{number}
  git add .
  git commit -m "Cleanup PR preview"
  git push origin gh-pages
  ```

### Version Viewer Not Working
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled in browser
- Verify repository is public (GitHub API requires public repos for unauthenticated access)
- Check GitHub API rate limit (60 requests/hour for unauthenticated)
- Inspect Network tab in browser dev tools for failed API calls

### Version Viewer Shows "Failed to Load"
- **GitHub API Rate Limit**: Wait an hour for rate limit to reset
- **Private Repository**: Make repository public or provide GitHub token
- **Network Error**: Check internet connection
- **CORS Issue**: Should not occur with GitHub API, but check browser console

### Diffs Not Displaying
- Ensure both commits exist in repository
- Check that file path matches (case-sensitive)
- Verify commits actually changed the file
- Look for API errors in browser console

## Security Notes

- Don't commit sensitive information (API keys, passwords)
- Use environment variables for secrets (though static sites rarely need them)
- Be aware that entire repository history is public
- Review external dependencies for security issues

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Themes](https://jekyllrb.com/docs/themes/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
