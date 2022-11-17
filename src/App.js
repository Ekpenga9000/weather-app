import React, { useRef, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import './App.css';
import { groupWeatherDates } from "./utils/weather.functions";
// import Altdata from './components/Altdata';

const API_KEY = "064e46ef54fe58c854a42b2615975636"; 
function App() {
  const [weather, setWeather]=useState({})
  const [isLoading, setIsLoading]=useState(true)
  const [error, setError]=useState(null)
  const [search, setSearch] = useState('Lagos');
  const [activeDate, setActiveDate] = useState(null)
  const searchRef = useRef();

  const debouncedSave = useCallback(
    debounce(val => setSearch(val), 500),
    []
  );

  const onSubmit = e => {
    e.preventDefault()
    const val = searchRef.current.value === "" ? "Lagos" : searchRef.current.value;
    debouncedSave(val);
    searchRef.current.value = "";

  }

  useEffect(() => {
    console.log('Search === ', search)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&exclude=alerts,minutely&appid=${API_KEY}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if(!data) return (`Please reload this page`)
        console.log(data);
        
        console.log(data.list)
        const weatherData = groupWeatherDates(data.list)
        setWeather({
          main: data,
          mapped: weatherData
        });
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
    })
  }, [search])
  
  return (
    <div className="super-container">
      <div className="container">
        <div style={{marginBottom:"1.2em"}}>
          <h3 style={{textAlign:"center"}}>&#9925; Weather App</h3>
        </div>
        <div className="input-container">
          {/* <Home /> */}
          {isLoading && <div> Data Loading... </div>}
          {error && <div>{error}</div>}
          <form>
            <input type="search" ref={searchRef}/>
            <button type="submit" onClick={onSubmit}>&#128269;</button>
          </form>
        </div>
    
          {weather && weather.main ? <React.Fragment>
            <p style={{textAlign:"center" }}>{weather && weather.main["city"].name},     
            <span className="country">{weather && weather.main["city"].country}</span>
            </p>
            
          <div className="Deets-container">
            <div className="daysoftheweek-container">
            <ul className="daysoftheweek">
              {Object.entries(weather.mapped).map(([key]) => {

                return <li className="day-list" key={key} onClick={() => setActiveDate(key)}> {key} </li>
              })}
            </ul>
            </div>
              <div className="first-deet">
              {activeDate && weather.mapped[activeDate] ? weather.mapped[activeDate].map((value, index) => {
                
                if (index === 0) {
                  return <div className="first-deet-container">
                    <img src={`http://openweathermap.org/img/wn/${value["weather"][0].icon}.png`} alt={value["weather"][0].description} />

                    <p style={{ fontSize: "1.9rem", fontWeight: "500", textAlign: "center" }}>{(value["main"].feels_like).toFixed() } &#8451;</p>

                    <p style={{ fontSize: "1rem", fontWeight: "700", textAlign: "center", marginBottom: ".5em" }}>{value["weather"][0].description}</p>
                    <div className="minMax">
                    <p style={{ fontSize: ".9rem", fontWeight: "500", textAlign: "center" }}>L: { (value["main"].temp_min).toFixed()} &#8451;</p>  | 
                    <p style={{ fontSize: ".9rem", fontWeight: "500", textAlign: "center" }}>H: { (value["main"].temp_max).toFixed()} &#8451;</p>
                    </div>
                  </div>
                }
              }): null }

              </div>
            
            </div>
          
          <div className="weather-card-div">
            {activeDate && weather.mapped[activeDate] ? weather.mapped[activeDate].map((value, index) => {
              const newDate = new Date(value.dt * 1000);
              const amPm = newDate.getUTCHours() >= 12 ? "pm" : "am";
              const hours = (newDate.getUTCHours() % 12) || 12;
              
            
              return <div className="date-items" key={index}>
              <div className="header-card">
              <p style={{ fontWeight: "500", textAlign: "center" }}>{(value["main"].feels_like).toFixed() } &#8451;</p>
              </div>    
              <img src={`http://openweathermap.org/img/wn/${value["weather"][0].icon}@2x.png`} alt={value["weather"][0].description} />
                <p style={{ fontWeight: "500", textAlign: "center" }} >{hours} : {newDate.getUTCMinutes()}{newDate.getUTCMinutes()} {amPm}</p>
                
              </div>
          
          }) : `Click on the days to view the weather.`}
          </div> 

        </React.Fragment> : null }
        
      </div>  
    </div> 
    
  );
}

export default App;
