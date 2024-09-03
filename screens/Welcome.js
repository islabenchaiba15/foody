import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import React, { useEffect } from 'react'
import {  Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context' 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw, { style } from 'twrnc'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

function Welcome() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation=useNavigation()
  useEffect(()=>{
    ring1padding.value=0;
    ring2padding.value=0;
    setTimeout(()=>ring1padding.value=withSpring(ring1padding.value+hp(5)), 100);
    setTimeout(()=>ring2padding.value=withSpring(ring1padding.value+hp(4)), 300);
    setTimeout(()=>navigation.navigate('Home'),2500)
  },[])
  return (
    <Animated.View style={tw`flex items-center justify-center bg-amber-500 w-full h-full `}>
        <ExpoStatusBar style='light'/>
         <Animated.View style={{...tw`bg-white/20 rounded-full`, padding: ring1padding}}> 
            <Animated.View style={{...tw`bg-white/20 rounded-full`, padding: ring2padding}}>
                <Image source={require('../assets/images/welcome.png')} style={{width:hp(20),height:hp(20)}}/>
            </Animated.View>
         </Animated.View>
         <View style={tw`flex items-center mt-15 gap-3`}>
            <Text style={{...tw`font-bold text-4xl text-white tracking-widest`,fontSize:hp(5)}}>
                Foody
            </Text>
            <Text style={{...tw`font-medium text-lg text-white tracking-widest`,fontSize:hp(2.5)}}>
                food is always right
            </Text>
         </View>
    </Animated.View>
  )
}

export default Welcome



const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(245 158 11)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})