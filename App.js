import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

function HomeScreen({ navigation }) {
 const [colorArray, setColorArray] = useState([]);

 useEffect(() => {
  navigation.setOptions({
    headerRight: () => <Button onPress={addColor} title="Add Color"/>,
  });
});

 function renderItem({ item }) {
   return (
     <TouchableOpacity
       onPress={() => navigation.navigate("DetailsScreen", { ...item })}
     >
       <BlockRGB red={item.red} green={item.green} blue={item.blue} />
     </TouchableOpacity>
   );
 }

 function addColor() {
   setColorArray([
     ...colorArray,
     {
       red: Math.floor(Math.random() * 256),
       green: Math.floor(Math.random() * 256),
       blue: Math.floor(Math.random() * 256),
       id: `${colorArray.length}`,
     },
   ]);
 }

 function removeAll(){
   setColorArray([])
 }

 return (
   <View style={styles.container}>
     <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={removeAll}
     >
       <Text style={{ color: "blue" }}>Reset</Text>
     </TouchableOpacity>
     <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
   </View>
 );
}

function DetailsScreen({ route }) {
 const { red, green, blue } = route.params;
 const createTwoButtonAlert = () =>
    Alert.alert(
      "RGB Colors",
      "RGB (Red, Green and Blue) is the color space for digital images. Use the RGB color mode if your design is supposed to be displayed on any kind of screen. A light source within a device creates any color you need by mixing red, green and blue and varying their intensity.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

 return (
   <View
     style={[
       styles.container,
       { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
     ]}
   >
     <View style={{ padding: 30 }}>
       <Text style={styles.detailText}>Red: {red}</Text>
       <Text style={styles.detailText}>Green: {green}</Text>
       <Text style={styles.detailText}>Blue: {blue}</Text>
       <Text style={styles.detailText}>Total RGB: {blue + green + red}</Text>
       <Button title={"What does this mean?"} onPress={createTwoButtonAlert} />
     </View>
   </View>
 );
}

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
  
 },
 list: {
   width: "100%",
   height: "100%"
 },
 detailText: {
   fontSize: 30,
   marginBottom: 20,
   textDecorationColor: "yellow",

 },
});
