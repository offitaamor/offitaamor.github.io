/* OFFITA / K-COPYRIGHT GUARDIAN — accessible cardnews viewer */
(() => {
  document.querySelectorAll('[data-cg-viewer]').forEach((viewer) => {
    const payload = viewer.querySelector('[data-cg-cards]');
    if (!payload) return;
    let cards;
    try { cards = JSON.parse(payload.textContent); } catch (error) { return; }
    if (!Array.isArray(cards) || cards.length === 0) return;
    const stageImage = viewer.querySelector('[data-cg-stage-img]');
    const caption = viewer.querySelector('[data-cg-stage-caption]');
    const counter = viewer.querySelector('[data-cg-counter]');
    const original = viewer.querySelector('[data-cg-original]');
    const prev = viewer.querySelector('[data-cg-prev]');
    const next = viewer.querySelector('[data-cg-next]');
    const thumbs = Array.from(viewer.querySelectorAll('[data-cg-index]'));
    const expand = viewer.querySelector('[data-cg-expand]');
    const dialog = viewer.querySelector('[data-cg-dialog]');
    const zoomImage = viewer.querySelector('[data-cg-zoom-img]');
    const zoomCounter = viewer.querySelector('[data-cg-zoom-count]');
    let index = 0;
    const format = (value) => String(value).padStart(2, '0');
    const show = (newIndex, focusThumb = false) => {
      index = Math.min(cards.length - 1, Math.max(0, newIndex));
      const item = cards[index];
      stageImage.src = item.src;
      stageImage.alt = item.label;
      caption.textContent = item.label;
      counter.textContent = format(index + 1) + ' / ' + format(cards.length);
      original.href = item.original;
      prev.disabled = index === 0;
      next.disabled = index === cards.length - 1;
      thumbs.forEach((button, i) => {
        button.classList.toggle('is-active', i === index);
        button.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
      if (focusThumb && thumbs[index]) thumbs[index].focus();
      if (dialog && dialog.open) {
        zoomImage.src = item.src;
        zoomImage.alt = item.label;
        zoomCounter.textContent = format(index + 1) + ' / ' + format(cards.length);
      }
    };
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    thumbs.forEach((button) => button.addEventListener('click', () => show(Number(button.dataset.cgIndex))));
    if (expand && dialog && typeof dialog.showModal === 'function') {
      expand.addEventListener('click', () => { show(index); dialog.showModal(); zoomImage.src = cards[index].src; zoomImage.alt = cards[index].label; zoomCounter.textContent = format(index + 1) + ' / ' + format(cards.length); });
      dialog.querySelector('[data-cg-close]').addEventListener('click', () => dialog.close());
      dialog.querySelector('[data-cg-zoom-prev]').addEventListener('click', () => show(index - 1));
      dialog.querySelector('[data-cg-zoom-next]').addEventListener('click', () => show(index + 1));
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    } else if (expand) { expand.hidden = true; }
    viewer.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      if (dialog && dialog.open) { event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1)); return; }
      if (!viewer.contains(document.activeElement)) return;
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    });
    let touchStartX = null, touchStartY = null;
    viewer.querySelector('.cg-stage-image').addEventListener('touchstart', (event) => {
      if (event.changedTouches.length !== 1) return;
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, {passive:true});
    viewer.querySelector('.cg-stage-image').addEventListener('touchend', (event) => {
      if (touchStartX === null || event.changedTouches.length !== 1) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1));
      touchStartX = null; touchStartY = null;
    }, {passive:true});
    show(0);
  });
})();
