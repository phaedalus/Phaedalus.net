async function loadMarkdown(path) {
    const res = await fetch(path);
    const md = await res.text();
    content.innerHTML = markdownToHTML(md);
    content.style.opacity = 1;
}

function markdownToHTML(md) {
    return md
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        .replace(/\n$/gim, "<br />");
}

async function loadBlogIndex() {
    const res = await fetch("/blog/index.json");
    const posts = await res.json();

    content.innerHTML = `
        <div class="blog-list">
        ${posts.map(p => `
            <a href="/blog/${p.slug}" data-post="${p.slug}">
            <strong>${p.title}</strong>
            <span>${p.summary}</span>
            </a>
        `).join("")}
        </div>
    `;

    document.querySelectorAll("[data-post]").forEach(link => {
        link.addEventListener("click", (e) => {
        e.preventDefault();
        const slug = link.dataset.post;
        history.pushState({ route: "blog", post: slug }, "", `/blog/${slug}`);
        loadMarkdown(`/blog/${slug}.md`);
        });
    });

    content.style.opacity = 1;
}