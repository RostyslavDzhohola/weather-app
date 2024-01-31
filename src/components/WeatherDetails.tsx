import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { FaWind } from "react-icons/fa";
import { ImMeter } from  "react-icons/im";
import { LuSunset, LuSunrise, LuEye } from "react-icons/lu";

export interface WeatherDetailProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visibility = "25km",
    humidity = "25%",
    windSpeed = "25km/h",
    airPressure = "25hPa",
    sunrise = "06:00",
    sunset = "18:00",
  } = props;
  
  return (
    <>
      <SingleWeatherDetail information='Visibility' icon={<LuEye />} value={visibility} />
      <SingleWeatherDetail information='Humidity' icon={<FiDroplet />} value={humidity} />
      <SingleWeatherDetail information='Wind Speed' icon={<FaWind />} value={windSpeed} />
      <SingleWeatherDetail information='Air Pressure' icon={<ImMeter />} value={airPressure} />
      <SingleWeatherDetail information='Sunrise' icon={<LuSunrise />} value={sunrise} />
      <SingleWeatherDetail information='Sunset' icon={<LuSunset />} value={sunset} />
      
    </>
  )
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
  return (
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  )
};