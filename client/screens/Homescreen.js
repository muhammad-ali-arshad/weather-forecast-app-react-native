import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import {fetchlocations} from "../api/weather"
import { debounce } from 'lodash';
import {fetchWeatherForecast} from "../api/weather"
import {weatherImages} from "../constants/index"
import * as Progress from "react-native-progress"
import {getData, storeData} from '../utils/asyncStorage'


const Homescreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather ,setWeather] = useState({})
  const [loading ,setloading] = useState(true)

  const handleLocation = async (loc) => {
    try {
      setLocation([]);
      setShowSearch(false);
      setloading(true)
      const data = await fetchWeatherForecast({
        cityName: loc.name,
        days: 7,
      });
      setWeather(data)
      setloading(false)
      storeData('city' ,loc.name)
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleSearch = (text) => {
    if (text.length >= 2) {
      fetchlocations({ cityName: text }).then((data) => {
        setLocation(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

const fetchMyWeatherData = async () => {
  try {
    let myCity = await getData('city');
    let cityName = 'Islamabad';

    if (myCity) cityName = myCity;

    const data = await fetchWeatherForecast({
      cityName, 
      days: 7,
    });

    setWeather(data);
    setloading(false);
  } catch (error) {
    console.log('error:', error);
  }
};


  const handleTextDebounce = useCallback(
    debounce(handleSearch, 200),
    []
  );
  
  const { current, location } = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar style='light' />
      <Image 
        blurRadius={70} 
        source={require('../assets/images/bg.png')}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />

      {
        loading ? (
          <View className="flex-1 flex-row justify-center items-center">
            <Progress.Circle thickness={50} size={120} color="#0bb3b2" indeterminate={true} />
          </View>
        ) : (
          <SafeAreaView className='flex flex-1 pt-8'>
            <View className='mx-4 relative z-50'>
              <View 
                className='flex-row justify-end items-center'
                style={{
                  backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
                  borderRadius: 25,
                  overflow: 'hidden',
                  paddingHorizontal: showSearch ? 4 : 0,
                  paddingVertical: 4
                }}
              >
                {
                  showSearch ? (
                    <TextInput 
                      onChangeText={handleTextDebounce}
                      placeholder='Search city'
                      placeholderTextColor={'white'}
                      className='pl-6 h-10 pb-1 flex-1 text-base text-white pt-1'
                      style={{ borderRadius: 20 }}
                    />
                  ) : null
                }
                <TouchableOpacity 
                  onPress={() => setShowSearch(!showSearch)}
                  style={{backgroundColor:theme.bgWhite(0.3)}}
                  className='rounded-full p-3'
                >
                  <Ionicons name={showSearch ? "close" : "search"} size={25} color="white" />
                </TouchableOpacity>
              </View>

              {
                locations.length > 0 && showSearch ? (
                  <View className='absolute w-full bg-gray-300 top-16 rounded-3xl mt-2'>
                    {
                      locations.map((loc, index) => {
                        let showBorder = index + 1 !== locations.length;
                        let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                        return (
                          <TouchableOpacity
                            onPress={() => handleLocation(loc)}
                            key={index}
                            className={`flex-row p-4 border-0 items-center px-4 mb-1 ${borderClass}`}
                          >
                            <Ionicons name="location" size={20} color="gray" />
                            <Text className='text-black text-lg ml-2'>{loc?.name}, {loc?.country}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                ) : null
              }
            </View>

            <View className='mx-4 flex-1 justify-around mb-2'>
              <Text className='text-white text-center text-2xl font-bold'>{location?.name}
                <Text className='text-lg font-semibold text-gray-300'>, {location?.country}</Text>
              </Text>

              <View className="flex-col items-center">
                <Image 
                  source={weatherImages[current?.condition?.text] || weatherImages['other']}
                  style={{ width: 152, height: 152 }}
                />

                <View className="mt-24">
                  <Text className="text-white text-center text-7xl font-bold ml-1">
                    {current?.temp_c}°
                  </Text>
                </View>
              </View>

              <View>
                <Text className='text-white text-center text-xl tracking-widest'>{current?.condition?.text}</Text>
              </View>

              <View className='flex-row justify-between mx-4 mt-4'>
                <View className='items-center flex-row'>
                  <Image 
                    source={require('../assets/icons/wind.png')} 
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className='text-white font-semibold text-base ml-2'>{current?.wind_kph}km/h</Text>
                </View>

                <View className='items-center flex-row'>
                  <Image 
                    source={require('../assets/icons/drop.png')} 
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className='text-white font-semibold text-base ml-2'>{current?.humidity}%</Text>
                </View>

                <View className='items-center flex-row'>
                  <Image 
                    source={require('../assets/icons/sun.png')} 
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className='text-white font-semibold text-base ml-2'>{weather?.forecast?.forecastday[0]?.astro?.sunrise
}</Text>
                </View>
              </View>

              <View className='mb-2 mt-4'>
                <View className='flex-row items-center mx-2'>
                  <Ionicons name="calendar" size={22} color="white" />
                  <Text className='text-white text-base ml-3'>Daily forecast</Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="px-5"
              >
                {
                  weather?.forecast?.forecastday?.map((item, index) => {
                    let date = new Date(item.date);
                    let options = { weekday: 'long' };
                    let dayName = date.toLocaleDateString('en-US', options);
                    dayName = dayName.split(',')[0]

                    return (
                      <View 
                        key={index}
                        className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 r'
                        style={{ backgroundColor: theme.bgWhite(0.15) }}
                      >
                        <Image 
                          source={weatherImages[item?.day?.condition?.text] || weatherImages['other']}
                          style={{ width: 44, height: 44 }}
                        />
                        <Text className='text-white'>{dayName}</Text>
                        <Text className='text-white text-xl font-semibold'>{item?.day?.avgtemp_c}°</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </SafeAreaView>
        )
      }
    </View>
  )
}

export default Homescreen