import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from '../Components/InputForm'
import SubmitButton from '../Components/SubmitButton'
import { colors } from '../Global/Colors'
import { useSignInMutation } from '../Services/authServices'
import { isAtLeastSixCharacters, isValidEmail } from '../Validations/auth'
import { useDispatch } from 'react-redux'
import { setUser } from "../Features/User/userSlice";
import { setUserCart } from '../Features/Cart/cartSlice'
import { insertSession } from "../SQLite";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("")

    const dispatch = useDispatch()

    const [triggerSignIn, resultSignIn] = useSignInMutation("")

    const onSubmit = () => {

        const isValidVariableEmail = isValidEmail(email)
        const isCorrectPassword = isAtLeastSixCharacters(password)

        if(isValidVariableEmail && isCorrectPassword){
            triggerSignIn({
                email,
                password,
                returnSecureToken:true
            })
        }

        if(!isValidVariableEmail) setErrorMail('Email is not correct')
        else setErrorMail('')
        if(!isCorrectPassword) setErrorPassword ('Password is not correct')
        else setErrorPassword('')

    }
  
    useEffect(()=> {
        (async ()=> {
            try {
                if(resultSignIn.isSuccess) {
                    
                    const response = await insertSession({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                    })
                    
                    dispatch(setUserCart(resultSignIn.data.email)) 

                    dispatch(setUser({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        profileImage: "",
                        location: {
                            latitude: "",
                            longitude: "",
                        }
                    }))
                }
            } catch (error) {
            }
        })()
    }, [resultSignIn])

    return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.title}>Login to start</Text>
            <InputForm 
                label={"email"}
                onChange={setEmail}
                error={errorMail}
            />
            <InputForm 
                label={"password"}
                onChange={setPassword}
                error={errorPassword}
                isSecure={true}
            />
            <SubmitButton 
                onPress={onSubmit}
                title = "Send"
            />
            <Text style={styles.sub}>Not have an account?</Text>
            <Pressable onPress={()=> navigation.navigate('Signup')}>
                <Text style={styles.subLink}>Sign up</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.color5,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Karla'
    },
    sub: {
        fontSize: 14,
        color: 'black',
    },
    subLink: {
        fontSize: 14,
        color: 'blue',
    }
})