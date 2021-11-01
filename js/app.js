const countryName = document.querySelector('.country')
const confirmed = document.querySelector('.confirmed-li')
const deaths = document.querySelector('.deaths-li')
const population = document.querySelector('.population-li')
const inputElem = document.querySelector('.input')
const searchBtn = document.querySelector('.search-btn')
const container = document.querySelector('.stats-container')

let enteredCountry

const renderStats = (country) => {
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
        .then(resp => resp.json())
        .then(stats => {
            let countryData = stats[country].All
            countryName.innerHTML = countryData.country
            confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
            deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
            population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
        })
        .catch(err => {
            const error = new Error('Country not found')
            console.error(`${error} | ${err.message}`)
        })
}

const renderDefaultStats = () => {
        fetch('https://api.db-ip.com/v2/free/self')
        .then(res => res.json())
        .then(data => {
            renderStats(data.countryName)
    })
};
renderDefaultStats();

inputElem.addEventListener('input',() => {
   enteredCountry = inputElem.value
})

searchBtn.addEventListener('click',() => {
   renderStats(enteredCountry)
})

