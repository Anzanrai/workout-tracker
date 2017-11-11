import React from 'react';
import {View, Text, Slider} from 'react-native';

export default function WorkOutSlider({max, unit, value, onChange, step}) {
  return <View>
    <Slider
      maximumValue={max}
      value={value}
      onValueChange={onChange}
      minimunValue={0}
      step={step}
    />
    <Text>{value}</Text>
    <Text>{unit}</Text>
  </View>
}