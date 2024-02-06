import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {

  const {
    weatherIcon = '01d',
    date = '19.09',
    day = 'Monday',
    temp = 289,
    feelsLike = 300,
    tempMin = 301,
    tempMax = 299,
    description = 'Clear sky',
  } = props;
    
  return (
    <Container className='gap-4'>
      <section className='flex gap-4 items-center px-4'>
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p className=' '>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>
        <div className='flex flex-col px-4'>
          <span className='text-2xl'>{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span> Feels like </span>
            <span>{convertKelvinToCelsius(feelsLike ?? 0)}°</span>
          </p>
          <p className='capitalize'>
            {description}
          </p>
        </div>
      </section>
      <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
        <WeatherDetails {...props} />
      </section>
    </Container>
  )
}