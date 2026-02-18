---
title: "Markdown Tips and Tricks"
---

Markdown is the lingua franca of technical writing. Learning a few tricks can make your writing more effective and your documents more readable.

## The Basics (Quick Recap)

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`inline code`

[Link text](https://example.com)
![Image alt](image.jpg)
```

## Advanced Formatting

### Task Lists

Great for TODOs and checklists:

```markdown
- [x] Learn Markdown basics
- [x] Write first blog post
- [ ] Master advanced features
```

Renders as:
- [x] Learn Markdown basics
- [x] Write first blog post
- [ ] Master advanced features

### Tables

Create clean, readable tables:

```markdown
| Feature | Markdown | HTML |
|---------|----------|------|
| Speed   | ⚡ Fast  | 🐌 Slow |
| Learning | Easy | Hard |
```

| Feature | Markdown | HTML |
|---------|----------|------|
| Speed   | ⚡ Fast  | 🐌 Slow |
| Learning | Easy | Hard |

### Code Blocks with Syntax Highlighting

Specify the language for syntax highlighting:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('World'));
```

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

## Pro Tips

### 1. Use Reference Links

Instead of inline links that make text hard to read:

```markdown
Check out [this awesome site](https://verylongurl.com/with/many/paths) 
and [this other site](https://anotherlongurl.com/more/paths).
```

Use reference-style links:

```markdown
Check out [this awesome site][1] and [this other site][2].

[1]: https://verylongurl.com/with/many/paths
[2]: https://anotherlongurl.com/more/paths
```

### 2. Nested Lists

Indent with 2-4 spaces for nested lists:

```markdown
1. First item
   - Sub-item A
   - Sub-item B
2. Second item
   1. Numbered sub-item
   2. Another numbered sub-item
```

### 3. Blockquotes for Emphasis

```markdown
> This is an important quote or callout.
> 
> It can span multiple paragraphs.
```

Renders as:

> This is an important quote or callout.
> 
> It can span multiple paragraphs.

### 4. Horizontal Rules

Separate sections with horizontal rules:

```markdown
---
```

## Markdown Flavors

Different platforms support different Markdown features:

- **CommonMark** - Standard specification
- **GitHub Flavored Markdown (GFM)** - Adds tables, task lists, strikethrough
- **Kramdown** - Jekyll's Markdown (adds footnotes, more)

This blog uses Kramdown, which supports some extra features:

### Footnotes

```markdown
Here's a statement that needs a citation[^1].

[^1]: This is the footnote content.
```

### Inline Attribute Lists

```markdown
{: .class-name}
This paragraph has a CSS class applied.
```

## Writing Tips

### Keep It Simple

Don't over-format. Markdown's strength is readability:

```markdown
**This** *is* ~~too~~ `much` **formatting**.
```

### Use Headers for Structure

Good header hierarchy helps readers scan:

```markdown
# Main Topic
## Subtopic
### Detail
```

### Code Blocks for Examples

When explaining technical concepts, show examples:

```markdown
Use `backticks` for inline code.

Use triple backticks for code blocks:
```

## Tools I Use

- **Typora** - WYSIWYG Markdown editor
- **VS Code** - With Markdown preview
- **Marked 2** (Mac) - Markdown preview tool
- **Grammarly** - Grammar checking

## The Power of Plain Text

Markdown's greatest strength is that it's plain text. This means:

- Works everywhere
- Version control friendly
- Future-proof
- Easy to backup
- Searchable
- Fast to edit

No vendor lock-in, no proprietary formats, no corruption. Just text.

## Resources

- [CommonMark Spec](https://commonmark.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)

Happy writing! 📝
