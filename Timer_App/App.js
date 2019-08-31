import React from 'react';
import { StyleSheet,  View, FlatList, Vibration, Alert} from 'react-native';
import { Constants, LinearGradient } from 'expo';
import {Text, Icon, Button} from 'native-base';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondCount: 0,
      minuteCount: 0,
      hourCount: 0,
      objTimer: null,
      reset: false,
      buttonName: "Stop",
      buttonName1: "Break",
      displayTimer: "00:00:00",
      time: [],
      key: '0',
      d1: "00:00:00",
      image: "briefcase",
    }
  }
  checkOne = (seconds) => {
    if (seconds < 10) {
      return "0";
    }
    else {
      return "";
    }
  }
  timerCheck = () => {
    if (this.state.secondCount < 59) {
      this.setState({secondCount: this.state.secondCount + 1})
      this.setState({displayTimer: this.checkOne(this.state.hourCount) + this.state.hourCount + ":" + this.checkOne(this.state.minuteCount) + this.state.minuteCount + ":" + this.checkOne(this.state.secondCount) + this.state.secondCount})
    }
    else if (this.state.minuteCount < 59) {
      this.setState({minuteCount: this.state.minuteCount + 1})
      this.setState({secondCount: this.state.secondCount - 59})
      this.setState({displayTimer: this.checkOne(this.state.hourCount) + this.state.hourCount + ":"+ this.checkOne(this.state.minuteCount) + this.state.minuteCount + ":" + this.checkOne(this.state.secondCount) + this.state.secondCount})
    }
    else if (this.state.hourCount < 59) {
      this.setState({hourCount: this.state.hourCount + 1})
      this.setState({secondCount: this.state.secondCount - 59})
      this.setState({minuteCount: this.state.minuteCount - 59})
      this.setState({displayTimer: this.checkOne(this.state.hourCount) + this.state.hourCount + ":"+ this.checkOne(this.state.minuteCount) + this.state.minuteCount + ":" + this.checkOne(this.state.secondCount) + this.state.secondCount})
    }
    if (this.state.secondCount == 0 && this.state.minuteCount == 20 && this.state.buttonName1 == "Work") {
      Vibration.vibrate([500, 300, 500], true)
      Alert.alert(
        'Get Workin Punk!', [{text: 'OK', onPress: () => Vibration.cancel()}]
      )
    }
    if (this.state.secondCount == 0 && this.state.minuteCount == 30 && this.state.buttonName1 == "Break") {
      Vibration.vibrate([500, 300, 500], true)
      Alert.alert(
        'Alert', 'Take a Break, Would Yah!', [{text: 'OK', onPress: () => Vibration.cancel()}]
      )
    }
   }
  timerStart = () => {
    if (this.state.objTimer == null) {
      var d = new Date()
      var hr = d.getHours()
      var min = d.getMinutes()
      var sec = d.getSeconds()
      if( hr > 12 ) {
          hr -= 12
      }
      this.setState({d1: this.checkOne(hr) + hr + ":" + this.checkOne(min) + min + ":" + this.checkOne(sec)  + sec })
      this.state.objTimer = setInterval(this.timerCheck, 1000)
    }
    if (this.state.buttonName == "Reset") {
      this.setState ({buttonName: "Stop", reset: false})
      this.state.objTimer = setInterval(this.timerCheck, 1000)
    }
  }
  timerStop = () => {
    if (this.state.secondCount != 0 || this.state.minuteCount != 0) {
    if (this.state.objTimer != null) {
      clearInterval(this.state.objTimer)
    }
    if (this.state.reset) {
      this.setState ({secondCount: 0, minuteCount: 0, hourCount: 0, displayTimer: "00:00:00", objTimer: null})
    }

    this.setState ({reset: (this.state.reset) ?  this.state.reset = false : this.state.reset = true})
    if (this.state.reset) {
      this.setState ({buttonName: "Reset"})
    }
    else {
      this.setState ({buttonName: "Stop"})
    }
    }
  }
  workBreakTime = () => {
    if (this.state.buttonName1 == "Break") {
      return "Working..."
    }
    else {
      return "Taking a Break..."
    }
  }
  breakTime = () => {
    if (this.state.secondCount == 0 && this.state.minuteCount == 0 && this.state.hourCount == 0){

    }
    else {
      var d = new Date()
      var hr = d.getHours()
      var min = d.getMinutes()
      var sec = d.getSeconds()
      if( hr > 12 ) {
          hr -= 12
      }
      this.setState ({key: String(Number.parseInt(this.state.key, 10) + 1)})
      if (this.state.buttonName1 == "Work") {
        //this.setState ({buttonName1: "Break"})
        this.setState({image: "game-controller",buttonName1: "Break",time: [...this.state.time,{key: this.state.key,test: this.state.displayTimer, image: "game-controller", name: "Break", timeS: this.state.d1, timeStop: this.checkOne(hr) + hr + ":" + this.checkOne(min) + min + ":" + this.checkOne(sec)  + sec }]})
      }
      else {
        //this.setState ({buttonName1: "Work"})
        this.setState({image: "briefcase",buttonName1: "Work",time: [...this.state.time,{key: this.state.key,test: this.state.displayTimer, image: "briefcase", name: "Work", timeS: this.state.d1, timeStop: this.checkOne(hr) + hr + ":" + this.checkOne(min) + min + ":" + this.checkOne(sec)  + sec }]})
      }
      this.setState ({secondCount: 0, minuteCount: 0, hourCount: 0, displayTimer: "00:00:00", objTimer: null, timerStop: "00:00:00", d1: "00:00:00", buttonName: "Stop", reset: false})
      clearInterval(this.state.objTimer)
    }
  }
  render() {
    return (
      <View style={styles.container}>
      <Text> ──────────────────────</Text>
        <Text>{this.workBreakTime()}</Text>
        <Text style={styles.titleText}><Icon type="Entypo" name="stopwatch" style={{fontSize: 50, color: 'black'}}/>{this.state.displayTimer}</Text>
        <Text> ──────────────────────</Text>
        <View style={styles.flexText2}>
          <View style={styles.flexText21}>
            <Button info onPress = {this.breakTime}>
            <Text style={styles.flexTextTest}>{this.state.buttonName1}</Text>
            </Button>
          </View>
          <View style={styles.flexText22}>
            <Button danger onPress = {this.timerStop}>
            <Text style={styles.flexTextTest}>{this.state.buttonName}</Text>
            </Button>
          </View>
          <View style={styles.flexText23}>
            <Button success onPress = {this.timerStart}>
            <Text style={styles.flexTextTest}>Start</Text>
            </Button>
          </View>
        </View>
        <View style={styles.flexText3}>
          <FlatList
          data={this.state.time}
          renderItem={({item}) => <View><Icon type="Entypo" name={item.image} style={{fontSize: 50, color: 'white', zIndex: 1,position: 'absolute',padding: 8}}/><Text style={styles.nameText}>──────  {item.name}  ─────</Text><Text style={styles.flatlist}>Start: {item.timeS} Finish: {item.timeStop}</Text><Text style={styles.flatlist}>{item.test}</Text></View>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#4286f4',
    flex: 1,
    paddingTop: Constants.statusBarHeight+50,
    alignItems: 'center',
  },
  flatlist: {
    marginLeft: 75,
       zIndex: 5,
  },
  nameText: {
    color: 'white',
    marginLeft: 75,
    zIndex: 5,
  },
 titleText: {
   fontWeight: 'bold',
   fontSize: 50,
 },
 flexTextTest: {
   color: 'white',
 },
 flexText3: {
   flex: 4,
   width: '100%',
 },
  flexText2: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  flexText21: {
    flex: 1,
    padding: 20,
  },
  flexText22: {
    flex: 1,
    padding: 20,
  },
  flexText23: {
    flex: 1,
    padding: 20,


  },
});
