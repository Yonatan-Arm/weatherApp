import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWeather, setFilterBy, updateWeather } from "../store/actions/weatherActions";
import { useForm } from "../hooks/useForm";
import { weatherService } from "../service/weather.service.js";
import Loader from "../assets/imgs/loader.gif"

export const WeatherApp = () => {
  const { weathers } = useSelector((state) => state.weatherModule);
  const [filterBy, handleChange] = useForm(
    useSelector((state) => state.weatherModule.filterBy)
  );
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWeather());
  }, []);
  const setFilter = async () => {
    await dispatch(setFilterBy(JSON.parse(JSON.stringify(filterBy))));
    await dispatch(loadWeather(filterBy));
  };

  const getUnit = (num)=> {
    return Math.floor((num-32) *5 / 9);
  }
  const getImg = (num)=> {
    num =num.toString()
    if(num.length< 2)  return `https://developer.accuweather.com/sites/default/files/0${num}-s.png`
   return `https://developer.accuweather.com/sites/default/files/${num}-s.png`
  }
  

  const  addFavorite = ()=>{
   if(!filterBy.city) {
     const favoriteCity = weatherService.getEmptyFavoriteCity()
     favoriteCity.name = 'tel aviv'
     dispatch(updateWeather(favoriteCity))
   }
   else {
    const favoriteCity = weatherService.getEmptyFavoriteCity()
    favoriteCity.name = filterBy.city
    dispatch(updateWeather(favoriteCity))

   }
   setIsLoading(true)
   setTimeout(() =>{
    setIsLoading(false)
   }, 2000)
  }

  if (!weathers) return  <img src={Loader} className="loader" />
  return (
    <div className="container weatherApp flex column">
      <h1>weatherApp </h1>
      <div className="filter-contianer flex">
        <label htmlFor="city">
          <input
            type="text"
            placeholder="choose a city"
            value={filterBy.city}
            onChange={handleChange}
            name="city"
            id="city"
          />
        </label>
        <button onClick={setFilter}> 
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="header-container flex space-between">
        <div>
          <h3>{filterBy.city ? filterBy.city : "tel-aviv"}</h3>
           <ul className="cards-container flex wrap">
            {weathers.map((weather, index) => {
              return (
                <li
                  key={index}
                  className="card flex column align-center justify-center"
                >
                  <span>{new Date(weather.Date).toLocaleDateString()}</span>
                  <span>
                    {getUnit(weather.Temperature.Minimum.Value)} &#8451;-
                    {getUnit(weather.Temperature.Maximum.Value)}&#8451;
                  </span>
                  <img src={getImg(weather.Day.Icon)} alt="icon" />
                </li>
              );
            })}
          </ul> 
        </div>
        <div className="actions">
          <button onClick={()=> addFavorite()} title="Add to favorite">
          <i className="fa-regular fa-star"></i>
          </button>
          {isLoading  &&
          <div className="success">    
             ✔️ Add to favorite
          </div>
      }
        </div>
      </div>
      <div className="weather-container">
        <h2 className="flex align-center justify-center">scattered clouds</h2>
      </div>
    </div>
  );
};
