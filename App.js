import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createBottomTabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      }
    },
  }, {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    },
  }
);

const AppContainer = createAppContainer(Tabs);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        {/* <View style={{ height: 20 }} /> */}
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
        <AppContainer style={{ flex: 1 }} />
      </Provider>
    );
  }
}