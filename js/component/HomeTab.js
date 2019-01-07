import React, { Component } from 'react'
import {View, StyleSheet,  ActivityIndicator, FlatList, Text, Dimensions,  Image,  RefreshControl , TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import computeTime from '../util/computeTime'
import ImageView from '../page/ImageView'

var BASE_URL = "http://gank.io/api/data/";
var currentPage = 1;
var noMoreData = false;
const ScreenWidth = Dimensions.get('window').width;

export default class HomeTab extends Component {
    constructor(props){
        super(props)
        this.state={
            refreshing: true,
            loadedData: true,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            dataBlob: []
        }
        this._fetchData = this._fetchData.bind(this);
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData(){
        var {tabTag} = this.props;
        var url = BASE_URL + tabTag + '/10/' + currentPage;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let foot = 0;
                let resultData = [];
                if(currentPage > 1){
                    if(responseJson.results.length == 0){
                        noMoreData = true;
                        foot = 1;
                    }
                    resultData = this.state.dataBlob.concat(responseJson.results);
                }else{
                    resultData = responseJson.results
                }
                this.setState({
                    refreshing: false,
                    loadedData: false,
                    showFoot:foot,
                    dataBlob: resultData
                });
                resultData = null
            });
    }

    _onRefresh() {
        currentPage = 1;
        this.setState({refreshing: true});
        this._fetchData();
    }

    render() {
        if(this.state.loadedData){
            return this.renderLoading();
        }
        return (
            <FlatList
                showsVerticalScrollIndicator = {false}
                data={this.state.dataBlob}
                renderItem={this.renderHomeItem.bind(this)}
                style={styles.list}
                refreshControl = {
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}/>
                    }
                ListFooterComponent = {this._renderFooter.bind(this)}    
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
            />
        );
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
         //如果是正在加载中或没有更多数据了，则返回
         if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if(noMoreData){
            return;
        } else {
            currentPage++;
        }

        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this._fetchData();
    }

    renderLoading(){
        return(
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }

    renderHomeItem({item}){
        var {tabTag} = this.props;

        if(tabTag == '福利'){
            return (
                <View style={styles.imageItem}>
                    <TouchableOpacity onPress={this._onPressImage.bind(this, item)} activeOpacity={1}>
                        <Image
                            style={{width: (ScreenWidth - 30), height: (ScreenWidth - 30), marginTop:10, marginBottom: 10}}
                            source={{uri: item.url}}/>
                    </TouchableOpacity>        
                    <Text style={{fontSize: 20, color:"#ffffff", position: 'absolute', left: 20, bottom: 20}}>
                        {item.desc}
                    </Text>    
                </View>
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
    },
    imageItem: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
})
