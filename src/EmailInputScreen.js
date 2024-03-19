import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firebase } from '../firebaseConfig'


const EmailInputScreen = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=> {
        if(snapshot.exists){
          setEmail(snapshot.data().email)
        }
        else{
            console.log('User does not exist')
        }
    })
},[])

  const handleSendEmail = () => {
    // Call the function passed as a prop to send the email
    console.log('Sending email to:', email)
  };

  return (
    <View style={{marginTop: 40}}>
      <View style={{width:300 ,height: 50, borderColor:'#6c9b31', borderWidth: 2, borderRadius: 10, }}>
        <Text style={{fontSize:15, fontWeight:'bold', padding:12 , }}>
              {email}
        </Text>
      </View>

      <View style={{ width:'50%', padding:12, justifyContent:'center', borderRadius: 15, marginLeft: 100}}>
          <Button title="Send Email" onPress={ handleSendEmail }  style={{ fontSize:18 }}  />
      </View>

    </View>
  );
};

export default EmailInputScreen;