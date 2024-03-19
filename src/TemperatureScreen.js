import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { debounce } from 'lodash';
import * as Progress from 'react-native-progress';
import { MagnifyingGlassIcon, CalendarDaysIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { fetchLocation, fetchWeatherForecast } from '../api/Weather';
import { weatherImages } from '../constants';
import { getData } from '../utils/asyncStorage.js';

export default function TemperatureScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchLocation({ cityName: loc.name }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    });
  };

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then(data => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Gampaha';
    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar style="light" />
      <Image blurRadius={70} source={require('../assets/logo.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
      {loading? (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Progress.CircleSnail thickness={10} size={40} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* search section */}
          <View style={{ height: '7%', marginHorizontal: 4, position: 'relative', zIndex: 50 }}>
            <View style={{ backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}>
              {
                showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search city"
                    placeholderTextColor="lightgray"
                    style={{ paddingLeft: 6, height: 40, fontSize: 16, color: 'white' }}
                  />
                ) : null
              }

              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 999, padding: 12, margin: 4 }}
              >
                <MagnifyingGlassIcon size={25} color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View style={{ position: 'absolute', width: '100%', backgroundColor: 'gray', top: 16, borderRadius: 12 }}>
                {locations.map((loc, index) => {
                  let ShowBorder = index + 1 != locations.length;
                  let borderClass = ShowBorder ? { borderBottomWidth: 2, borderBottomColor: 'gray' } : {};
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, padding: 12, paddingHorizontal: 16, marginBottom: 4, ...borderClass }}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text style={{ color: 'black', fontSize: 16, marginLeft: 8 }}>
                        {loc?.name}, {loc?.country}{' '}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* forecast section */}
          <View style={{ marginHorizontal: 4, flex: 1, justifyContent: 'space-around', marginBottom: 2 }}>
            {/* location */}
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
              {location?.name}
              <Text style={{ color: 'gray', fontSize: 16, fontWeight: 'bold' }}>
                {location?.country}
              </Text>
            </Text>

            {/* Weather Image */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image 
                source={weatherImages[current?.condition?.text]} 
                style={{ width: 130, height: 130 }} />
            </View>

            {/* Degree Celsius */}
            <View style={{ justifyContent: 'space-around' }}>

              <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 48, marginLeft: 5 }}>
                {current?.temp_c}23&#176;
              </Text>

              <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, letterSpacing: 1 }}>
                {current?.condition?.text}
              </Text>

            </View>

            {/* Forecast for next days */}
            <View style={{ marginBottom: 2, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginBottom: 3 }}>
                <CalendarDaysIcon size={22} color="white" />
                <Text style={{ color: 'white', fontSize: 16 }}> Daily Forecast </Text>
              </View>

              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday?.map((item, index) => {
                  let date = new Date(item.date);
                  let options = { weekday: 'long' };
                  let dayName = date.toLocaleDateString('en-Us', options);
                  dayName = dayName.split(',')[0];
                  return (
                    <View
                      key={index}
                      style={{ justifyContent: 'center', alignItems: 'center', width: 100, borderRadius: 12, paddingVertical: 3, marginRight: 4, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    >
                      <Image source={require('../assets/heavyrain.png')} style={{ height: 55, width: 55 }} />
                      <Text style={{ color: 'white' }}>{dayName}</Text>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>13&#176;</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

