import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Movie from './screens/Movie';
import TV from './screens/TV';
import Movieid from './screens/Movieid';
import TVid from './screens/TVid';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#7DD329',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,  
      headerShown: false,
      tabBarLabelStyle: {
        fontSize: 15
      },
      tabBarStyle: {
        height: 60,
        paddingHorizontal: 5,
        paddingBottom: 3,
        backgroundColor: 'rgba(39, 39, 42, 1)',
        position: 'absolute',
        borderTopWidth: 0,
    },
    }}
    >
    <Tab.Screen
      name="Movie"
      component={Movie}
      options={{
        tabBarLabel: 'Movie',
        tabBarIcon: ({ color, size }) => (
          <Icon name="film-outline" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="TV"
      component={TV}
      options={{
        tabBarLabel: 'TV',
        tabBarIcon: ({ color, size }) => (
          <Icon name="tv-outline" color={color} size={30} />
        ),
      }}
    />
  </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Movieid" component={Movieid} />
        <Stack.Screen name="TVid" component={TVid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;