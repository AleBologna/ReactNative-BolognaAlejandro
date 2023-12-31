import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

/**
 * Search component
 * @param onSearch Callback when search
 * @param error For showing error
 * @param keyword State value when search
 * @param setKeyword Update state value when search
 */

const   Search = ({
    onSearch,
    error,
    keyword,
    setKeyword
}) => {

    const {width} = useWindowDimensions();
  return (
    <>
    <View style ={styles.container}>
    
        <TextInput style ={width > 310? styles.input1 : styles.input2} 
            placeholder='Search...'
            value={keyword}
            onChangeText={setKeyword}
        />
        <Pressable onPress={()=>onSearch(keyword)}>
            <FontAwesome name="search" size={24} color="white" />
        </Pressable>
        <Pressable onPress={()=> setKeyword("")}>
            <FontAwesome5 name="eraser" size={24} color="white" />
        </Pressable>

        </View>
       { error ?
         <Text>
            {error}
        </Text>
        : null}
    </>
  )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:10,
        gap: 10,
    },
    input1: {
        width: 250,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Karla',
        backgroundColor: colors.color4,
        borderRadius: 10,
    },
    input2: {
        width: 170,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Karla',
        backgroundColor: colors.color4,
        borderRadius: 10,
    }
})