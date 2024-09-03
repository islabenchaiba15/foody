import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import { FadeInDown, FadeOut } from 'react-native-reanimated';

export default function RecipeDetailScreen(props) {

    useEffect(() =>{
        getIngredient(item.idMeal)
        ingredientIndexes(meal)
    },[])
const [isFavourite,setIsFavourite]=useState(false)
const item=props.route.params
const navigation =useNavigation()
const [meal,setMeal]=useState([])
const [loading,setLoading]=useState(true)
const getIngredient=async (id) =>{
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) 
        setMeal(response.data.meals[0])
        setLoading(false)

    } catch (error) {
        console.log('erooooooooooooooor',error.message)
    }
}
const ingredientIndexes =(meal)=>{
    if(!meal) return []
    let indexes =[]
    for(let i=1; i<=20; i++){
        if(meal['strIngredient'+i]){
            indexes.push(i)
        }
    }
    return indexes
}
const extractVideoId = (youtubeLink) => {
    // Regular expression to extract video ID from YouTube link
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  
    const match = youtubeLink.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      return 'Invalid YouTube link';
    }
  };
    return (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={tw`bg-white flex-1 flex-col `}
        >
            <StatusBar style={'light'}/>
            <View style={tw`-mt-2 flex items-center relative`}>
                <Animated.Image source={{uri:item.strMealThumb}} 
                        sharedTransitionTag={item.strMeal} 
                        style={{...tw``,width:wp(100) ,height:hp(50),borderRadius:33,borderBottomRightRadius:70,borderBottomLeftRadius:70,resizeMode: 'contain'}}
                />
                <View style={tw`flex-1 w-full absolute flex-row items-center justify-between mt-12`}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}style={tw`p-2 bg-white rounded-full ml-6`}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setIsFavourite(!isFavourite)}style={tw`p-2 bg-white rounded-full mr-6`}>
                        <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red" :"gray"}/>
                    </TouchableOpacity>
                </View>
            </View>
            {
            loading? (
                <Loading size="large" className="mt-16" />
            ):(
                <View>
                    <View style={tw`mx-4 mt-4 flex flex-col `}>
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}>
                            <Text style={{...tw`text-neutral-800 `,fontSize:hp(3), fontWeight: 'bold',}}>
                                {meal?.strMeal}
                            </Text>
                            <Text style={{...tw`text-neutral-600 mt-1`,fontSize:hp(2.5)}}>
                                {meal?.strArea}
                            </Text>
                        </Animated.View>
                        <Animated.View  entering={FadeInDown.delay(200).duration(700).springify().damping(12) }style={tw`flex flex-row gap-4 items-center justify-between mt-6`}>
                            <View style={{...tw`flex flex-col items-center gap-1 bg-amber-500 p-3 rounded-full`,}}>
                            <View style={tw`p-2 bg-white rounded-full`}>
                                <ClockIcon size={hp(4)} color={"black"} strokeWidth={2.5}/>
                            </View>
                            <View style={tw`flex flex-col items-center`}>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    35 
                                </Text>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    min
                                </Text>
                            </View>
                        </View>
                        <View style={{...tw`flex flex-col items-center gap-1 bg-amber-500 p-3 rounded-full`,}}>
                            <View style={tw`p-2 bg-white rounded-full`}>
                                <UsersIcon size={hp(4)} color={"black"} />
                            </View>
                            <View style={tw`flex flex-col items-center`}>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    3  
                                </Text>
                                <Text style={{...tw`text-black font-bold` ,fontSize:hp(1.8)}}>
                                    serving
                                </Text>
                            </View>
                        </View>
                        <View style={{...tw`flex flex-col items-center gap-1 bg-amber-500 p-3 rounded-full`,}}>
                            <View style={tw`p-2 bg-white rounded-full`}>
                                <FireIcon size={hp(4)} color={"black"} strokeWidth={2.5}/>
                            </View>
                            <View style={tw`flex flex-col items-center`}>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    103
                                </Text>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View style={{...tw`flex flex-col items-center gap-1 bg-amber-500 p-3 rounded-full`,}}>
                            <View style={tw`p-2 bg-white rounded-full`}>
                                <Square3Stack3DIcon size={hp(4)} color={"black"} strokeWidth={2.5}/>
                            </View>
                            <View style={tw`flex flex-col items-center`}>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    35 
                                </Text>
                                <Text style={{...tw`text-black font-bold`,fontSize:hp(1.8)}}>
                                    min
                                </Text>
                            </View>
                        </View>
                        </Animated.View>
                </View>
            <Animated.View entering={FadeInDown.delay( 400).duration(700).springify().damping(12) } style={tw`mx-4 mt-3`}>
                <Text style={{...tw`text-black mt-1 font-bold tracking-widest text-base`,fontSize:hp(2.6)}}>
                    Ingredients 
                </Text>
                <View style={tw`my-3`}>
                   {
                    ingredientIndexes(meal).map(i=>{
                        return(
                            <View key={i} style={tw`flex flex-row gap-3 mt-1 ml-4 items-center`}>
                                <View style={{...tw`p-1 rounded-full bg-amber-500 `,width:hp(1.2) ,height:hp(1.2)}}/>
                                <View style={tw`flex flex-row gap-1`}>
                                    <Text style={{...tw`font-bold text-black `,fontSize:hp(2)}}>{meal["strMeasure"+i]}</Text>
                                    <Text style={{...tw`font-bold text-black `,fontSize:hp(2)}}>{meal["strIngredient"+i]}</Text>
                                </View>
                            </View>
                        )
                    })
                   }
                </View>
            </Animated.View>
            <View style={tw`mx-4 `}>
                <Text style={{...tw`text-black mt-1 font-bold tracking-widest text-base`,fontSize:hp(2.6)}}>
                    Instructions 
                </Text>
                <Text style={{...tw`ml-4 mt-4`,fontSize:hp(1.8)}}>
                    {meal?.strInstructions}
                </Text>
            </View>
            {meal.strYoutube && (
                <View style={tw`mx-4 mt-1`}>
                    <View >
                        <Text style={{...tw`font-bold tracking-widest text-base`,fontSize:hp(2.6)}}>Recipe Video</Text>
                    </View>
                    <View style={tw`ml-2 mt-3`}>
                        <YoutubeIframe videoId={extractVideoId(meal.strYoutube)} height={hp(30)}/>
                    </View>
                </View>
                )}
            </View>
        )}
        </ScrollView>
  )
}