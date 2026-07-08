// Load country data
let countries = {};

fetch("countries.json")
    .then(response => response.json())
    .then(data => {
        countries = data;
        console.log("Countries loaded!");
    })
    .catch(error => {
        console.error("Error loading countries:", error);
    });

// Search
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase().trim();

    flags.forEach(flag => {

        const country = countries[flag.id];

        if (!country) return;

        const matches =
            country.name.toLowerCase().includes(search) ||
            country.capital.toLowerCase().includes(search) ||
            country.continent.toLowerCase().includes(search) ||
            country.currency.toLowerCase().includes(search) ||
            country.language.toLowerCase().includes(search);

        flag.style.display = matches ? "flex" : "none";

    });

});

// No Results
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase().trim();

    let found = 0;

    flags.forEach(flag => {

        const country = countries[flag.id];

        if (!country) return;

        const matches =
            country.name.toLowerCase().includes(search) ||
            country.capital.toLowerCase().includes(search) ||
            country.continent.toLowerCase().includes(search) ||
            country.currency.toLowerCase().includes(search) ||
            country.language.toLowerCase().includes(search);

        if(matches){
            flag.style.display = "flex";
            found++;
        }else{
            flag.style.display = "none";
        }

    });

    if(found === 0){
        noResults.classList.add("show");
    }else{
        noResults.classList.remove("show");
    }

});

// Modal elements
const modal = document.getElementById("countryModal");
const closeBtn = document.querySelector(".close");

const modalFlag = document.getElementById("modalFlag");
const modalCountry = document.getElementById("modalCountry");
const modalCapital = document.getElementById("modalCapital");
const modalPopulation = document.getElementById("modalPopulation");
const modalContinent = document.getElementById("modalContinent");
const modalCurrency = document.getElementById("modalCurrency");
const modalLanguage = document.getElementById("modalLanguage");
const modalFact = document.getElementById("modalFact");

// Get every flag card
const flags = document.querySelectorAll(".flag");

flags.forEach(flag => {

    flag.addEventListener("click", () => {

        const country = countries[flag.id];

        if (!country) {
            alert("No information available yet for " + flag.id);
            return;
        }

        modalFlag.src = country.flag;
        modalFlag.alt = country.name;

        modalCountry.textContent = country.name;
        modalCapital.textContent = country.capital;
        modalPopulation.textContent = country.population;
        modalContinent.textContent = country.continent;
        modalCurrency.textContent = country.currency;
        modalLanguage.textContent = country.language;
        modalFact.textContent = country.fact;

        modal.classList.add("show");

    });

});

// Close button
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Close when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }

});

// Close using Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("show");
    }

});