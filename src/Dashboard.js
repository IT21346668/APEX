import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../firebaseConfig'
import EmailInputScreen from './EmailInputScreen';

const Dashboard = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('')  

    //change the password
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("Password rest email sent")
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot)=> {
            if(snapshot.exists){
                setName(snapshot.data().firstName)
            }
            else{
                console.log('User does not exist')
            }
        })
    },[])
    
   return(
       <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
            <TouchableOpacity onPress={() => {changePassword()}} style={styles.button} >
                <Text style={{ fontSize:15, fontWeight:'bold', color:'#414654' }}>
                    Change Your Password
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {firebase.auth().signOut()}} style={styles.button} >
                <Text style={{ fontSize:15, fontWeight:'bold', color:'#414654' }}>
                    Sign Out
                </Text>
            </TouchableOpacity>

            </View>
            

            <Text style={{fontSize:35, fontWeight:'bold', marginTop: 1}}>
                Hello, {name}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Temperature') } style={styles.buttonImage}>
                <Image source={require('../assets/hot.gif')} style={styles.Image} />
                <Text>Temperature</Text>
            </TouchableOpacity>

            <EmailInputScreen />
        
       </SafeAreaView>
   )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    
    button:{
        borderRadius: 20,
        marginLeft: 50,
        marginRight: 60,
        marginBottom: 50,

    },

    buttonImage: {
        width: 350,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        marginTop: 35,
        blurRadius: 70, 
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 100},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    Image:{
        width: 80, 
        height: 90, 
        resizeMode: 'contain', 
        borderRadius: 20, 
        alignItems:'center',
        shadowColor: '#000',
        shadowOffset: { width: 100, height: 100},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    }

})