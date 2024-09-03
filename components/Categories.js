import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { categoryData } from '../constants'
import Animated,{ FadeInDown, FadeOut } from 'react-native-reanimated';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
const Categories = ({categories,activeCategory,handleChangeCategory}) => {
  return (
    <Animated.View entering={FadeInDown.duration(100).springify()}>
      <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{...tw``}}
      >
        {categories.map((cat)=>{
            let isActive=cat.strCategory==activeCategory
            let activeButtonClass = isActive ? tw`bg-amber-400` : tw`bg-black/10`;
            return(
            <TouchableOpacity key={cat.strCategory} style={{...tw`flex flex-col items-center px-1`,}}
            onPress={()=>handleChangeCategory(cat.strCategory)}
            >
                <View style={{...tw` rounded-full p-[6px] `,...activeButtonClass}}>
                    <Image source={{uri: cat.strCategoryThumb}}
                    style={{...tw`rounded-full `,width:hp(8),height:hp(8)}}
                    
                    />
                </View>
                <Text style={{...tw`text-neutral-600 font-semibold text-black`,fontSize:hp(1.8)}}>{cat.strCategory}</Text>
            </TouchableOpacity>
            )
        })}
      </ScrollView>
    </Animated.View>
  )
}

export default Categories