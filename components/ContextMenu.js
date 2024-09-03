import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
 Menu,
 MenuProvider,
 MenuOptions,
 MenuOption,
 MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ContextMenu = () => {
 return (
    <MenuProvider style={styles.container}>
     <Menu>
       <MenuTrigger
         customStyles={{
           triggerWrapper: {
             
           },
         }}
       >
         <Image source={require('../assets/images/avatar.png')} style={{height:heightPercentageToDP(6),width:heightPercentageToDP(6) }}/>
       </MenuTrigger>
       <MenuOptions>
         <MenuOption onSelect={() => alert(`Save`)} text="Save" />
         <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
       </MenuOptions>
     </Menu>
   </MenuProvider>
 );
};

export default ContextMenu;

const styles = StyleSheet.create({
 container: {
   flex:1,
   backgroundColor: "#fff",
   justifyContent: "",
   alignItems: "",
   flexDirection: "row",
 },
});