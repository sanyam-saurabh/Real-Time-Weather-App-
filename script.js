var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descrip = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
apik = "cff11b2197a50a78944ef106da9732a5";

function conversion(val){
    return (val - 273).toFixed(3)
}

btn.addEventListener('click', function()
{

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputvalue.value}&limit=5&appid=${apik}`)
    .then(res => res.json())
    .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Now, use the obtained lat and lon values in the weather API call
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apik}`)
    })

    .then(res => res.json())

    .then(data=>
        {
            var nameval = data['name']
            var weatherDescrip = data['weather']['0']['description']
            var temperature = data['main']['temp']
            var windspeed = data['wind']['speed']

            city.innerHTML = `Weather of <span>${nameval}</span>`
            temp.innerHTML = `Temperature: <span>${conversion(temperature)} C</span>`
            descrip.innerHTML = `Sky Conditions: <span>${weatherDescrip}</span>`
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h </span>`



        })

        .catch(err => alert('You Entered the wrong city name'))
})