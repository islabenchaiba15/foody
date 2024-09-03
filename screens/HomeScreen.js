import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context' 
import tw from 'twrnc'
import { BellIcon ,MagnifyingGlassCircleIcon} from "react-native-heroicons/outline";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Categories from '../components/Categories'
import axios from 'axios'
import Recipes from '../components/Recipes'
import { auth_firebase } from '../FirebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import ContextMenu from '../components/ContextMenu'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
function HomeScreen() {
    const [activeCategory,setActiveCategory]=useState('Beef')
    const [categories,setCategories]=useState([]);
    const [meals,setMeals]=useState([]);
    const [user, setUser] = useState(null);
    const navigation=useNavigation()
    const auth = auth_firebase;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            console.log(user)
        } else {
            setUser(null);
        }
        });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, [auth]);
    useEffect(() =>{
    getCategories();
    getRecipes();
    },[])
    const getCategories = async()=>{
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        if(response && response.data){
        setCategories(response.data.categories)
        }
    } catch (error) {
        console.log('error is gggggggg',error.message)
    }
    }
    const getRecipes =async(category="Beef")=>{
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        try {
            if(response && response.data){
                setMeals(response.data.meals)
            }
        } catch (error) {
            console.log("there isssss eroooor " ,error.message)
        }
    }
    const handleChangeCategory=(category)=>{
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    }
    const SignOut = async () => {
        signOut(auth).then(() => {
            navigation.navigate("Register")
          }).catch((error) => {
            console.log(error)
          });
      };
  return (
    <View style={tw`flex-1 bg-white`}>
        <ExpoStatusBar style='dark'/>
         <SafeAreaView>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:50}}
            style={tw`mt-5 `}
            >
                <View style={{...tw`flex flex-1 flex-row justify-between items-center mx-4 `}}>
                    <Image source={require('../assets/images/avatar.png')} style={{height:hp(6),width:hp(6) }}/>
                    <Pressable onPress={()=>SignOut()}>
                        <BellIcon size={hp(6)} color="gray"/>
                    </Pressable>
                </View>

                <View style={{...tw`mt-5 mb-3 mx-4 gap-3`}}>
                    <Text style={{...tw`text-neutral-800 `,fontSize:hp(2)}}>{user?.email}</Text>
                    <Text style={{...tw`font-semibold text-neutral-800`,fontSize:hp(3.8)}}>Make your food</Text>
                    <Text style={{...tw`font-semibold text-neutral-800`,fontSize:hp(3.8)}}>Stay at 
                        <Text style={{...tw`text-amber-500 font-bold`}}> Home</Text>
                    </Text>
                </View>

                <View style={{...tw`mt-5 mb-3 mx-4 flex flex-1 flex-row rounded-full bg-black/5 p-2`}}>
                    <TextInput placeholder='search a recipe '
                    style={{...tw`tracking-wider flex-1 text-base pl-3`,fontSize:hp(2)}}
                    
                    />
                    <View style={{...tw`rounded-full bg-white `}}>
                        <MagnifyingGlassCircleIcon size={hp(5)} color="gray" />
                    </View>
                </View>

                <View style={{...tw`mx-4 mt-3 `}}>
                    {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
                </View>

                <View>
                    <Recipes meals={meals} categories={categories}/>
                </View>
            </ScrollView>
         </SafeAreaView>
    </View>
  )
}

export default HomeScreen