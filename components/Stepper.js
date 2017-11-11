import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default function Stepper({value, unit, step, onIncrement, onDecrement}) {
  return <View>
    <TouchableOpacity
      onPress={onDecrement}
    >
      <FontAwesome name={'minus'} size={30} color={'black'}/>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onIncrement}
    >
      <FontAwesome name={'plus'} size={30} color={'black'}/>
    </TouchableOpacity>
    <Text>{value}</Text>
    <Text>{unit}</Text>
  </View>
}