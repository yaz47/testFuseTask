'use strict';

(function () {
  const realtyElem = document.querySelector('.realty');
  const listElem = realtyElem.querySelector('.realty__list');
  const storage = realtyElem.querySelector('.realty__storage');
  const template = storage.querySelector('.realty__item');
  const buttonElem = realtyElem.querySelector('.realty__more');

  function renderArticle(data) {
    const articleElem = template.cloneNode(true);

    articleElem.querySelector('.article__link-wrapper').href = `${data.link}`;

    const photoWrapperElem = articleElem.querySelector('.article__photo-wrapper');
    photoWrapperElem.classList.add(`article__photo-wrapper--${data.tag}`);
    photoWrapperElem.querySelector('source').srcset = `img/${data.imageName}-desktop@1x.webp`;
    photoWrapperElem.querySelector('img').src = `img/${data.imageName}-desktop@1x.jpg`;

    articleElem.querySelector('.article__title').textContent = data.title;
    articleElem.querySelector('.article__address').textContent = data.address;
    articleElem.querySelector('.article__text').innerHTML = `${data.text} <b class="article__price">&#163;${data.price}</b>`;
    articleElem.querySelector('.article__info').textContent = data.info;

    return articleElem;
  }

  function onClick(evt) {
    evt.preventDefault();
    const result = document.createDocumentFragment();
    let data;
    try {
      data = JSON.parse(storage.dataset.storage);
    } catch {
      data = [];
      console.log('Bad realty data'); // eslint-disable-line no-console
    }
    data.forEach((value) => {
      result.appendChild(renderArticle(value));
    });
    listElem.appendChild(result);
  }

  if (realtyElem && storage && buttonElem) {
    buttonElem.addEventListener('click', onClick);
  }
}());
