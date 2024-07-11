import carsCard from './carsCard.json' with {type: 'json'};
import carsCarousel from './carCarousel.json' with {type: 'json'};

let carSlider = document.getElementById('car-carosuel');


function createCar() {
  let carArr = Object.values(carsCard.modele);
  let carContainer = document.querySelector('.cars-container');
  carContainer.innerHTML = ''; 

  if (window.innerWidth <= 1024) {

    let carousel = document.createElement('p-carousel');
    carousel.setAttribute('slides-per-page','1');
    carousel.setAttribute('heading',"Models")

    carSlider.setAttribute('slides-per-page','1');

    carArr.forEach(brand => {
      let slide = document.createElement('div');
      slide.innerHTML = 
      `<a href="${brand.url}">
      <p-button-tile label="Toate modelele"">
      <p-heading tag="h3" size="{ base: 'medium', l: 'large' }" color="inherit">
        ${brand.nume} <br> <p>de la ${brand.pice} EUR pretul include TVA</p>
      </p-heading>
      <img src="${brand.img}" alt="Some alt text" />
      </p-button-tile>
    </a>`;
      carousel.appendChild(slide);
    });

    carContainer.appendChild(carousel);
  } else {

    carSlider.setAttribute('slides-per-page','3');


    let carGrid = document.createElement('div');
    carGrid.classList.add('cars-container');

    carArr.forEach(brand => {
      let carCard = document.createElement('div');
      carCard.classList.add('car');
      carCard.innerHTML =
        `<a href="${brand.url}">
          <p-button-tile label="Toate modelele">
            <p-heading tag="h3" font="bold" size="{ base: 'large', l: 'medium' }" color="inherit">
              ${brand.nume} <br> <p>de la ${brand.pice} EUR pretul include TVA</p>
            </p-heading>
            <img src="${brand.img}" width="300" height="200" alt="Some alt text" />
          </p-button-tile>
        </a>`;
      carGrid.appendChild(carCard);
    });
    carContainer.appendChild(carGrid);
  }
}

createCar();

window.addEventListener('resize', createCar);

function createCarCard() {

  let porsche = Object.values(carsCarousel);
  porsche.forEach((car) => {
    let carSlide = document.createElement('div');
    carSlide.classList.add('car');
    carSlide.innerHTML = `
          <img src="${car.img}" alt="">
          <div class="car-list">
          <h1>${car.nume}</h1>
          <ul>
            <li>${car.state}</li>
            <li>${car.km}</li>
            <li>${car.owner}</li>
            <li>${car.cutie}</li>
            <li>${car.specs}</li>
          </ul>
          </div>

           <div class="car-footer">
          <h2>${car.price}</h2>
          <p-button-group>
          <p-button variant="primary">Mai multe detalii</p-button>
          </p-button-group>
          </div>
      `;
    carSlider.appendChild(carSlide);

  })

}
createCarCard();