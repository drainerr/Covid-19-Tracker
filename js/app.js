const countryName = document.querySelector('.country')
const confirmed = document.querySelector('.confirmed-li')
const deaths = document.querySelector('.deaths-li')
const population = document.querySelector('.population-li')
const inputElem = document.querySelector('.input')
const searchBtn = document.querySelector('.search-btn')
const container = document.querySelector('.stats-container')

let givenCountry = '';

const renderStats = async (country) => {
    try{
        const fetched = await fetch('https://covid-api.mmediagroup.fr/v1/cases');
        const res = await fetched.json();
        const stats = await res;
        let countryData = stats[country].All
        countryName.innerHTML = countryData.country
        confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
        deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
        population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
    }   
    catch(err){
        alert('We could not find a country with the given name \nThe reason probably is that the data of this country is not found in the API we are using or you misspell the name')
        console.error(`${new Error('Country not found')} | ${err.message}`)
    }
}

const renderDefaultStats = async () => {
    try{
        const fetched = await fetch('https://api.db-ip.com/v2/free/self')
        const res = await fetched.json();
        const data = res;
        renderStats(data.countryName)
    }
    catch(err){
        console.error(err.message)
    }
};
renderDefaultStats();

inputElem.addEventListener('input',() => {
   givenCountry = inputElem.value
})

searchBtn.addEventListener('click',() => {
   renderStats(givenCountry)
})
