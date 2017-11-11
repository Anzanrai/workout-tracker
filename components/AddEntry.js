import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {getDailyReminderValue, getMetricMetaInfo, timeToString} from "../utils/helpers";
import Stepper from "./Stepper";
import WorkOutSlider from "./Slider";
import DateHeader from "./DateHeader";
import moment from "moment";
import {Ionicons} from '@expo/vector-icons';
import TextButton from "./TextButton";
import {removeEntry, submitEntry} from "../utils/api";
import {addEntry} from "../actions/index";
import {connect} from "react-redux";

function SubmitBtn ({onPress}) {
  return <TouchableOpacity
    onPress={onPress}
  >
    <Text>
      Submit
    </Text>
  </TouchableOpacity>
}

class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const {max, step} = getMetricMetaInfo(metric);
    this.setState((state)=>{
      const value = state[metric] + step;
      return {
        ...state,
        [metric]: max < value? max : value
      }
    })
  }

  decrement = (metric) => {
    const {step} = getMetricMetaInfo(metric);
    this.setState((state)=>{
      const value = state[metric] - step;
      return {
        ...state,
        [metric]: value < 0? 0 : value
      }
    })
  }

  slide=(metric, value) => {
    this.setState({
      [metric]: value
    })
  }

  onSubmit = () => {
    const key = timeToString();
    const entry = this.state;
    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })
    submitEntry({entry, key});
  }

  reset = () => {
    const key = timeToString();
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    removeEntry(key);
  }

  render(){
    const metaInfo = getMetricMetaInfo();
    if(this.props.alreadyLogged){
      return <View>
        <Ionicons name='ios-happy-outline' size={100}/>
        <Text>You have already logged your information for today.</Text>
        <TextButton onPress={this.reset}>
          Reset
        </TextButton>
      </View>
    }
    return <View>
      <DateHeader date={moment().format("YYYY-MM-DD")}/>
      {
        Object.keys(metaInfo).map((key)=> {
          const {getIcon, type, ...rest} = metaInfo[key];
          const value = this.state[key];
          return (<View key={key}>
            {getIcon()}
            {type === 'slider'?
              <WorkOutSlider
                value={value}
                onChange={(value)=> this.slide(key, value)}
                {...rest}
              /> :
              <Stepper
                value={value}
                onIncrement={()=>this.increment(key)}
                onDecrement={()=>this.decrement(key)}
                {...rest}
              />}
          </View>)
        })
      }
      <SubmitBtn onPress={this.onSubmit}/>
    </View>
  }
}

function mapStateToProps(state){
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined' ? true: false
  }
}

export default connect(mapStateToProps, {addEntry})(AddEntry);