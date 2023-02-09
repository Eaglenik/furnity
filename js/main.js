// slider head
$('.owl-carousel').owlCarousel({
  loop:true,
  margin: 42,
  nav:true,
  responsive:{
    0:{
      items:1
    },
    700:{
      items:2
    },
    992:{
      items:3
    },
    1200:{
      items:4
    }
  },
  mouseDrag: false,
  dots: false,
  navText: [
    '<span class="icon-arrL"></span>',
    '<span class="icon-arrR"></span>',
  ],
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
})


// items
const itemBtn = document.querySelectorAll('.item-btn')
const sellcards = document.querySelector('.sellcards')
const cart = document.querySelector('.btn-primary')
const fullPrice = document.querySelector('.fullprice')
let price = 0

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
};

const printQuantity = () => {
  let length = sellcards.querySelector('.sellcards-bar').children.length;
};

const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)}`;
};

const generateItem = (img, title, content, price, id) =>{
  return `
    <div class="sellcards-del">
      <article class="sellcards-sellcard" data-id="${id}">
        <div class="sellcards-sellcard__content">
          <img src="${img}" alt="">
          <div class="sellcards-sellcard__content--text">
            <h4>${title}</h4>
            <p>${content}</p>
          </div>
        </div>
        <div class="price d-flex align-items-center justify-content-center">
          <h5 class="item-current__price icon-dollar">${price}</h5>
          <button class="icon-trash card-delete"></button>
        </div>
      </article>
    </div>
  `;
};

const deleteItem = (productParent) => {
  let id = productParent.querySelector('.sellcards-sellcard').dataset.id;

  let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.item-current__price').textContent));
  minusFullPrice(currentPrice);
  
  printFullPrice();

  productParent.remove();

  printQuantity();
};

itemBtn.forEach(el => {
  el.closest('.item').setAttribute('data-id', randomId());
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.item');
    let id = parent.dataset.id;
    let img = parent.querySelector('.item-img img').getAttribute('src');
    let content =parent.querySelector('.item-content_content').textContent;
    let title = parent.querySelector('.item-content_title').textContent;
    let priceString = priceWithoutSpaces(parent.querySelector('.item-content_current--price').textContent);
    let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.item-content_current--price').textContent));

    plusFullPrice(priceNumber);
    printFullPrice();
    sellcards.querySelector('.sellcards-bar').insertAdjacentHTML('afterbegin', generateItem(img, title, content, priceString, id));
    printQuantity();

    // self.disabled = true;
  })
});

sellcards.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-delete')) {
    deleteItem(e.target.closest('.sellcards-del'));
  }
});