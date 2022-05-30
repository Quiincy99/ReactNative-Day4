import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {inject, observer} from 'mobx-react';
import store from './UserStore';

const Profile = ({navigation}: any) => {

  const handleEdit = () => {
    navigation.navigate("Edit")
  }

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.titleposition}>
          <Text style={styles.title}>Profile</Text>
        </View>
          <Text>Id: {store.id}</Text>
          <Text>Username : {store.username}</Text>
          <Text>Email : {store.email}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleEdit()
          }}>
          <Text style={styles.buttontitle}>Edit</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleposition: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: 200,
  },

  button: {
    marginTop: 20,
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

export default inject('store')(observer(Profile));
