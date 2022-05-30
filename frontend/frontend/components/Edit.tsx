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

import {action, makeObservable, observable} from 'mobx';
import {inject, observer, Provider} from 'mobx-react';
import store from './UserStore';
import {NavigationContainer} from '@react-navigation/native';

const Edit = ({navigation}: any) => {

  const [UserName, setUserName] = useState(store.username)
  const [Email, setEmail] = useState(store.email)

  const handleEdit = () => {
    store.editUser(UserName, Email)
    store.setUserName(UserName)
    store.setEmail(Email)
    Alert.alert("Edit successfully ")
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={UserName}
          onChangeText={(Text) => {
            setUserName(Text);
          }}
          textContentType="username"></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={(Text) => {
            setEmail(Text);
          }}
          textContentType="emailAddress"></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={handleEdit}>
          <Text style={styles.buttontitle}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack()
          }}>
          <Text style={styles.buttontitle}>Go back</Text>
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

export default (inject('store'))(observer(Edit));
