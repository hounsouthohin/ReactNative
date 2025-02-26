import { View, Text ,StyleSheet,ImageBackground} from 'react-native'
import React from 'react'
import icedCoffeeImg from '../assets/images/coffee-splash.png';

export default function explore() {
  return (
    <View style={styles.container}>
      <ImageBackground source={icedCoffeeImg} style={styles.image}>
      <Text style={styles.text}>Welcome to my explore page! Here we gonna talk about the functiunnalities of my app</Text>  
      
      </ImageBackground>
    </View>
    
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection   : 'row',
    },
    image: {
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    text: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }
  }
)