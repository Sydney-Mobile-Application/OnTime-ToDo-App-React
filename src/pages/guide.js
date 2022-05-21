import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { MaterialIcons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const why_OnTime =
    "OnTime To Do App is an application designed to assist your day-to-day tasks on time and list everything that you want to do. It is helpful in planning your daily schedules.";

const how_to_get =
    "Get it fast. You can simply look for our name 'OnTime To Do App' in playstore. If you can not find our App, thats likely means your phone is not supported to use our app.";

const supported_phone = 
    "OnTime To Do App are supported on platforms: Android 2.2, Android 2.3, Android 2.3.2, and Android 2.3.3."

const buy_app =
    "No, OnTime To Do App is completely free to download and install. We are here to assist you to plan your day!"

const use_directly =
    "Sure, you can use this apps directly right after your installation is done. But, you need to Sign Up first to add new task."

const OnTime_features =
    "OnTime To Do App assist you to add new task and set it's schedule and prioritization. Your task can be completed with an image from the gallery or camera and URL link."

const reschedule =
    "Of course you can. If your plan changes, you can reschedule your task directly from dashboard by swipe right on main task that appear on your screen or click on task you want to change."

const CONTENT = [
  {
    title: 'Why using On Time To Do App?',
    content: why_OnTime,
  },
  {
    title: 'How do I get OnTime To Do App for my phone? ',
    content: how_to_get,
  },
  {
    title: "Is my phone supported to use this apps?",
    content: supported_phone,
  },
  {
    title: 'Do I have to buy this On Time To Do App?',
    content: buy_app,
  },
  {
    title: 'Can I use OnTime To Do App directly after I download and install?',
    content: use_directly,
  },
  {
    title: 'What features does OnTime To Do App have?',
    content: OnTime_features,
  },
  {
    title: 'Can I reschedule my plan?',
    content: reschedule,
  }
];

export default class App extends Component {
    
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };
    
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };
    
    setSections = (sections) => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };
    
    renderHeader = (section, _, isActive) => {    
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={200}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'zoomIn' : undefined}
        style={styles.contentText}>{section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
        <View style={styles.container}>
        <View>
            <Pressable onPress={() => this.props.navigation.navigate('Help Support')}>
            <MaterialIcons  name='arrow-back' size={30} color='#293462' style={{paddingLeft: windowHeight * 0.04}}/>
            </Pressable>
            <Text style={styles.guideTitle}>FAQ</Text>
      </View>
      {/* <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Why Using OnTime To Do App?</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} Align="center">
            <View style={styles.content}>
              <Text>
                OnTime To Do App is an application designed to assist your day-to-day tasks on time and list everything that you want to do. It is helpful in planning your daily schedules.
              </Text>
            </View>
          </Collapsible> */}

          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={500}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        {/* </ScrollView>
      </View> */}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50
  },

  guideTitle: {
    fontSize: RFPercentage(3),
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginBottom: "10%",
    marginLeft: windowHeight * 0.05,
    fontFamily: 'Poppins_600SemiBold'
  },

  header: {
    backgroundColor: '#FFFFFF',
  },

  headerText: {
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: "12%",
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 50,

  },
  content: {
    paddingHorizontal: "15%",
    paddingVertical: "3%",
    backgroundColor: '#F5FCFF',
    width: "100%",
    height: "100%",
    fontFamily: "Poppins_400Regular",
    fontWeight: "500",
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "row",
  },
  contentText: {
    fontFamily: "Poppins_400Regular",
    marginBottom: "3%"
  },
  active: {
    backgroundColor: '#F5FCFF',
  },
  inactive: {
    backgroundColor: '#FFFFFF',
  },
});