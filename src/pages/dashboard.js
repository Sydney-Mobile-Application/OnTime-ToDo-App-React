import React from 'react';
import { StyleSheet, View, Text, Image, Pressable} from 'react-native';

const width_name = '33%';
const width_highlight = '75%';

export default function Dashboard () {
  return (
    <View style={styles.top}>
      <Text style={styles.name}>Ohayou, James-kun!</Text>
      {/* <Text style={styles.taskp}>20 tasks to do today</Text> */}
      <Text style={styles.date}>20 Jun</Text>
      <View style={styles.container}>
        <View style={styles.highlight}>
          <Text style={styles.highlight_text}>Meeting with project team</Text>
        </View>
        <Text>Dashboard - Silahkan Mengubah Halaman Sesuai Figma</Text>
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
  iconGetStarted : {
    alignItems: 'right',
    justifyContent: 'right',

  },
  top: {
    backgroundColor: '#FBFBFB',
    alignItems: 'left',
    justifyContent: 'left',
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