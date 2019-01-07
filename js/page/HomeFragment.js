import React, { Component } from 'react'
import {View, StyleSheet,  ActivityIndicator, FlatList, Text, Image, Dimensions,  RefreshControl,  TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import computeTime from '../util/computeTime'
import moment from 'moment'
import Cauouse1 from 'react-native-banner-carousel'
import ImageView from './ImageView'

var REQUEST_HOME = "http://gank.io/api/today";
var REQUEST_HOME_BANNER = "http://gank.io/api/data/福利"

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

export default class HomeFragment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            homeData:[],
            refreshing: true
        }
        this.requestHomeData = this.requestHomeData.bind(this);
        this.requestHomeBanner = this.requestHomeBanner.bind(this);
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.requestHomeData();
    }

    render() {
        if(this.state.isLoading){
            return this.renderLoading();
        }
        return (
            <FlatList
                showsVerticalScrollIndicator = {false}
                data={this.state.homeData}
                renderItem={this.renderHomeItem.bind(this)}
                style={styles.list}
                refreshControl = {
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}/>
                    }
                />
        );
    }

    renderLoading(){
        return(
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }

    renderHomeItem({item}){
        if(item.bannerData != null){
            return(
                <Cauouse1
                    autoplay
                    autoplayTimeout={3000}
                    loop
                    index={0}
                    removeClippedSubviews={false}
                    pageSize={BannerWidth}>
                    {item.bannerData.map((data, index) => 
                        <View key={index}>
                            <TouchableOpacity onPress={this._onPressImage.bind(this, data)} activeOpacity={1}>
                                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: data.url }} />
                            </TouchableOpacity>    
                        </View>)
                    }
                </Cauouse1>
            )
        }
        return(
            <View style={styles.listItem}>
                <View style={{paddingTop:15, flex:1, flexDirection: 'row'}}>
                    <Icon name={"md-time"} size={20} color={"#9cc45c"}/>
                    <Text style={{color: '#a7a7a7', marginLeft:5, fontSize: 12}}>{item.publishedAt}</Text>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#a7a7a7', textAlign:"right", fontSize: 12}}>{computeTime(item.publishedAt)}</Text>
                    </View>
                </View>
                <Text style={{fontSize: 16, fontWeight: 'bold', paddingTop: 15}}>{item.desc}</Text>
                <View style={{paddingTop:15, flex:1, flexDirection: 'row', paddingBottom:10}}>
                    <Text style={{color: '#a7a7a7', marginLeft:5, fontSize: 12}}>作者：</Text>
                    <Text style={{color: '#9cc45c', marginLeft:5, fontSize: 12}}>{item.who}</Text>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#a7a7a7', textAlign:"right", fontSize: 12}}>{item.source}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _onPressImage(item){
        const { navigator } = this.props;
        //或者写成 const navigator = this.props.navigator;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'ImageView',
                component: ImageView,
                args:{
                    images:item.url
                }
            })
        }
    }


    componentDidMount(){
        this.requestHomeData();
    }

    requestHomeData(){
        fetch(REQUEST_HOME)
        .then((response) => response.json())
        .then((responseJson) => {
            let category = responseJson.category
            let resultData = [];
            for(var item in category){
                resultData.push(...(responseJson.results[category[item]]));
            }
            this.requestHomeBanner(resultData);
        }).catch(error => {

        });
    }

    requestHomeBanner(homeDataList){
        var curDate = moment(Date.now()).format("/MM/d");
        fetch(REQUEST_HOME_BANNER + curDate)
        .then((response) => response.json())
        .then((responseJson) => {
            var allData = [];
            var resultData = {
                bannerData: responseJson.results,
            };
            allData.push(resultData)
            allData.push(...homeDataList)
            this.setState({
                homeData: allData,
                isLoading: false,
                refreshing: false
            })
        })
        .catch(error => {
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    list:{
       backgroundColor: "#f1f1f1",
       marginBottom: 4
    },
    listItem: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15
    }
})