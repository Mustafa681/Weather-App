const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
// destructure properties
const {cityDats, weather} = data; 
// update details template
details.innerHTML = `
      <h5 class="my-3">${cityDats.EnglishName}</h5>
        <div class="my-3">${weather
        .WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;c</span>
        </div>
`;
// update the night/day img & icon
const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
icon.setAttribute('src', iconSrc)

let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
time.setAttribute('src', timeSrc)

// remover the d-none class if present
if(card.classList.contains('d-none')){
  card.classList.remove('d-none');
}

}





const updateCity = async (city) => {
const cityDats = await getCity(city);
const weather = await getWeather(cityDats.Key);
return {
  cityDats: cityDats,
  weather: weather
};
}

cityForm.addEventListener('submit', e => {
  e.preventDefault();
// get city value
const city = cityForm.city.value.trim();
cityForm.reset();

// update the ui with new city info
updateCity(city)
.then(data => updateUI(data))
.catch(err => console.log(err));
});