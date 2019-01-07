'use strict'
import React, {Component} from 'react';
import SplashScreen from '../.././native_modules/SplashScreen';
import {Platform, View, Text} from 'react-native'
import TabBar from '../component/TabBar';

export default class MainScene extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabBar navigator={this.props.navigator}/>
            </View>
        );
    }
    //render 之后
    componentDidMount(){
        if(Platform.OS === 'android')
            SplashScreen.hide();
      }
}


