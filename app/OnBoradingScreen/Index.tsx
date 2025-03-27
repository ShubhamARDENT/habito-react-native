import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const images = {
  user1: require('../../assets/images/user1.png'),
  user2: require('../../assets/images/user2.png'),
  user3: require('../../assets/images/user3.png'),
}

const OnBoradingScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#6B73FF', '#000DFF']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View style={styles.container}>
            {/* User Images & Chat bubbles */}
            <View style={styles.imageContainer}>
              <Image source={images['user1']} style={styles.userImage} />
              <Image source={images['user2']} style={styles.userImage} />
              <Image source={images['user3']} style={styles.userImage} />
            </View>
            {/* Title */}
            <Text style={styles.title}>Create Good Habits</Text>
            <Text style={styles.subtitle}>
              Change your life by slowly adding new healthy habits and sticking to them.
            </Text>
            {/* Login Buttons */}
            <TouchableOpacity style={styles.emailButton} onPress={() => router.push('/sign-in')} >
              <FontAwesome name="envelope" size={20} color="#000" />
              <Text style={styles.emailText}>
                Continue with E-mail
              </Text>
            </TouchableOpacity>
            {/* Terms & Privacy */}
            <Text style={styles.termsText}>By continuing you agree to Terms of Services & Privacy Policy</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default OnBoradingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 150,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  emailButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    display: "flex",
  },
  termsText: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
});