import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b5589f98e453a6bd06f7acac8832db44`;
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };
  return (
    <div className="app">

      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search City"
        />
      </div>

      {data.name && (
        <div className="weather-container">

          <div className="weather-info">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? <p className="bold">{(data.wind.speed * 2.237).toFixed()} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>

          {data.coord && (
            <div className="map">
              <iframe
                width="600"
                height="400"
                frameBorder="0"
                style={{ border: 0, width: '100%', height: '100%' }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.coord.lon - 0.01},${data.coord.lat - 0.01},${data.coord.lon + 0.01},${data.coord.lat + 0.01}&layer=mapnik`}
                allowFullScreen=""
                title="Map"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;