import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image, SafeAreaView } from 'react-native';
import * as Google from "expo-google-app-auth";
import firebase from 'firebase';
import { SocialIcon } from 'react-native-elements'
import { GoogleSigninButton } from 'react-native-google-signin';

class LoginScreen extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }


  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function (result) {
          console.log("****************************user signed in")

          if (result.additionalUserInfo.isNewUser) {
            firebase.database()
              .ref('/users/' + result.user.uid)
              .set({
                email: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                created_at: Date.now()
              })
              .then(function (snapshot) {

              });
          } else {
            firebase.database()
              .ref('/users/' + result.user.uid).update({
                last_logged_in: Date.now()
              })
          }
        })

          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }).bind(this);
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '199334884433-e3grgksnkvdjfkpapjlj5a5au4jnr1rc.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }} >
        <SafeAreaView style={styles.container}>

          <Image source={require('../assets/unity.png')} style={{ width: '50%', height: '40%' }}></Image>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <SocialIcon style={GoogleSigninButton}
              type='google'
              onPress={this.signInWithGoogleAsync}
            />
            <SocialIcon type='twitter'
              onPress={this.signInWithGoogleAsync}
            />
            <SocialIcon
              type='google'
              onPress={this.signInWithGoogleAsync}
            />
          </View>
        </SafeAreaView>

      </ImageBackground >
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#7578d4',
    alignItems: 'center',
    justifyContent: 'center'
  }
});