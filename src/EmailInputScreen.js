import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';


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
    <View>

      <Text style={{fontSize:20, fontWeight:'bold', borderRadius: 20, borderColor: "blue", height: 10, width: 50}}>
            Hello, {email}
      </Text>

      <View style={{ width:'50%', padding:12, justifyContent:'center', borderRadius: 15, marginLeft: 100}}>
          <Button title="Send Email" onPress={ handleSendEmail }  style={{ fontSize:18 }}  />
      </View>

    </View>
  );
};

export default EmailInputScreen;