import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import { Platform } from 'react-native'
import tw from 'twrnc'
export default function CustomComponentView({children}) {
    ios=Platform.OS=='ios'
    return (
      <KeyboardAvoidingView 
      behavior={ios ? 'padding' : 'height'}
      style={tw`flex-1`}
      >
          <ScrollView
          style={tw`flex-1`}
          bounces={false}
          showsVerticalScrollIndicator={false}
          >
              {children}
          </ScrollView>
      </KeyboardAvoidingView>
    )
}