import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../index';

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

export default function TemperatureScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc) => (
    console.log('location: ', loc)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image blurRadius={70} source={require('../assets/logo.png')} style={styles.backgroundImage} />
      <SafeAreaView style={styles.safeArea}>
        {/* search section */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }]}>
            {showSearch ? (
              <TextInput
                placeholder='Search city'
                placeholderTextColor='lightgray'
                style={styles.searchInput}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={[styles.searchButton, { backgroundColor: theme.bgWhite(0.3) }]}
            >
              <MagnifyingGlassIcon size={25} color='white' />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <ScrollView style={styles.locationsContainer}>
              {locations.map((loc, index) => {
                let showBorder = index + 1 !== locations.length;
                let borderStyle = showBorder ? styles.locationItemBorder : null;
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    style={[styles.locationItem, borderStyle]}
                  >
                    <MapPinIcon size={20} color='gray' />
                    <Text style={styles.locationText}>SriLanka, Gampaha</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}
        </View>
        {/* forecast section */}
        <View style={styles.forecastContainer}>
          <Text style={styles.locationText}>Sri Lanka</Text>
          <Text style={styles.subLocationText}>Gampaha</Text>
          <View style={styles.weatherImageContainer}>
            <Image source={require('../assets/partlycloudy.png')} style={styles.weatherImage} />
          </View>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>23&#176;</Text>
            <Text style={styles.weatherText}>Partly Cloudy</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  searchButton: {
    borderRadius: 20,
    padding: 8,
  },
  locationsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    marginTop: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  locationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  locationText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 5,
  },
  forecastContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  subLocationText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
  },
  weatherImageContainer: {
    marginBottom: 10,
  },
  weatherImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperatureText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  weatherText: {
    color: 'white',
    fontSize: 18,
  },
});
