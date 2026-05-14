(() => {
  const MANIFEST_URL = "pages.json";

  const escapeHtml = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const parseKV = (body) => {
    const out = {};
    for (const line of body.split("\n")) {
      const m = line.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/);
      if (m) out[m[1]] = m[2];
    }
    return out;
  };

  const renderCompare = (opts) => {
    const before = opts.before || "";
    const after = opts.after || "";
    const lb = opts["label-before"] || "Before";
    const la = opts["label-after"] || "After";
    return `<div class="compare" data-compare tabindex="0" role="img" aria-label="Before and after comparison: ${escapeHtml(lb)} versus ${escapeHtml(la)}">
      <img class="compare-before" src="${escapeHtml(before)}" alt="${escapeHtml(lb)}" loading="lazy">
      <img class="compare-after"  src="${escapeHtml(after)}"  alt="${escapeHtml(la)}" loading="lazy">
      <div class="compare-handle" aria-hidden="true"></div>
      <span class="compare-label compare-label--before">${escapeHtml(lb)}</span>
      <span class="compare-label compare-label--after">${escapeHtml(la)}</span>
    </div>`;
  };

  // Replace ::: shortcode blocks with HTML. `details` content is rendered as
  // markdown first, then embedded. Placeholders survive marked.parse() and are
  // swapped back in afterward (marked wraps unknown text-only lines in <p>).
  const renderMarkdown = (md) => {
    const placeholders = [];
    const store = (html) => {
      placeholders.push(html);
      return `\n\n@@SHORTCODE_${placeholders.length - 1}@@\n\n`;
    };

    md = md.replace(
      /^:::\s*details\s*([^\n]*)\n([\s\S]*?)\n:::\s*$/gm,
      (_, title, body) => {
        const inner = window.marked.parse(body.trim());
        return store(
          `<details><summary>${escapeHtml(title.trim())}</summary><div class="details-body">${inner}</div></details>`
        );
      }
    );

    md = md.replace(
      /^:::\s*compare\s*\n([\s\S]*?)\n:::\s*$/gm,
      (_, body) => store(renderCompare(parseKV(body)))
    );

    let html = window.marked.parse(md);
    html = html.replace(
      /<p>\s*@@SHORTCODE_(\d+)@@\s*<\/p>/g,
      (_, i) => placeholders[+i]
    );
    return html;
  };

  const initCompareSliders = (root) => {
    root.querySelectorAll("[data-compare]").forEach((el) => {
      const set = (pct) => {
        const clamped = Math.max(0, Math.min(100, pct));
        el.style.setProperty("--pos", clamped + "%");
      };
      const onPointer = (e) => {
        const rect = el.getBoundingClientRect();
        set(((e.clientX - rect.left) / rect.width) * 100);
      };
      let dragging = false;
      el.addEventListener("pointerdown", (e) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        onPointer(e);
      });
      el.addEventListener("pointermove", (e) => {
        if (dragging) onPointer(e);
      });
      el.addEventListener("pointerup", (e) => {
        dragging = false;
        el.releasePointerCapture(e.pointerId);
      });
      el.addEventListener("pointercancel", () => (dragging = false));
      el.addEventListener("keydown", (e) => {
        const current = parseFloat(el.style.getPropertyValue("--pos")) || 50;
        if (e.key === "ArrowLeft") { set(current - 5); e.preventDefault(); }
        if (e.key === "ArrowRight") { set(current + 5); e.preventDefault(); }
      });
    });
  };

  const loadManifest = async () => {
    const res = await fetch(MANIFEST_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to load " + MANIFEST_URL);
    return res.json();
  };

  const renderHome = async () => {
    const grid = document.getElementById("effect-grid");
    if (!grid) return;
    try {
      const data = await loadManifest();
      if (data.site && data.site.title) document.title = data.site.title;
      const heroTitle = document.querySelector("[data-site-title]");
      const heroTag = document.querySelector("[data-site-tagline]");
      const footer = document.querySelector("[data-site-footer]");
      const headerName = document.querySelector("[data-site-name]");
      if (heroTitle) heroTitle.textContent = data.site.title;
      if (heroTag) heroTag.textContent = data.site.tagline;
      if (footer) footer.textContent = data.site.footer;
      if (headerName) headerName.textContent = data.site.title;

      if (!data.effects || !data.effects.length) {
        grid.innerHTML = `<p class="status">No effects yet. Add one to <code>pages.json</code>.</p>`;
        return;
      }
      grid.innerHTML = data.effects
        .map(
          (e) => `<a class="effect-card" href="effect.html?page=${encodeURIComponent(e.slug)}">
            <div class="effect-card-image" data-fallback="${escapeHtml(e.title)}">
              ${e.thumbnail ? `<img src="${escapeHtml(e.thumbnail)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
            </div>
            <div class="effect-card-body">
              <h3 class="effect-card-title">${escapeHtml(e.title)}</h3>
              <p class="effect-card-summary">${escapeHtml(e.summary || "")}</p>
            </div>
          </a>`
        )
        .join("");
    } catch (err) {
      grid.innerHTML = `<p class="status status--error">Could not load effects: ${escapeHtml(err.message)}</p>`;
    }
  };

  const renderEffect = async () => {
    const root = document.getElementById("effect-content");
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const slug = params.get("page");
    if (!slug) {
      root.innerHTML = `<p class="status status--error">No page specified. <a href="./">Go home</a>.</p>`;
      return;
    }
    try {
      const [manifest, mdRes] = await Promise.all([
        loadManifest(),
        fetch(`pages/${encodeURIComponent(slug)}.md`, { cache: "no-cache" }),
      ]);
      if (manifest.site && manifest.site.title) {
        const headerName = document.querySelector("[data-site-name]");
        const footer = document.querySelector("[data-site-footer]");
        if (headerName) headerName.textContent = manifest.site.title;
        if (footer) footer.textContent = manifest.site.footer;
      }
      const entry = (manifest.effects || []).find((e) => e.slug === slug);
      if (!mdRes.ok) throw new Error(`Page "${slug}" not found.`);
      const md = await mdRes.text();

      const html = renderMarkdown(md);
      root.innerHTML = `<a class="back-link" href="./">← All effects</a>` + html;

      const titleText = entry ? entry.title : slug;
      document.title = `${titleText} — ${manifest.site && manifest.site.title ? manifest.site.title : "ReShade Guide"}`;

      initCompareSliders(root);
    } catch (err) {
      root.innerHTML = `<a class="back-link" href="./">← All effects</a>
        <p class="status status--error">${escapeHtml(err.message)}</p>`;
    }
  };

  const renderGallery = async () => {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    const disclaimerEl = document.getElementById("gallery-disclaimer");
    try {
      const [manifest, galleryRes] = await Promise.all([
        loadManifest(),
        fetch("gallery.json", { cache: "no-cache" }),
      ]);
      if (manifest.site && manifest.site.title) {
        const headerName = document.querySelector("[data-site-name]");
        const footer = document.querySelector("[data-site-footer]");
        if (headerName) headerName.textContent = manifest.site.title;
        if (footer) footer.textContent = manifest.site.footer;
        document.title = `Gallery — ${manifest.site.title}`;
      }
      if (!galleryRes.ok) throw new Error("Failed to load gallery.json");
      const data = await galleryRes.json();
      if (disclaimerEl) disclaimerEl.textContent = data.disclaimer || "";
      const items = data.gallery || [];
      if (!items.length) {
        grid.innerHTML = `<p class="status">No gallery entries yet. Drop images into <code>images/gallery/</code> and add them to <code>gallery.json</code>.</p>`;
        return;
      }
      // Shuffle each load so display order isn't read as a ranking.
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      grid.innerHTML = items
        .map(
          (item, i) => `<a class="gallery-item" href="${escapeHtml(item.file)}" data-gallery-index="${i}">
            <img src="${escapeHtml(item.file)}" alt="${escapeHtml(item.title || "")}" loading="lazy">
            ${item.title || item.author
              ? `<div class="gallery-item-caption">
                ${item.title ? `<div class="gallery-item-title">${escapeHtml(item.title)}</div>` : ""}
                ${item.author ? `<div class="gallery-item-author">— ${escapeHtml(item.author)}</div>` : ""}
              </div>`
              : ""}
          </a>`
        )
        .join("");
      initLightbox(grid, items);
    } catch (err) {
      grid.innerHTML = `<p class="status status--error">${escapeHtml(err.message)}</p>`;
    }
  };

  const initLightbox = (root, items) => {
    let currentIndex = 0;
    let box = document.getElementById("lightbox");
    if (!box) {
      box = document.createElement("div");
      box.className = "lightbox";
      box.id = "lightbox";
      box.innerHTML = `
        <button class="lightbox-close" aria-label="Close">×</button>
        <button class="lightbox-prev"  aria-label="Previous">‹</button>
        <button class="lightbox-next"  aria-label="Next">›</button>
        <div class="lightbox-content">
          <img class="lightbox-image" alt="">
          <div class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(box);
    }

    const img = box.querySelector(".lightbox-image");
    const caption = box.querySelector(".lightbox-caption");

    const show = (idx) => {
      currentIndex = (idx + items.length) % items.length;
      const item = items[currentIndex];
      img.src = item.file;
      img.alt = item.title || "";
      const parts = [];
      if (item.title) parts.push(`<strong>${escapeHtml(item.title)}</strong>`);
      if (item.author) parts.push(`<span class="lightbox-author">— ${escapeHtml(item.author)}</span>`);
      if (item.shaders && item.shaders.length) {
        parts.push(`<span class="lightbox-shaders">${item.shaders.map(escapeHtml).join(" · ")}</span>`);
      }
      caption.innerHTML = parts.join(" ");
      box.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    };

    const hide = () => {
      box.removeAttribute("data-open");
      document.body.style.overflow = "";
    };

    box.onclick = (e) => {
      if (e.target.classList.contains("lightbox-prev")) {
        show(currentIndex - 1);
        e.stopPropagation();
        return;
      }
      if (e.target.classList.contains("lightbox-next")) {
        show(currentIndex + 1);
        e.stopPropagation();
        return;
      }
      if (e.target === box || e.target.classList.contains("lightbox-close")) {
        hide();
      }
    };

    document.addEventListener("keydown", (e) => {
      if (!box.hasAttribute("data-open")) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });

    root.addEventListener("click", (e) => {
      const item = e.target.closest("[data-gallery-index]");
      if (!item) return;
      e.preventDefault();
      show(parseInt(item.dataset.galleryIndex, 10));
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderHome();
    renderEffect();
    renderGallery();
  });
})();
