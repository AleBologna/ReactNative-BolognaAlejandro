import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { AntDesign } from '@expo/vector-icons';

const Header = ({navigation, route}) => {
  let title;
  if (route.name === 'Home') title ='Inicio'
  else if (route.name === 'ItemListCategory') title =route.params.category
  else if (route.name === 'ItemDetail') title =route.params.title
  else if (route.name === 'CartScreen') title = "Cart"
  else if (route.name === 'OrderScreen') title = "Orders"
  else title = route.name
  return (
    <View 
        style={styles.containerHeader}>
      <Text style ={styles.text}>{title}</Text>
     {
     route.name !== "Home" && route.name !== "CartScreen" && route.name !== "OrderScreen" ?
     <Pressable style={styles.btnBack} onPress={navigation.goBack}>
            <AntDesign name="back" size={24} color="black" />
      </Pressable>
    :
    null  
    }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
      paddingVertical:15,
        backgroundColor: colors.color1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1,
        position:'relative'
    },
    text: {
        fontSize: 25,
        fontFamily: 'Karla'
    },
    btnBack:{
      position:'absolute',
      right:20,
      top:'55%',

    }
})