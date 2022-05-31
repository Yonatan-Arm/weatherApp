import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavoritePlaces, removeWeather } from "../store/actions/weatherActions";
import Loader from "../assets/imgs/loader.gif"


export const HomePage = () => {
  const { favoritePlaces } = useSelector((state) => state.weatherModule);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFavoritePlaces());
  }, []);
 
  const getUnit = (num)=> {
    return Math.floor((num-32) *5 / 9);
  }
  const getImg = (num)=> {
    num =num.toString()
    if(num.length< 2)  return `https://developer.accuweather.com/sites/default/files/0${num}-s.png`
   return `https://developer.accuweather.com/sites/default/files/${num}-s.png`
  }
  
  const removeFromFavorite = (placeId) => {
  dispatch(removeWeather(placeId));
 
  }


  if (!favoritePlaces) return <img src={Loader} className="loader" />
  return (
    <div className="home-page">
      <h1> Mister weather</h1>
      <div>
          <h3>Favorite Places </h3>
          <ul className="cards-container flex wrap">
            {favoritePlaces.map((place, index) => {
              return (
                <li
                  key={index}
                  className="card flex column align-center justify-center"
                >
                  <span className="card-name">{place.name}</span>
                  <span>{new Date(place.weather.weather[0].Date).toLocaleDateString()}</span>
                  <span>
                    {getUnit(place.weather.weather[0].Temperature.Minimum.Value)} &#8451;-
                    {getUnit(place.weather.weather[0].Temperature.Maximum.Value)}&#8451;
                  </span>
                  <img src={getImg(place.weather.weather[0].Day.Icon)} alt="icon" />

                  <div className="card-actions">
                    <button onClick={ () => removeFromFavorite(place._id)} title='delete'>🗑️</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
    </div>
  );
};
