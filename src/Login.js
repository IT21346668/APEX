import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../firebaseConfig'


const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error){
            alert(error.message)
        }
    }

    //forgot Password
    const forgotPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }


    return(
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize : 26}}>
                Login
            </Text>
            <View style={{marginTop : 40}}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                 <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}

                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight: 'bold', fontSize:15}}>Login</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop : 30}}
            >
                <Text style={{fontWeight: 'bold', fontSize:13, color: '#414654'}}>
                    Don't have an account? Register Now
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {forgotPassword()}}
                style={{marginTop : 25}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 13, color: '#414654' }}>
                    Forget Password?
                </Text>
            </TouchableOpacity>
        </View>
    )
}
 
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    TextInput: {
        paddingTop:20,
        paddingBottom:10,
        height: 50,
        width: 300,
        fontSize: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#6c9b31',
        marginBottom: 10,
        textAlign: 'center'
    
    },
    button:{
        marginTop: 40,
        height: 40,
        width: 150,
        borderColor: '#6c9b31',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,

    }

})