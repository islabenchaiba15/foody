import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import MasonryList from '@react-native-seoul/masonry-list';
import tw from 'twrnc'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { mealData } from '../constants';
import Animated,{ FadeInDown, FadeOut } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
export default function Recipes({meals,categories}) {
const navigation= useNavigation()
  return (
    <View style={{...tw`mx-5 my-3 `}}>
      <Text style={{...tw`text-neutral-800 font-semibold`,fontSize:hp(3)}}>Recipes</Text>
      <View>
        {meals.length == 0 || categories.length==0 ? (
            <Loading size="large " style={tw`mt-10`}/>
        ) : (
            <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item,i}) => <CardItem item={item} index={i} navigation={navigation}/>}
                //refreshing={isLoadingNext}
                //onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
            />
        )}
      </View>
    </View>
  )
}

const CardItem =({item,index,navigation})=>{
    let isEven = index%2
    return(
        <Animated.View entering={FadeInDown.duration(index*100).springify().damping(12)}>
            <Pressable
            style={tw`flex justify-center items-start mb-2 p-1`}
            onPress={() => navigation.navigate('RecipeDetailScreen',{...item})}
            >
                <Animated.Image source={{uri:item.strMealThumb}} sharedTransitionTag={item.strMeal}
                style={{width:'100%',height: index%3==0 ? hp(35) : hp(30),borderRadius:35,...tw``}}

                />
                <Text style={{...tw`font-semibold text-neutral-600 mt-1 `,fontSize:hp(1.8)}}>{item.strMeal.length <20 ? item.strMeal : item.strMeal.slice(0,20)+ '..'}</Text>
            </Pressable>
        </Animated.View>
    )
}