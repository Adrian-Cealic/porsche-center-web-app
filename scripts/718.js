import models718 from './718.json' with {type: 'json'};

const containers = {
    Cayman: document.querySelector('.modele_cayman'),
    Boxster: document.querySelector('.modele_boxster'),
    CaymanGT: document.querySelector('.modele_caymanGT'),
    Spyder: document.querySelector('.modele_spyder')
};

const checkboxes = {
    Cayman: document.getElementById('CaymanCheckBox'),
    Boxster: document.getElementById('BoxterCheckBox'),
    CaymanGT: document.getElementById('CaymanGTCheckBox'),
    Spyder: document.getElementById('SpyderCheckBox'),
    Auto: document.getElementById('automat'),
    Manual: document.getElementById('manual')
};

const models = {
    Cayman: Object.values(models718.Cayman),
    Boxster: Object.values(models718.Boxster),
    CaymanGT: Object.values(models718['Cayman GT']),
    Spyder: Object.values(models718.Spyder)
};

const filters = {
    model: [],
    transmission: [],
    horsepower: null,
    price: null
};


const filter = document.querySelector('.left .filter');
document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-button');
    const closeFilterButton = document.querySelector('.close-filter');

    filterButton.addEventListener('click', () => {
        filter.classList.toggle('active');

    });

    closeFilterButton.addEventListener('click', () => {
        filter.classList.toggle('active');
    });


})


function createCar(container, models) {
    container.innerHTML = '';
    models.forEach(model => {
        let carCard = document.createElement('div');
        carCard.classList.add('car-card');
        carCard.innerHTML = `
            <div class="img-container">
                <img src="${model.img1}"/>
            </div>
            <div class="card-head">
                <h3>${model.nume}</h3>
                <p>De la ${model.pret} EUR</p>
            </div>
            <button class="car-btn">
                <span>${model.putere_maxima_CP} hp <br>Putere maxima (CP)</span>
                <span>${model.acceleratie_0_100_km_h} s. Cu <br>Acceleratie 0-100 km/h</span>
                <span>${model.viteza_maxima_km_h} km/h <br>Viteza maxima</span>
            </button>
        `;
        container.appendChild(carCard);
    });
}

function displayFilteredCars() {
    Object.entries(containers).forEach(([modelType, container]) => {
        let filteredModels = models[modelType];

        if (filters.transmission.length > 0) {
            filteredModels = filteredModels.filter(car => filters.transmission.includes(car.transmisie));
        }

        if (filters.horsepower) {
            filteredModels = filterByHorsepower(filters.horsepower, filteredModels);
        }

        if (filters.price) {
            filteredModels = filterByPrice(filters.price, filteredModels);
        }

        if (filters.model.length === 0 || filters.model.includes(modelType)) {
            createCar(container, filteredModels);
        } else {
            container.innerHTML = '';
        }
    });
}

function handleModelCheckboxChange(checkbox, modelType) {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            filters.model.push(modelType);
        } else {
            filters.model = filters.model.filter(m => m !== modelType);
        }
        displayFilteredCars();
    });
}

function handleTransmissionCheckboxChange(checkbox, transmissionType) {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            filters.transmission.push(transmissionType);
        } else {
            filters.transmission = filters.transmission.filter(t => t !== transmissionType);
        }
        displayFilteredCars();
    });
}

function handleHorsepowerFilterChange() {
    const horsepowerFilter = document.getElementById('horsepowerFilter');
    horsepowerFilter.addEventListener('update', (e) => {
        filters.horsepower = e.target.value;
        displayFilteredCars();
    });
}

function handlePriceFilterChange() {
    const priceFilter = document.querySelector('p-select[name="price"]');
    priceFilter.addEventListener('update', (e) => {
        filters.price = e.target.value;
        displayFilteredCars();
    });
}

function filterByHorsepower(value, models) {
    switch (value) {
        case "300":
            return models.filter(car => car.putere_maxima_CP >= 300);
        case "400":
            return models.filter(car => car.putere_maxima_CP >= 400);
        case "500":
            return models.filter(car => car.putere_maxima_CP >= 500);
        default:
            return models;
    }
}

function filterByPrice(value, models) {
    const priceLimits = {
        "60k": 60000,
        "70k": 70000,
        "80k": 80000,
        "90k": 90000,
        "100k": 100000,
        "110k": 110000,
        "120k": 120000,
        "130k": 130000,
        "140k": 140000,
        "150k": 150000
    };

    if (value === "all") return models;

    const limit = priceLimits[value];
    return models.filter(car => car.pret <= limit);
}

function resetFilters() {
    filters.model = [];
    filters.transmission = [];
    filters.horsepower = null;
    filters.price = null;

    Object.values(checkboxes).forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById('horsepowerFilter').value = "all";
    document.querySelector('p-select[name="price"]').value = "all";

    displayFilteredCars();
}

document.querySelector('p-button').addEventListener('click', resetFilters);

displayFilteredCars();

Object.entries(checkboxes).forEach(([key, checkbox]) => {
    if (key === 'Auto') {
        handleTransmissionCheckboxChange(checkbox, 'automata');
    } else if (key === 'Manual') {
        handleTransmissionCheckboxChange(checkbox, 'manuala');
    } else {
        handleModelCheckboxChange(checkbox, key);
    }
});

handleHorsepowerFilterChange();
handlePriceFilterChange();
const input = document.getElementById('search-car');

input.addEventListener('input', (e) => {
    let searchText = e.target.value.trim().toLowerCase();

    Object.values(containers).forEach(container => {
        container.innerHTML = '';
    });

    let found = false;

    Object.entries(models).forEach(([modelType, modelList]) => {

        const filteredModels = modelList.filter(model => JSON.stringify(model.nume).toLowerCase().includes(searchText));

        if (filteredModels.length > 0) {
            createCar(containers[modelType], filteredModels);
            found = true;
        }
    });

    if (!found) {
        containers.Cayman.innerHTML = '<p>No cars found.</p>';
    }
});
