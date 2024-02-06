'use client';

import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";


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

  console.log("data ", data);

  const firstData = data?.list[0];
  
  const uniqueDates = [
    ...new Set(
      data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
    ) 
  ]

  const firstDataForEachDay = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
    
  if (isLoading) 
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>

  
    );
  
  return (
    <div className="flex flex-col gap-4 bg-gray-300 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today */}
        <section className="space-y-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">{format(parseISO(firstData?.dt_txt ?? ''), 'PPP')}</p>
            </h2>
            <Container className="gap-10 px-5 items-center " >
              <div className="flex flex-col px-4">
                <span className="text-3xl font-bold">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>
                    Feels like
                  </span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              {/*  weather time and icons for a day*/}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d,i) => (
                  <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="whitespace-nowrap ">
                      {format(parseISO(d.dt_txt), 'h:mm a')}
                    </p>
                      <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                    <p>
                      {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">{firstData?.weather[0].description ?? ''}</p>
              <WeatherIcon 
                iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')} 
              />
            </Container>
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails 
                visibility={metersToKilometers(firstData?.visibility ?? 1000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity }%`}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
                sunrise={(format(fromUnixTime(data?.city.sunrise ?? 0), 'H:mm'))}
                sunset={format(fromUnixTime(data?.city.sunset ?? 0), 'H:mm')}
                
              />
            </Container>
            
          </div>

        </section>
        {/* 7 day forecast */}
        <section className="flex w-ful flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
          {firstDataForEachDay.map((d, i) => 
            <ForecastWeatherDetail 
              key={i}
              description={d?.weather[0].description ?? ''}
              weatherIcon={d?.weather[0].icon ?? '01d'}
              date={format(parseISO(d?.dt_txt ?? ''), 'dd.MM')}
              day={format(parseISO(d?.dt_txt ?? ''), 'EEEE')}
              feelsLike={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              tempMax={d?.main.temp_max ?? 0}
              tempMin={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa`}
              humidity={`${d?.main.humidity }%`}
              sunrise={(format(fromUnixTime(data?.city.sunrise ?? 0), 'H:mm'))}
              sunset={format(fromUnixTime(data?.city.sunset ?? 0), 'H:mm')}
              visibility={`${metersToKilometers(d?.visibility ?? 1000)}`}
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
            />
          )}
          
        </section>  

      </main>
    </div>  
  );
}
