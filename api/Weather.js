import axios from 'axios';
import { apiKey } from '../constants';

const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}1&aqi=no&alerts=no`;
const locatonEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint)=> {
    const options = {
        method: 'Get',
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',err);
        return null;
    }
}

export const fetchWeatherForecast = params=> {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocation = params=> {
    return apiCall(locatonEndpoint(params));
}