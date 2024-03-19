
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStartPage = () => {
    const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.png')} // Replace 'logo.png' with your logo file name
        style={styles.logo}
      />
      <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Login') }>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GetStartPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  getStartedButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00FF00',
    borderRadius: 5,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});