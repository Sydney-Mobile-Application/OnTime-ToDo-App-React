import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

export default function BottomBar () {
  const MusicRoute = () => <Text></Text>;
  const AlbumsRoute = () => <Text></Text>;
  const RecentsRoute = () => <Text></Text>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Dashboard', title: 'Dashboard', icon: 'grid' },
    { key: 'NewTask', title: 'New Task', icon: 'plus' },
    { key: 'Filter', title: 'Filter', icon: 'chart-pie' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Dashboard: MusicRoute,
    NewTask: AlbumsRoute,
    Filter: RecentsRoute,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ width: '100vh', backgroundColor: '#283562' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});