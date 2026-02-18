/**
 * Post History Viewer
 * Fetches and displays past versions of blog posts using GitHub API
 */

class PostHistoryViewer {
    constructor(repoOwner, repoName, filePath) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.filePath = filePath;
        this.commits = [];
        this.currentVersionIndex = null;
    }

    async fetchCommits() {
        const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/commits?path=${this.filePath}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch commits');
            this.commits = await response.json();
            return this.commits;
        } catch (error) {
            console.error('Error fetching commits:', error);
            return [];
        }
    }

    async fetchFileContent(commitSha) {
        const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/${this.filePath}?ref=${commitSha}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch file content');
            const data = await response.json();
            // Decode base64 content
            return atob(data.content);
        } catch (error) {
            console.error('Error fetching file content:', error);
            return null;
        }
    }

    async fetchDiff(baseSha, headSha) {
        const url = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/compare/${baseSha}...${headSha}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch diff');
            const data = await response.json();

            // Find the file in the diff
            const file = data.files.find(f => f.filename === this.filePath);
            return file ? file.patch : null;
        } catch (error) {
            console.error('Error fetching diff:', error);
            return null;
        }
    }

    renderCommitsList() {
        const container = document.getElementById('versions-list');
        if (!container) return;

        container.innerHTML = '<div class="loading">Loading version history...</div>';

        this.fetchCommits().then(commits => {
            if (commits.length === 0) {
                container.innerHTML = '<p class="no-versions">No version history available.</p>';
                return;
            }

            let html = '<div class="versions-timeline">';

            commits.forEach((commit, index) => {
                const date = new Date(commit.commit.author.date);
                const isLatest = index === 0;
                const isPrevious = index > 0;

                html += `
                    <div class="version-item ${isLatest ? 'latest' : ''}">
                        <div class="version-header">
                            <span class="version-number">Version ${commits.length - index}</span>
                            ${isLatest ? '<span class="badge-latest">Latest</span>' : ''}
                            <span class="version-date">${date.toLocaleDateString()} at ${date.toLocaleTimeString()}</span>
                        </div>
                        <div class="version-message">${this.escapeHtml(commit.commit.message)}</div>
                        <div class="version-author">by ${this.escapeHtml(commit.commit.author.name)}</div>
                        <div class="version-actions">
                            <button class="btn-view" onclick="postHistory.viewVersion(${index})">
                                📄 View this version
                            </button>
                            ${isPrevious ? `
                                <button class="btn-diff" onclick="postHistory.viewDiff(${index}, ${index - 1})">
                                    🔍 Compare with previous
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;
        });
    }

    async viewVersion(index) {
        const commit = this.commits[index];
        if (!commit) return;

        const modal = document.getElementById('version-modal');
        const modalContent = document.getElementById('version-content');
        const modalTitle = document.getElementById('version-modal-title');

        modal.style.display = 'block';
        modalContent.innerHTML = '<div class="loading">Loading version content...</div>';

        const date = new Date(commit.commit.author.date);
        modalTitle.textContent = `Version from ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

        const content = await this.fetchFileContent(commit.sha);
        if (content) {
            // Extract the content without front matter
            const withoutFrontMatter = this.removeFrontMatter(content);
            modalContent.innerHTML = `
                <div class="version-metadata">
                    <strong>Commit:</strong> ${commit.sha.substring(0, 7)}<br>
                    <strong>Message:</strong> ${this.escapeHtml(commit.commit.message)}<br>
                    <strong>Author:</strong> ${this.escapeHtml(commit.commit.author.name)}
                </div>
                <hr>
                <div class="version-markdown">
                    ${this.renderMarkdown(withoutFrontMatter)}
                </div>
            `;
        } else {
            modalContent.innerHTML = '<p class="error">Failed to load version content.</p>';
        }
    }

    async viewDiff(olderIndex, newerIndex) {
        const olderCommit = this.commits[olderIndex];
        const newerCommit = this.commits[newerIndex];

        if (!olderCommit || !newerCommit) return;

        const modal = document.getElementById('version-modal');
        const modalContent = document.getElementById('version-content');
        const modalTitle = document.getElementById('version-modal-title');

        modal.style.display = 'block';
        modalContent.innerHTML = '<div class="loading">Loading diff...</div>';

        const olderDate = new Date(olderCommit.commit.author.date);
        const newerDate = new Date(newerCommit.commit.author.date);

        modalTitle.textContent = `Changes between ${olderDate.toLocaleDateString()} and ${newerDate.toLocaleDateString()}`;

        const patch = await this.fetchDiff(olderCommit.sha, newerCommit.sha);

        if (patch) {
            modalContent.innerHTML = `
                <div class="diff-metadata">
                    <div class="diff-header">
                        <strong>Older version:</strong> ${olderDate.toLocaleDateString()} - ${this.escapeHtml(olderCommit.commit.message)}<br>
                        <strong>Newer version:</strong> ${newerDate.toLocaleDateString()} - ${this.escapeHtml(newerCommit.commit.message)}
                    </div>
                </div>
                <hr>
                <div class="diff-content">
                    ${this.renderDiff(patch)}
                </div>
            `;
        } else {
            modalContent.innerHTML = '<p class="error">Failed to load diff.</p>';
        }
    }

    removeFrontMatter(content) {
        // Remove YAML front matter
        const frontMatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
        return content.replace(frontMatterRegex, '').trim();
    }

    renderMarkdown(markdown) {
        // Basic markdown rendering (you could use a library like marked.js for full support)
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold and italic
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

        // Line breaks
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';

        return html;
    }

    renderDiff(patch) {
        const lines = patch.split('\n');
        let html = '<div class="diff-lines">';

        lines.forEach(line => {
            let lineClass = 'diff-context';
            let prefix = '';

            if (line.startsWith('+')) {
                lineClass = 'diff-addition';
                prefix = '+ ';
            } else if (line.startsWith('-')) {
                lineClass = 'diff-deletion';
                prefix = '- ';
            } else if (line.startsWith('@@')) {
                lineClass = 'diff-hunk';
            }

            html += `<div class="${lineClass}">${this.escapeHtml(line)}</div>`;
        });

        html += '</div>';
        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    closeModal() {
        const modal = document.getElementById('version-modal');
        modal.style.display = 'none';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const historySection = document.querySelector('.post-history');
    if (!historySection) return;

    const repoOwner = historySection.dataset.owner;
    const repoName = historySection.dataset.repo;
    const filePath = historySection.dataset.path;

    if (repoOwner && repoName && filePath) {
        window.postHistory = new PostHistoryViewer(repoOwner, repoName, filePath);

        // Add event listener for the button
        const viewVersionsBtn = document.getElementById('view-versions-btn');
        if (viewVersionsBtn) {
            viewVersionsBtn.addEventListener('click', function () {
                const versionsPanel = document.getElementById('versions-panel');
                if (versionsPanel.style.display === 'none' || !versionsPanel.style.display) {
                    versionsPanel.style.display = 'block';
                    viewVersionsBtn.textContent = '▲ Hide Past Versions';
                    window.postHistory.renderCommitsList();
                } else {
                    versionsPanel.style.display = 'none';
                    viewVersionsBtn.textContent = '▼ View Past Versions & Diffs';
                }
            });
        }

        // Close modal when clicking the X
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => window.postHistory.closeModal());
        }

        // Close modal when clicking outside
        const modal = document.getElementById('version-modal');
        if (modal) {
            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    window.postHistory.closeModal();
                }
            });
        }
    }
});
