import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AwesomeButton from "react-native-really-awesome-button";

const HomeScreen = ({ navigation }) => {

  const x = "How are you 😄 ❤️ 🐵 :"
  const { colors } = useTheme();

  const [status, setStatus] = useState('Home');

  const theme = useTheme();

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        <Button> <AwesomeButton>Text</AwesomeButton></Button>
        <TouchableOpacity style={styles.btnTab}>
          <Text style={styles.textTab, styles.textActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}>
          <Text style={styles.textTab, styles.textActive}>My State</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}>
          <Text style={styles.textTab, styles.textActive}>Local Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}>
          <Text style={styles.textTab, styles.textActive}>My Leaders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTab}>
          <Text style={styles.textTab, styles.textActive}>Exit Polls</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.xx}>How are you ? </Text>
      <View style={styles.em}>


        <TouchableOpacity>
          <Text style={styles.xx}>😄</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.xx}>😟</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.xx}>😢</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.xx}>😠</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    //justifyContent: 'center'
  },
  listTab: {
    //  flex:1,
    //backgroundColor:'#fff',  
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  textTab: {
    fontSize: 15
  },
  textActive: {
    color: "#EBEBEB",
    backgroundColor: '#ebebeb'
  },
  xx: {
    fontSize: 50
  },
  em: {
    flexDirection: 'row'
  }
});
