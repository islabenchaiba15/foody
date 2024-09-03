import { ActivityIndicator,View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
export default function Loading(props) {
  return (
    <View style={tw`flex justify-center items-center`}>
      <ActivityIndicator {...props}/>
    </View>
  )
}