import { View, Text ,StyleSheet,ImageBackground,Pressable} from 'react-native'
import React from 'react'
import icedCoffeeImg from '../assets/images/iced-coffee.png';
import { Link } from 'expo-router';



const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={icedCoffeeImg} style={styles.image}>
      <Text style={styles.text}>Coffe Shop</Text>
      
      <Link href="/contact" style={{marginHorizontal:'auto',...styles.link}} asChild>
        <Pressable style={styles.button}><Text style={styles.buttonText}>Contact Us</Text></Pressable>
      </Link>
      <Link href="/menu" style={{marginHorizontal:'auto',...styles.link}} asChild>
        <Pressable style={styles.button}><Text style={styles.buttonText}>Coffe Menu</Text></Pressable>
      </Link>
      </ImageBackground>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection : 'row',
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    flex:1,
    justifyContent:'center',
  },
  text:{
    color:'white',
    fontSize:42,
    textAlign:'center',
    fontWeight:'bold',
    backgroundColor:'rgb(0,0,0,0.5)',
  },
  link:{
    color:'white',
    fontSize:42,
    textAlign:'center',
    fontWeight:'bold',
    backgroundColor:'rgb(0,0,0,0.5)',
    textDecorationLine:'underline',
    padding: 4,
    textDecorationLine:'underline',
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rbg(0,0,0,0.75)',
    padding: 5,
  },
  buttonText: {
    color: 'white',
    borderRadius: 20,
    backgroundColor: 'rbg(0,0,0,0.75)',
    padding: 5,
  }
})

export default app