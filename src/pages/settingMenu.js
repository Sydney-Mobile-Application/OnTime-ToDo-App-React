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
     <View style={styles.headerContent}>
      <Text style={styles.settingMenu}>Settings</Text>
    </View>
      
      <View style={styles.viewTop}>
      <Image
      style={styles.profileContainer}
      source={require('../../assets/profileContainer.png')} />

      <TouchableOpacity style={styles.bookmarkIcon}>
        <MaterialIcons name='bookmark' size={20} color='#082032'/>
      </TouchableOpacity>

      <View style={styles.information}>
        <View style={styles.today}>
          <Text>20 Jun</Text>
        </View>
        <View>
          <Text style={styles.username}>James-Kun</Text>
        </View>
      </View>

      <View style={styles.profileAvatar}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileSetting}>Profile Setting <MaterialIcons name='arrow-forward-ios' size={10}/></Text>
        </Pressable>
        <Image
        style={styles.avatar}
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
        <View style={styles.darkMode}>
          <Text style={styles.bottomDetail}>Dark Mode</Text>
            <Switch rol
            trackColor={{ false: "#767577", true: "#293462" }} 
            style={styles.switch} onValueChange={toggleSwitch} value = {switchValue} />
        </View>
        
        <View style={styles.language}>
            <Text style={styles.bottomDetail}>Language</Text>
          <Pressable onPress={() => navigation.navigate('LanguageSetting')}>
            <Text style={styles.bottomDetail}>English <MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
        </View>

        <View style={styles.backupData}>
          <Text style={styles.bottomDetail}>Backup Data</Text>
          <Pressable onPress={() => navigation.navigate('BackupData')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
        </View>

        <View style={styles.helpSupport}>
          <Text style={styles.bottomDetail}>Help & Support</Text>
          <Pressable onPress={() => navigation.navigate('HelpSupport')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>
        </View>

        <View style={styles.permission}>
          <Text style={styles.bottomDetail}>Permission</Text>
          <Pressable onPress={() => navigation.navigate('Permission')}>
            <Text style={styles.bottomDetail}><MaterialIcons name='arrow-forward-ios' size={12}/></Text>
          </Pressable>  
        </View>

        <View style={styles.about}>
          <Text style={styles.bottomDetail}>About</Text>
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
    alignItems: 'center',
    // justifyContent: 'center'
  },

  headerContent: {
    width: '80%',
  },

  settingMenu: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start',
    marginTop: 120,
  },

  viewTop: {
    width: '80%',
    height: '15%',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 42,
    marginTop: 20,
    flexDirection: 'row',
    position: 'relative',
  },

  profileContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 50,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bookmarkIcon: {
    marginLeft: windowWidth*0.04,
    marginTop: windowHeight*0.025,
  },

  information: {
    marginTop: windowHeight*0.025,
    marginLeft: windowWidth*0.02,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  today: {
    backgroundColor: '#FFFFFF',
    width: '60%',
    height: '25%',
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
    marginTop: '5%',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 22,
  },

  profileAvatar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      flex: 1,
      flexDirection: 'column',
      // paddingLeft: 20,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    position: 'relative',
    marginLeft: windowWidth*0.22,
    marginTop: windowHeight*0.03,
  },

  profileSetting: {
    fontSize: 14,
    fontWeight: '400',
    color:'#293462',
    position: 'absolute',
    marginTop: windowHeight*0.1,
    marginLeft: windowWidth*0.1,
  },

  taskList: {
    flexDirection:'row', 
    paddingHorizontal: 10,
  },

  taskTitle: {
    fontSize: 12,
    paddingHorizontal: 4,
    width: 58,
  },

  taskDetail: {
    fontSize: 8, 
    color: '#293462',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '85%',
    position: 'absolute',
    marginTop: '20%',
  },

  textInline: {
    flexDirection: 'row',
    fontSize: 8,
    marginVertical: windowHeight*0.01,
    color: '#9799A1',
    paddingHorizontal: 4,
  },

  priorityTask: {
    width: 90,
    height: 75,
    backgroundColor: '#BFE4FF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingLeft: 10, 
    alignContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 20
  },

  upcomingTask: {
    width: 90,
    height: 75,
    backgroundColor: '#D3BFFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingLeft: 10, 
    alignContent: 'flex-start',
    marginHorizontal: 8,
    marginVertical: 20,
  },

  doneTask: {
    width: 90,
    height: 75,
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
  },

  switch: {
    transform: [{ scaleX: 0.6}, { scaleY: 0.6}],
    flex: 0.18,
  },

  darkMode: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  language: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backupData: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  helpSupport: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  permission: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  about: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  bottomDetail: {
    fontSize: 20,
    lineHeight: 40
  }
});