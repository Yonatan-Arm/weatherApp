import axios from "axios";
import { storageService } from "./async.service.js";
import { utilService } from "./util.service.js";
export const weatherService = {
  query,
  getById,
  remove,
  save,
  getEmptyFavoriteCity,
  loadFavoritePlaces,
  updateCity,
};
const STORAGE_KEY = "weather_db";
const TELAVIV_WEATHER = "telaviv_weather";
const FAVORITE = "favorite_weather";
const APIKey = "pi796AAqXGTMzFPo3KzDFn0WlIa3Vp7u";
const WEATHERURI = "https://dataservice.accuweather.com/forecasts/v1/daily/";
const CITYURI =
  "https://dataservice.accuweather.com/locations/v1/cities/search";

const FAVORITE_PLACES = [
  {
    _id: "101",
    name: "Tel aviv",
    weather: "",
  },
  {
    _id: "102",
    name: "Ashdod",
    weather: "",
  },
  {
    _id: "103",
    name: "Jerusalem",
    weather: "",
  },
  {
    _id: "104",
    name: "Eilat",
    weather: "",
  },
  {
    _id: "105",
    name: "Ramat Gan",
    weather: "",
  },
];


async function query(filterBy, time) {
  try {
    let weathers = [];
    if (!filterBy) {
      weathers = await storageService.query(TELAVIV_WEATHER);
      if (!weathers.length) {
        const res = await updateCity("tel-aviv", time);
        storageService.store(TELAVIV_WEATHER, res);
        return res.weather;
      }
    }
    if (!weathers.length) {
      let response = await updateCity(filterBy.city,5);
      return response.weather;
    }
  } catch (error) {
    throw new Error("error on quey FE", error);
  }
}

async function getById(id) {
  try {
    return await storageService.get(STORAGE_KEY, id);
  } catch (error) {
    throw new Error("error on getById FE", error);
  }
}

async function remove(id) {
  try {
    return await storageService.remove(FAVORITE, id);
  } catch (error) {
    throw new Error("error on remove Fe", error);
  }
}

async function save(weather) {
  try {
    if (weather._id) {
      return await storageService.put(FAVORITE, weather);
    }
    const addedweather = await storageService.post(FAVORITE, weather);
    return addedweather;
  } catch (error) {
    throw new Error("error on save fe", error);
  }
}

function getEmptyFavoriteCity(title = "new weather") {
  return {
    _id: '',
    name: "",
    weather: "",
  };
}

async function updateCity(city, time) {
  const cityData = await getCity(city);
  const weather = await getWeather(cityData.Key, time);
  return { cityData, weather };
}

async function getCity(city) {
  const query = `?apikey=${APIKey}&q=${city}`;
  const response = await fetch(CITYURI + query);
  const data = await response.json();
  return data[0];
}

async function getWeather(key, time = 1) {
  const query = `${key}?apikey=${APIKey}`;
  const response = await fetch(WEATHERURI + time + "day/" + query);
  const data = await response.json();
  return data.DailyForecasts;
}

async function loadFavoritePlaces() {
  const favoritePlaces = await storageService.query(FAVORITE);
  if(!favoritePlaces.length) {
  const places =  await Promise.all(FAVORITE_PLACES.map(async place =>{
     place.weather = await updateCity(place.name)
     return place
  }))
  storageService.store(FAVORITE, places);
  return places
}
return favoritePlaces
}
