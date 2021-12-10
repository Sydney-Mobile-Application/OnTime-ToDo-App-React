import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable, Dimensions, Switch} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SettingMenu ({navigation}) {
  const [switchValue, setswitchValue] = useState(false);
  const toggleSwitch = (value) => {
    setswitchValue(value);
  }

  return (
    <View style={styles.container}>
      <View style={{width: '80%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContent}>Settings</Text>
        </View>
      </View>
      
      <View style={styles.viewTop}>
      {/* <View>
        <Image style={styles.profileContainer} source={require('../../assets/profileContainer.png')} />
      </View> */}
      <View>

        <TouchableOpacity style={styles.bookmarkIcon}>
          <MaterialIcons name='bookmark' size={25} color='#082032'/>
        </TouchableOpacity>
      </View>

      <View style={styles.left}>
        <View style={styles.today}>
          <Text>20 Jun</Text>
        </View>
        <View>
          <Text style={styles.username}>James-Kun</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileSetting}>Profile Setting <MaterialIcons name='arrow-forward-ios' size={10}/></Text>
        </Pressable>
        <Image
        style={styles.profilePicture}
        source={require('../../assets/profile1.jpeg')} />
      </View> 
    </View>

      <View style={styles.taskList}>
        <View style={styles.priorityTask}> 
          <Text style={styles.taskTitle}>Priority Task</Text>
          <Text style={styles.taskDetail}>7</Text> 
          <Text style={styles.textInline}>Manage your task</Text>         
        </View>

        <View style={styles.upcomingTask}>
          <Text style={styles.taskTitle}>Upcoming Task</Text>
          <Text style={styles.taskDetail}>15</Text>
          <Text style={styles.textInline}>Manage your task</Text>
        </View>

        <View style={styles.doneTask}>
          <Text style={styles.taskTitle}>Done Task</Text>
          <Text style={styles.taskDetail}>3</Text>
          <Text style={styles.textInline}>Manage your task</Text>
        </View>
      </View>

      <View style={styles.bottomText}>
        <View style={styles.leftText}>
          <Text style={styles.bottomDetail}>Dark Mode</Text>
          <Text style={styles.bottomDetail}>Language</Text>
          <Text style={styles.bottomDetail}>Backup Data</Text>
          <Text style={styles.bottomDetail}>Help & Support</Text>
          <Text style={styles.bottomDetail}>Permission</Text>
          <Text style={styles.bottomDetail}>About</Text>
        </View>
        
        <View style={styles.rightText}>
          <Switch rol trackColor={{ false: "#767577", true: "#293462" }} style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
          <Pressable onPress={() => navigation.navigate('Language Setting')}>
            <Text style={styles.bottomDetail}>English <MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Backup Data')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Help Support')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Permission')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>  
          <Pressable onPress={() => navigation.navigate('About')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
        </View>
      </View>
    </View> //container
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 100,
    alignItems: 'center',
  },

  headerContainer: {
    alignSelf: 'flex-start',
  },

  headerContent: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 30,
  },

  viewTop: {
    width: '80%',
    height: '18%',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: 42,
    marginTop: 20,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#FBFBFB',
    zIndex: 3,
  },

  // profileContainer: {
  //   width: '100%',
  //   height: '150%',
  //   position: 'absolute',
  //   borderRadius: 50,
  //   zIndex: -1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  bookmarkIcon: {
    paddingTop: 20,
    paddingLeft: 30,
    position: 'relative',
  },

  left: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  today: {
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    fontWeight: '500',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  username: {
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },

  right: {
    // shadowColor: "#000",
    //   shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    //   shadowOpacity: 0.27,
    //   shadowRadius: 4.65,
    //   elevation: 6,
      flex: 1,
      flexDirection: 'column',
      marginHorizontal: 30,
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'relative',
    marginLeft: 40,
    marginTop: 20,
  },

  profileSetting: {
    fontSize: 14,
    fontWeight: '400',
    color:'#293462',
    position: 'absolute',
    marginTop: 80,
    width: '120%',
  },

  taskList: {
    flexDirection:'row', 
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'center',
    marginTop: 15,
    width: '80%',
  },

  taskTitle: {
    fontSize: 14,
    paddingHorizontal: 4,
    width: 75,
  },

  taskDetail: {
    fontSize: 10, 
    color: '#293462',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 75,
    position: 'absolute',
    marginTop: 10,
  },

  textInline: {
    flexDirection: 'row',
    fontSize: 10,
    marginVertical: 6,
    color: '#9799A1',
    paddingHorizontal: 4,
  },

  priorityTask: {
    width: 100,
    height: 80,
    backgroundColor: '#BFE4FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingLeft: 10, 
    alignContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 20
  },

  upcomingTask: {
    width: 100,
    height: 80,
    backgroundColor: '#D3BFFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingLeft: 10, 
    alignContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 20,
  },

  doneTask: {
    width: 100,
    height: 80,
    backgroundColor: '#FFECBF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingLeft: 10, 
    alignContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 20
  },

  bottomText: {
    marginTop: 20,
    color: '#293462',
    fontSize: 14,
    fontWeight: 'bold',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end'
  },

  switch: {
    transform: [{ scaleX: 0.6}, { scaleY: 0.6}],
    width: '60%'
  },

  leftText: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  rightText: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  bottomDetail: {
    fontSize: 20,
    lineHeight: 40,
  }
});