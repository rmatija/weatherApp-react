import { useState } from 'react';
import axios from 'axios';


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({});

  const URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_key = 'a97a7baa9ba0e0dee8bd7d5db6f4e087';

  const fetchWeather = async (query) => {
      const {data} = await axios.get(URL, {
          params: {
              q: query,
              units: 'metric',
              appid: API_key
          }
      });

      return data
  }

  const search = async(e) => {
    if(e.key === 'Enter') {
      const data = await fetchWeather(query);

      console.log(data);
      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="app-wrap">

      <header>
        <input 
          type="text" 
          placeholder=" Search for a city.."
          value= { query }
          onChange= {e => setQuery(e.target.value)}
          onKeyPress={search}
          />
      </header>
      
      {weather.main && (
        <main>
          <div class="city">{weather.name}</div>
            <div class="temp">{weather.main.temp}<span>°c</span></div>
        </main>
      )};
    
    </div>
  );
}

export default App;
