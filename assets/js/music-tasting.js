const tastingDialog = document.querySelector('#music-tasting-dialog');
const tastingTitle = tastingDialog.querySelector('#music-tasting-title');
const tastingPages = tastingDialog.querySelector('.music-tasting-pages');

function tastingCardImage(url, description) {
  const image = new Image();
  image.src = url;
  image.alt = description;
  return image;
}

document.querySelectorAll('.music-tasting-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const { tastingTitle: title, tastingCard, tastingTracks } = trigger.dataset;
    tastingTitle.textContent = title;
    tastingPages.replaceChildren(tastingCardImage(tastingCard, `${title} 테이스팅 카드`));
    if (tastingTracks) {
      tastingPages.append(tastingCardImage(tastingTracks, `${title} 트랙별 테이스팅 카드`));
    }
    tastingDialog.showModal();
    tastingDialog.scrollTop = 0;
  });
});
