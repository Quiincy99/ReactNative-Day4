import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {inject, observer} from 'mobx-react';
import store from './UserStore';

const Login = ({navigation}: any) => {

  const loginHandle = () => {
    const user:any = store.checkExist(store.username, store.password)

    if (user) {
      store.setId(user.id)
      store.setEmail(user.Email)
      navigation.push('Profile')
    }
    else {
      Alert.alert("Username and password are incorrect!! Redirecting to SignUp")
      store.setUserName("")
      store.setPassword("")
      store.setEmail("")
      navigation.navigate("SignUp")
    }
  }


  return (
      <SafeAreaView style={styles.body}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            value={store.username}
            onChangeText={(Text) => {
              store.setUserName(Text)
            }}
            textContentType="username"></TextInput>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={store.password}
            onChangeText={(Text) => {
              store.setPassword(Text)
            }}
            placeholder="Password"
            textContentType="password"></TextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {

             loginHandle();
            }}>
            <Text style={styles.buttontitle}>Sign in</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: 200,
  },

  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },

  buttontitle: {
    color: 'white',
  },
});

export default inject('store')(observer(Login));
