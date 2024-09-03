import { View, Text, SafeAreaView, Image, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TextInput,TouchableOpacity } from 'react-native'
import { EnvelopeIcon, ExclamationCircleIcon, LockClosedIcon, UserIcon } from 'react-native-heroicons/outline'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth_firebase, db } from '../FirebaseConfig'
import { collection, addDoc } from "firebase/firestore"; 
import CustomComponentView from '../components/CustomComponentView'

const SignIn = () => {
    const naviation =useNavigation()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const auth=auth_firebase
    const SignInUser=async()=>{
        if (!email || !password) {
            Alert.alert('Sign Up','please fill all the fields ')
        } else {
             try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                Alert.alert("you created new user")
                try {
                    const docRef=await addDoc(collection(db,'users'),{
                        name:name,
                        email:user?.email,
                        password:password
                    })
                    console.log("Document written with ID: ", docRef.id);

                } catch (error) {
                    console.error("Error adding document: ", error);
                }
             } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
             }
        
        // });
        }
        }
  return (
 <CustomComponentView>
        <ExpoStatusBar style='dark'/>
        <View style={{...tw`flex flex-col gap-5 items-center `,paddingHorizontal:wp(5),paddingTop:hp(10) }}>
            <View>
                <Image source={require('../assets/images/welcome.png')} style={{width:hp(20),height:hp(20)}}/>
            </View>
            <View style={tw`flex-col gap-4 items-center`}>
                <Text style={{...tw`font-extrabold pb-4`,fontSize:hp(4)}}>Sign Up</Text>
                <View style={{...tw`bg-gray-200 p-4 flex-row-reverse items-center justify-start gap-2 rounded-xl  `}}>
                    <TextInput placeholder="full name "
                     value={name}
                     style={{...tw`flex-1 font-bold text-black text-base tracking-widest`,fontSize:hp(2)}}
                     placeholderTextColor={"gray"}
                     onChangeText={text=>setName(text)}
                     />
                    <UserIcon color={"gray"} size={hp(3.2)}/>
                </View>
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
                     onChangeText={text=>setPassword(text)}
                     secureTextEntry={true}
                     />
                    <LockClosedIcon color={"gray"} size={hp(3.2)}/>
                </View>
            </View>
            <TouchableOpacity onPress={()=>SignInUser()} style={{...tw`bg-amber-400 w-full flex-row items-center justify-center p-4 rounded-xl`}}>
                <Text style={{...tw`font-bold text-white`,fontSize:hp(2.6)}}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <View style={{...tw`flex-row justify-center items-center `}}>
                    <Text style={{...tw` `,fontSize:hp(1.9)}}>Already have an account ??</Text>
                    <Pressable onPress={()=>naviation.navigate("Register")}>
                        <Text style={{...tw`text-amber-500 tracking-widest text-base`,fontSize:hp(1.9)}}>Sign in ... </Text>
                    </Pressable>
            </View>
        </View>
</CustomComponentView>
  )
}

export default SignIn