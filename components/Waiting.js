import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Waiting() {
  return (
    <View style={tw`flex justify-center items-center`}>
      <ActivityIndicator {...props}/>
    </View>
  )
}