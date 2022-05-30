import React, { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  SafeAreaViewComponent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {action, makeObservable, observable} from 'mobx';
import {inject, observer, Provider} from 'mobx-react';
import store from './UserStore';
import {NavigationContainer} from '@react-navigation/native';

const SignUp = ({navigation}: any) => {

  const [conpass, setConpass] = useState("");

  const handleSignUp = () => {
    let user = store.checkIdenName(store.username)
    if (user) {
      Alert.alert("Username already exist!")
    }
    else if (store.password != conpass) {
      Alert.alert("Confirm password isn't correct")
    }
    else {
      Alert.alert("Create successfully!")
      store.addUser(store.username, store.password, store.email)
      navigation.push("Profile")
    }
  }

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={store.username}
          onChangeText={(Text) => {
            store.setUserName(Text);
          }}
          textContentType="username"></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={store.email}
          onChangeText={(Text) => {
            store.setEmail(Text);
          }}
          textContentType="username"></TextInput>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={store.password}
          onChangeText={(Text) => {
            store.setPassword(Text);
          }}
          placeholder="Password"
          textContentType="password"></TextInput>

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={conpass}
          onChangeText={(Text) => {
            setConpass(Text);
          }}
          placeholder="Confirm password"
          textContentType="password"></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}>
          <Text style={styles.buttontitle}>Sign up</Text>
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

export default inject('store')(observer(SignUp));
