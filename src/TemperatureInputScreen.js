import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const TemperatureInputScreen = ({ submitTemperature }) => {
  const [temperature, setTemperature] = useState('');

  const handleTemperatureSubmit = () => {
    // Call the function passed as a prop to submit the temperature
    submitTemperature(temperature);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Temperature"
        value={temperature}
        onChangeText={(text) => setTemperature(text)}
        style={{
          width: '90%',
          fontSize: 18,
          padding: 12,
          borderWidth: 1,
          justifyContent: 'center',
          borderColor: '#000',
          marginTop: 70,
          marginBottom: 60,
          borderRadius: 15,
          marginLeft: 15,
        }}
      />

      <View style={{ width: '50%', padding: 12, justifyContent: 'center', borderRadius: 15, marginLeft: 100 }}>
        <Button title="Submit Temperature" onPress={handleTemperatureSubmit} style={{ fontSize: 18 }} />
      </View>
    </View>
  );
};

export default TemperatureInputScreen;