import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import HomeTab from '../component/HomeTab'

export default class HomeFragment extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabNames: ['all', '福利', 'Android', 'iOS', '前端', '拓展资源', '瞎推荐', 'App', '休息视频']
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView renderTabBar={() => <ScrollableTabBar/>}
          tabBarUnderlineStyle={{backgroundColor: '#FFFFFF'}}//设置DefaultTabBar和ScrollableTabBarTab选中时下方横线的颜色
          tabBarBackgroundColor='#9cc45c'//bar背景颜色
          tabBarActiveTextColor='#000000'//设置选中Tab的文字颜色
          tabBarInactiveTextColor='#333333'//设置未选中Tab的文字颜色
          tabBarTextStyle={{fontSize: 13}}//设置Tab文字的样式
          >
          {this.state.tabNames.map((item, i) => {
            return(
                <HomeTab tabLabel={item} key={i} tabTag={item} navigator={this.props.navigator}/>
            );})
          }
        </ScrollableTabView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#f1f1f1"
  },
});