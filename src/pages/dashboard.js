import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable, Dimensions, Switch} from 'react-native';

const width_name = '50%';
const width_highlight = '75%';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Dashboard () {
  return (
    <View>

      <View style={styles.top}>
          <View style={styles.left}>
            <Text style={styles.name}>Ohayou, James-kun!</Text>
            
            <Text style={styles.date}>20 Jun</Text>
          </View>

          <View style={styles.right}>
            <Image
              style={styles.avatar}
              source={require('../../assets/profile1.jpeg')} />
          </View>
      </View>
      

      <View style={styles.container}>

        <View style={styles.highlight}>
          <Text style={styles.highlight_text}>Meeting with project team</Text>
        </View>

        <View style={styles.priority}>
          <Text style={styles.priority} >Priority</Text>
            <View style={styles.taskNear}>
              <Text style={styles.taskText}>Meeting with Project Team</Text>
              <Text style={styles.taskDate}>20 Sep</Text>
            </View>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priority:{
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    alignItems: 'left',
    justifyContent: 'left',
    marginBottom:30,
    marginLeft: 20,
  },
  taskNear:{
    width:131,
    height:131,
    marginLeft: 20,
    borderRadius: 20,
    paddingTop:30,
    paddingBottom:30,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: '#293462',
  },
  taskText:{
    color: '#FFFFFF',
  },
  taskDate:{
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "flex-end",
    position: 'relative',
    marginLeft: windowWidth*0.22,
    marginTop: windowHeight*0.03,
  },
  top: {
    backgroundColor: '#FBFBFB',
    alignItems: 'left',
    justifyContent: 'left',
  },
  left: {
    alignSelf: "flex-start",
    alignItems: 'left',
    justifyContent: 'left',
  },
  right: {
    // flexDirection: 'row',
    flex: 0.5,
    alignSelf: "flex-start",
    alignItems: 'right',
    justifyContent: 'right',
  },
  name:{
    marginTop: 20,
    marginLeft: 19,
    width: width_name,
    fontWeight: 'bold',
    fontSize: 21,
    alignSelf: 'flex-start'
  },
  taskp:{
    alignItems: 'right',
    justifyContent: 'right',
    fontSize: 12,
    alignSelf: 'flex-start'
  },
  date:{
    marginTop: 17,
    marginLeft: 19,
    borderRadius: 15,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,  
    elevation: 5
  },
  highlight:{
    margin: 20,
    borderRadius: 20,
    paddingTop:30,
    paddingBottom:30,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor: '#FFEDBF',
    
  },
  highlight_text:{
    width:width_highlight,
    alignItems: 'center',
    justifyContent: 'left',
    fontSize: 19,    
    fontWeight: 'bold', 
  },
});