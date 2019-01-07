/** @format */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Navigator from './js/config/entry';

export default class GankClient extends Component{
  render(){
    return(
      <Navigator/>
    );
  }
}

AppRegistry.registerComponent("Gank", () => GankClient);
