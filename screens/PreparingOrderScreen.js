import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  // Navigation to navigate to the next screen
  const navigation = useNavigation();

  // Time out function that waits 4 seconds and then navigates to the next screen
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('DeliveryScreen');
    }, 4000)
  }, []);

  return (
    // Displaying the Preparing Order Screen
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      {/* Displaying the Animated image */}
      <Animatable.Image
        source={require('../assets/preparing-order.gif')}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96 bg-[#00CCBB] rounded-lg"
      />
      {/* Displaying an animated text */}
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      {/* Displaying a progress circle while waiting */}
      <Progress.Circle
        size={60}
        indeterminate={true}
        color="white"
      />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen