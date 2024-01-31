'use client';

import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY; 

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData', 
    async () =>{
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=austin&appid=${apiKey}&cnt=56`
      );
      return data;
    }
  );

  console.log("data ", data?.city.name);

  if (isLoading) return 'Loading...'

  return (
    <div className="flex flex-col gap-4 bg-gray-300 min-h-screen">
      <Navbar />
    </div>  
  );
}
