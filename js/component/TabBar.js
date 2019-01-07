'use strict'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator';
import {StyleSheet, Image} from 'react-native';
import px2dp from '../util/px2dp';
import HomeFragment from '../page/HomeFragment';
import ClassifyFragment from '../page/ClassifyFragment';
import MyFragment from '../page/MyFragment';

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#9cc45c',
        normalColor: '#777777'
    };

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '分类', '我的']
        }
    }

    render(){
        const {selectedColor} = this.props;
        const {tabName} = this.state;

        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}
                sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'classify'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.classifyNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.classifySelected} />}
                    onPress={() => this.setState({ selectedTab: 'classify' })}>
                    {<ClassifyFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'my'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.myNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.mySelectd} />}
                    onPress={() => this.setState({ selectedTab: 'my' })}>
                    {<MyFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>    
        );
    }

    componentDidMount(){
        const {selectedColor, normalColor} = this.props;

        Icon.getImageSource("md-home", 50, normalColor).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource("md-home", 50, selectedColor).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource("md-options", 50, normalColor).then((source) => this.setState({classifyNormal: source}));
        Icon.getImageSource("md-options", 50, selectedColor).then((source) => this.setState({classifySelected: source}));
        Icon.getImageSource("md-person", 50, normalColor).then((source) => this.setState({myNormal: source}));
        Icon.getImageSource("md-person", 50, selectedColor).then((source) => this.setState({mySelectd: source}));
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(49),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    tabStyle:{
       
    },
    tab: {
        width: px2dp(20),
        height: px2dp(20)
    }
});
