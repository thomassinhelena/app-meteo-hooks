import React, { useState, useEffect, Fragment } from 'react';
import apiKey from '../Config';
import axios from 'axios';

const Weather = () => {
const [name, setName] = useState('');
const [icon, setIcon] = useState('');
const [iconDescrib, setIconDescrib] = useState('');
const [temp, setTemp] = useState(0);
const [humidity, setHumidity] = useState(0);
const [windSpeed, setWindSpeed] = useState(0);
const [windDegree, setWindDegree] = useState(0);


useEffect(() => {
navigator.geolocation.getCurrentPosition((position) => {
axios.get(`https:api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=${7}&units=metric&appid=${apiKey}`)
.then((response) => {
console.log(response);
setName(response.data.name)
setIcon(response.data.list[0].weather[0].icon);
setIconDescrib(response.data.list[0].weather[0].description);
setTemp(response.data.list[0].main.temp);
setHumidity(response.data.list[0].main.humidity);
setWindSpeed(response.data.list[0].wind.speed);
setWindDegree(response.data.list[0].wind.deg);
})
});
}, []);

return (
<Fragment>
<h2>{name}</h2>
<img src={`https://openweathermap.org/img/wn/10n@2x.png`} alt={iconDescrib} />
<p>{temp}°C</p>
<p>{windSpeed*3.6}Km/h</p>
<p>{humidity}%</p>
<img src={`${process.env.PUBLIC_URL}/Assets/Images/map-arrow-png-1.png`}width="100px" style={{transform: `rotate(${windDegree}deg)`}}/>
</Fragment>
)
}


export default Weather;
