import { TouchableOpacity,View, Text, Image, TextInput,Pressable } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native'
import { auth_firebase } from '../FirebaseConfig'
import CustomComponentView from '../components/CustomComponentView'

const Register = () => {
    const auth=auth_firebase
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const naviation=useNavigation()

    const SignInn =async () =>{
       if (!email || !password) {
            Alert.alert('Sign In','please fill all the fields ')
            return;
       } else {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            naviation.navigate("Home")
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage, errorCode)
        });
       }
    }
  return (
    <View style={tw`bg-white flex-1 `}>
        <ExpoStatusBar style='dark'/>
        <View style={{...tw`flex flex-col gap-5 items-center `,paddingHorizontal:wp(5),paddingTop:hp(10) }}>
            <View>
                <Image source={require('../assets/images/welcome.png')} style={{width:hp(20),height:hp(20)}}/>
            </View>
            <View style={tw`flex-col gap-4 items-center`}>
                <Text style={{...tw`font-extrabold pb-4`,fontSize:hp(4)}}>Sign In</Text>
                <View style={{...tw`bg-gray-200 p-4 flex-row-reverse items-center justify-start gap-2 rounded-xl  `}}>
                    <TextInput placeholder="email adress "
                     style={{...tw`flex-1 font-bold text-black text-base tracking-widest`,fontSize:hp(2)}}
                     placeholderTextColor={"gray"}
                     value={email}
                     onChangeText={text=>setEmail(text)}
                     />
                    <EnvelopeIcon color={"gray"} size={hp(3.2)}/>
                </View>
                <View style={{...tw`bg-gray-200 p-4 flex-row-reverse items-center justify-start gap-2 rounded-xl  `}}>
                    <TextInput placeholder="password "
                     style={{...tw`flex-1 font-bold text-black text-base tracking-widest`,fontSize:hp(2)}}
                     placeholderTextColor={"gray"}
                     value={password}
                     secureTextEntry={true}
                     onChangeText={text=>setPassword(text)}
                     />
                    <LockClosedIcon color={"gray"} size={hp(3.2)}/>
                </View>
            </View>
            <View style={{...tw`flex-row w-full justify-end -mt-3 items-center`}}>
                    <Pressable >
                        <Text style={{...tw`text-black font-bold text-base tracking-widest`,fontSize:hp(1.9)}}> forgot password ...??</Text>
                    </Pressable>     
            </View>
            <TouchableOpacity onPress={()=>SignInn()}style={{...tw`bg-amber-400 -mt-3 w-full flex-row items-center justify-center p-4 rounded-xl`}}>
                <Text style={{...tw`font-bold text-white`,fontSize:hp(2.6)}}>
                    Sign In
                </Text>
            </TouchableOpacity>
            <View style={{...tw`flex-row justify-center items-center -mt-3 `}}>
                    <Text style={{...tw`font-regular `,fontSize:hp(1.9)}}>dont have an account ??</Text>
                    <Pressable onPress={()=>naviation.navigate("SignIn")}>
                        <Text style={{...tw`text-amber-500 tracking-widest text-base`,fontSize:hp(1.9)}}>Sign Up ... </Text>
                    </Pressable>
            </View>
        </View>
    </View>
  )
}

export default Register