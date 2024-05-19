document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-galery', {
      direction: 'horizontal',
      loop: false,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
  });
  var swiperVertical = new Swiper('.swiper-vertical', {
    // Optional parameters
    direction: 'vertical',
    loop: false,
    // slidesPerView: 1,
    spaceBetween: 10,
    mousewheel: true,
  });

  document.querySelector('.upload-btn').addEventListener('click', function () {
      document.getElementById('upload-input').click();
  });

  document.getElementById('upload-input').addEventListener('change', function (event) {
      if (event.target.files && event.target.files[0]) {
          handleFileUpload(event.target.files[0]);
      }
  });

  function handleFileUpload(file) {
      if (file) {
          var reader = new FileReader();
          reader.onload = function (e) {
              var newSlide = document.createElement('div');
              newSlide.className = 'swiper-slide';
              newSlide.innerHTML = `
                  <div class="slide-content">
                      <div class="swiper__image">
                          <img src="${e.target.result}" alt="User Photo">
                      </div>
                      <button class="delete-slide"></button>
                  </div>
              `;

              var addSlideIndex = swiper.slides.length - 1;
              swiper.addSlide(addSlideIndex, newSlide);

              swiper.update();
              attachDeleteEvent();
          };
          reader.readAsDataURL(file);
      }
  }

  function deleteSlide(event) {
      if (swiper.slides.length > 2) {
          var slide = event.target.closest('.swiper-slide');
          var slideIndex = Array.prototype.indexOf.call(slide.parentNode.children, slide);
          swiper.removeSlide(slideIndex);
          swiper.update();
      } else {
          alert('Невозможно удалить все слайды.');
      }
  }

  function attachDeleteEvent() {
      document.querySelectorAll('.delete-slide').forEach(function (button) {
          button.removeEventListener('click', deleteSlide);
          button.addEventListener('click', deleteSlide);
      });
  }

  function attachDragAndDropEvent() {
      var dropZone = document.querySelector('.drop-zone');
      dropZone.addEventListener('dragover', function (e) {
          e.preventDefault();
          dropZone.classList.add('drop-zone-hover');
      });
      dropZone.addEventListener('dragleave', function () {
          dropZone.classList.remove('drop-zone-hover');
      });
      dropZone.addEventListener('drop', function (e) {
          e.preventDefault();
          dropZone.classList.remove('drop-zone-hover');
          var files = e.dataTransfer.files;
          if (files.length) {
              handleFileUpload(files[0]);
          }
      });
  }

  attachDeleteEvent();
  attachDragAndDropEvent();

  swiper.on('slideChange', function () {
      swiper.slides.forEach(function (slide, index) {
          slide.setAttribute('data-swiper-slide-index', index);
      });
  });

  swiper.slides.forEach(function (slide, index) {
      slide.setAttribute('data-swiper-slide-index', index);
  });
});

const dropZone = document.getElementById('dropZone');
        const cardImageInput = document.getElementById('cardImage');

        dropZone.addEventListener('click', () => {
            cardImageInput.click();
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                cardImageInput.files = files;
                dropZone.textContent = files[0].name;
            }
        });

        cardImageInput.addEventListener('change', () => {
            if (cardImageInput.files.length > 0) {
                dropZone.textContent = cardImageInput.files[0].name;
            }
        });
        
function createCard() {
    const cardText = document.getElementById('cardText').value;
    const cardImageInput = document.getElementById('cardImage');
    const cardImage = cardImageInput.files[0];

    if (!cardText || !cardImage) {
        alert("Пожалуйста, заполните текст и выберите изображение.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card';

        const cardInner = document.createElement('div');
        cardInner.className = 'card__inner';

        const cardFront = document.createElement('div');
        cardFront.className = 'card__item card-front';
        const textParagraph = document.createElement('p');
        textParagraph.className = 'card__text';
        textParagraph.innerText = cardText;
        cardFront.appendChild(textParagraph);

        const cardBack = document.createElement('div');
        cardBack.className = 'card__item card-back';
        const imageElement = document.createElement('img');
        imageElement.className = 'card__img';
        imageElement.src = e.target.result;
        cardBack.appendChild(imageElement);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardContainer.appendChild(cardInner);

        const cardsContainer = document.querySelector('.flip-cards');
        cardsContainer.insertBefore(cardContainer, cardsContainer.lastElementChild);

        // Clear inputs
        document.getElementById('cardText').value = '';
        document.getElementById('cardImage').value = '';
    };

    reader.readAsDataURL(cardImage);
}

