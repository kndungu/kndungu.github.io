# kndungu.github.io

A personal blog powered by Jekyll and GitHub Pages, where every post is version-controlled and all dates come from Git commits. No manual date management required!

## 🚀 Quick Start

### 1. Enable GitHub Pages Deployment

**One-time setup:**
1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to **"Deploy from a branch"**
3. Set **Branch** to **"gh-pages"** and **/** (root)
4. Save

**Note**: The gh-pages branch will be automatically created by the first deployment (either from main push or a PR).

### 2. Write Your First Blog Post

Create a file in `_posts/` with **any filename you want**:

**File**: `_posts/my-awesome-post.md`
```markdown
---
title: "My Awesome Post"
---

Your content here in Markdown...
```

**That's all you need!** No date field required.

### 3. Publish

```bash
git add _posts/my-awesome-post.md
git commit -m "Add: My awesome post"
git push origin main
```

### 4. Wait 2-3 minutes

The GitHub Action will:
- Extract the commit date (publication date)
- Build your site
- Deploy to GitHub Pages

### 5. Visit Your Post

`https://kndungu.github.io/my-awesome-post/`

## ✨ How It Works

### Dates Come From Git

- **Publication date**: First commit that added the file
- **Last modified date**: Most recent commit that changed the file  
- **Revision count**: Number of commits that touched the file

All automatically extracted by a GitHub Action - no manual date fields needed!

### Minimal Front Matter

You only need one field:
```yaml
---
title: "Your Post Title"
---
```

**That's it!** No other fields are needed or supported. The system is intentionally kept minimal.

## 📝 Updating a Post

Just edit, commit, and push:

```bash
# Edit your post
vim _posts/my-awesome-post.md

# Commit with descriptive message
git add _posts/my-awesome-post.md  
git commit -m "Update: Clarify the introduction"
git push origin main
```

Your post will now show:
- **Published**: [original date from first commit]
- **Updated**: [today's date]
- **Revisions**: 2

## 📋 Features

✅ **No Manual Dates** - Everything from Git commits  
✅ **Simple Filenames** - No date prefix required  
✅ **Automatic History** - View all revisions on GitHub  
✅ **Revision Tracking** - See how many times each post was edited  
✅ **Interactive Version Viewer** - Browse and read past versions directly on the site
✅ **Visual Diff Comparison** - See exactly what changed between versions
✅ **Pull Request Previews** - Every PR gets its own preview URL automatically
✅ **Clean URLs** - `/my-post/` instead of `/2026/02/18/my-post/`  
✅ **Responsive Design** - Works on all devices  
✅ **SEO Optimized** - Meta tags, sitemap, RSS feed  
✅ **Syntax Highlighting** - Code blocks with language support

## 🔍 Pull Request Previews

Every pull request automatically gets its own preview deployment!

**How to use:**
1. Create a branch and make changes
2. Open a pull request
3. Within minutes, a bot comments with a preview link
4. Review your changes at: `https://kndungu.github.io/kndungu.github.io/pr-123/`
5. Push updates → preview automatically rebuilds
6. Merge or close PR → preview is automatically cleaned up

**Perfect for:**
- Reviewing posts before publishing
- Sharing drafts with others
- Testing layout changes
- Catching broken links early  

## 📁 Project Structure

```
├── _config.yml              # Jekyll configuration
├── .github/workflows/       
│   └── jekyll-deploy.yml   # Extracts Git dates & deploys (automatic)
├── _layouts/               # HTML templates
├── _includes/              # Reusable components  
│   └── git-dates.html     # Git date extraction logic
├── _posts/                 # Your blog posts
│   └── *.md               # Any filename works!
├── assets/css/            # Styling
└── index.html            # Homepage
```

## 🎨 Customization

### Site Settings

Edit `_config.yml`:
```yaml
title: "Your Blog Name"
description: "Your description"
author: "Your Name"
```

### Adding Images

**For images within post content:**
1. Put images in `assets/images/`  
2. Reference in posts: `![Alt text](/assets/images/photo.jpg)`

**For homepage post thumbnails:**

Add an image file to `assets/images/posts/` matching your post's filename:

```
_posts/my-awesome-post.md
assets/images/posts/my-awesome-post.webp  ← Best (modern, smallest)
                    my-awesome-post.png   ← Good (lossless, screenshots)
                    my-awesome-post.jpg   ← Good (photos)
                    my-awesome-post.svg   ← Good (logos, icons)
```

**Supported formats** (in order of preference):
- **WebP** - Best compression, modern browsers (recommended for photos)
- **PNG** - Lossless, great for screenshots or images with text
- **JPG** - Standard for photographs
- **SVG** - Scalable, perfect for logos and simple graphics

The system automatically tries formats in order and falls back to the default image if none exist. Use whatever format best suits your content!

## 🔧 Local Development

To preview locally before pushing:

```bash
# Install dependencies
gem install bundler jekyll
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

**Note**: 
- Local preview won't have Git dates unless you manually generate `_data/git_dates.yml`
- Version viewer works locally if you have Git history for the posts

## 🎥 How the Version Viewer Works

The version viewer uses GitHub's public API to provide transparency:

1. **Click "View Past Versions"** on any blog post
2. **Browse the timeline** of all commits that modified the post
3. **View any version** - Click to read the full content from that point in time
4. **Compare changes** - See visual diffs between versions:
   - 🟢 Green = Added content
   - 🔴 Red = Removed content
   - ⚫ Gray = Unchanged context

All fetched dynamically from GitHub - no database needed!

## 📖 Examples

### Simple Post

**File**: `_posts/hello-world.md`
```markdown
---
title: "Hello World"
---

This is my first post!
```

### Post with Code

**File**: `_posts/python-tips.md`  
```markdown
---
title: "Python Tips"  
---

Here's a useful function:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`
```

## 🔍 Viewing Post History

Every post has two ways to explore its history:

### 1. Interactive Version Viewer (On-Site)
Click the "View Past Versions & Diffs" button on any post to:
- **Browse all versions** with dates and commit messages
- **Read past versions** - Click to see the full content from any point in time
- **Compare changes** - Visual diff showing what was added (green) and removed (red)

### 2. Full GitHub History
Click "View Full History on GitHub" to see:
- All revisions in chronological order  
- Exact changes (diffs)
- Commit messages
- When and who made changes  

Example: `https://github.com/kndungu/kndungu.github.io/commits/main/_posts/hello-world.md`

## ⚠️ Troubleshooting

**Post not showing?**
- Check that file is in `_posts/` directory
- Verify front matter has `title` field  
- Check GitHub Actions status in Actions tab

**Build failing?**
- View workflow logs in Actions tab
- Validate YAML syntax in front matter  

**Dates wrong?**  
- Ensure file has been committed to Git
- Publication date = first commit of the file
- Check workflow extracted dates correctly in logs

## 📚 Documentation  

See [ARCHITECTURE.md](ARCHITECTURE.md) for comprehensive documentation including:
- Detailed system architecture  
- How Git date extraction works
- Advanced customization
- Workflow examples
- Best practices  

## 📄 License

Content is yours. Feel free to fork and adapt!

## 🔗 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
