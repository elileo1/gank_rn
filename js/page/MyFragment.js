import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

var FEED_URL = "http://gank.io/api/data/";

var ToolData = [
  {icon: 'md-water', bgColor: '#B88800', text: '干货推荐'},
  {icon: 'md-brush', bgColor: '#63616d', text: '感谢编辑'},
  {icon: 'md-stopwatch', bgColor: '#b86a0d', text: '版本更新'},
  {icon: 'md-settings', bgColor: '#636269', text: '关于作者'}
]

var CategoryData = [
  [
    {icon: 'md-chatbubbles', bgColor: '#4CAF50', text: 'all'},
    {icon: 'md-watch', bgColor: '#2196F3', text: 'ios'},
    {icon: 'md-phone-portrait', bgColor: '#A68F52', text: 'Android'}
  ],
  [
    {icon: 'md-tv', bgColor: '#088DB4', text: '前端'},
    {icon: 'md-radio', bgColor: '#00BCD4', text: '瞎推荐'},
    {icon: 'md-wifi', bgColor: '#795548', text: '扩展资源'} 
  ],
  [
    {icon: 'md-document', bgColor: '#355a9b', text: 'App'},
    {icon: 'md-film', bgColor: '#ff9800', text: '休息视频'},
    {icon: 'md-heart-empty', bgColor: '#f44336', text: '福利'}
  ]
]

var LanguageType = [
  {num: 185, text: 'Flutter版', needLine: true},
  {num: 17, text: '小程序版', needLine: true},
  {num: 218, text: 'Android版', needLine: true},
  {num: 33, text: 'IOS版', needLine: false},
]

export default class HomeFragment extends Component {
  constructor(props){
    super(props);
    this.state = {
      listImageData: [],
      listVideoData: []
    }
    this._getNewsList = this._getNewsList.bind(this);
    this.renderItemImage = this.renderItemImage.bind(this)
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: "#f1f1f1"}} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.myInfobg}> 
              <Image source={{uri: "https://pic1.zhimg.com/v2-ec7ed574da66e1b495fcad2cc3d71cb9_xl.jpg"}} 
                style={{width: 50, height: 50, marginLeft: 30, borderRadius: 25,}}/>
              <View style={{flexDirection: "column", marginLeft: 20}}>
                <Text style={{color: "#2d2d2d", fontSize:20, fontWeight:"bold"}}>用GitHub登录</Text>
                <Text style={{color: "#616161", fontSize: 14}}>登录后可提交干货</Text>
              </View>  
          </View>
          {this.renderLanguage()} 
        </View>
      {this.renderCategory()}
      {this.renderTool()}
      {this.renderImage()}
      {this.renderVideo()}
    </ScrollView>
    )
  }

  renderLanguage(){
    return(
      <View style={{marginTop: 20, marginBottom: 20, flex: 1, flexDirection: "row"}}>
        {LanguageType.map((item) => {
          return(
            <View style={styles.dividerItemH}>
              <View style={styles.dividerItem}>
                <Text style={{color:"#7a7a7a", fontSize: 12, fontWeight:"bold"}}>{item.num}</Text>
                <Text style={{color:"#7a7a7a", fontSize: 12}}>{item.text}</Text>
              </View>
          
              <View style={{width: item.needLine ? 1 : 0, height: 15, backgroundColor: "#dfdfdf", marginTop: 18}} />
            </View>
          )
        })}
      </View>  
    );
  }

  renderCategory(){
    return(
      <View style={styles.container}>
        {CategoryData.map((item) => {
          return(
            <View style={{marginTop: 10, marginBottom: 10, flex: 1, flexDirection: "row"}}>
              {item.map((value) => {
                return(
                  <View style={styles.dividerItem}>
                    <View style={[styles.iconStyle, {backgroundColor: value.bgColor}]}>
                      <Icon name={value.icon} size={25} color={"#ffffff"} />
                    </View>
                    <Text style={{color:"#717171", marginTop: 10}}>{value.text}</Text>
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    );
  }

  renderTool(){
    return(
      <View style={styles.container}>
        <View style={{marginTop: 10, marginBottom: 10, flex: 1, flexDirection: "row"}}>
          {ToolData.map((item) => {
            return(
              <View style={styles.dividerItem}>
              <View style={[styles.iconStyle, {backgroundColor: item.bgColor}]}>
                <Icon name={item.icon} size={25} color={"#ffffff"} />
              </View>
              <Text style={{color:"#717171", marginTop: 10}}>{item.text}</Text>
            </View>
            );
          })}
        </View>
      </View>
    )
  }

  renderImage(){
    if(this.state.listImageData.length > 0){
      return(
        <View style={styles.container}>
          <View style={styles.horizontalItem}>
            <View style={[styles.iconStyle, {backgroundColor: "#B86A0D"}]}>
              <Icon name={"md-photos"} size={25} color={"#ffffff"} />
            </View>
            <Text style={{color:"#717171", marginLeft: 10, fontSize: 16}}>妹子福利</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator = {false}
            style={{marginTop: 20, marginBottom: 10, paddingLeft: 15, paddingRight: 15}}
            ListFooterComponent={ <View style={{ margin: 15}} /> }
            data={this.state.listImageData}
            renderItem={this.renderItemImage}
            horizontal={true}/>
        </View>
      )
    }
  }

  renderItemImage({item}){
    return(
      <TouchableOpacity onPress={this._onPressImage.bind(this, item)} activeOpacity={1}>
        <Image
          style={{width: 150, height: 80, borderRadius: 10, marginLeft: 5, marginRight: 5}}
          source={{uri: item.url}}/>
      </TouchableOpacity>   
    )
  }

  _onPressImage(item){
    
  }

  renderVideo(){
    if(this.state.listVideoData.length > 0){
      return(
        <View style={styles.container}>
          <View style={styles.horizontalItem}>
            <View style={[styles.iconStyle, {backgroundColor: "#87C354"}]}>
              <Icon name={"md-photos"} size={25} color={"#ffffff"} />
            </View>
            <Text style={{color:"#717171", marginLeft: 10, fontSize: 16}}>休息视频</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator = {false}
            style={{marginTop: 20, marginBottom: 10, paddingLeft: 15, paddingRight: 15}}
            ListFooterComponent={ <View style={{ margin: 15}} /> }
            data={this.state.listVideoData}
            renderItem={({item, index}) => this.renderItemVideo(item, index)}
            horizontal={true}/>
        </View>
      );
    }
  }

  renderItemVideo(item, index){
    var imageUrl = "";
    var content = "";
    switch(index){
      case 0:
        imageUrl = "https://pic2.zhimg.com/50/v2-55039fa535f3fe06365c0fcdaa9e3847_400x224.jpg";
        content = "软件更新意料之中，硬件之谜...";
        break;
      case 1:
        imageUrl = "https://pic3.zhimg.com/v2-b4551f702970ff37709cdd7fd884de5e_294x245|adx4.png";
        content = "晒一晒你的书桌/办公桌";
        break;
      case 2:
        imageUrl = "https://pic2.zhimg.com/50/v2-ce2e01a047e4aba9bfabf8469cfd3e75_400x224.jpg";
        content = "聊聊你的高三生活";
        break;
      default:
        imageUrl = "https://pic1.zhimg.com/50/v2-bb3806c2ced60e5b7f38a0aa06b89511_400x224.jpg";
        content = "最适合夏天吃的那种";
        break;
    }

    return(
      <View style={{width:300, height: 100, borderRadius: 10, marginLeft: 5, marginRight: 5, backgroundColor: "#e0e0e0", flexDirection: 'row', alignItems: "center"}}>
        <View style={{flexDirection: 'column', width: 190, marginLeft: 10}}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{color:"#000000", fontSize:12, textAlign: 'center'}}>{item.desc}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{color:"#6d6d6d", fontSize:14, textAlign: 'center', marginTop: 5}}>{content}</Text>
        </View>
        <Image source={{uri: imageUrl}} style={{width: 80, height: 80, borderRadius: 8, position: "absolute", right: 10}}/>
      </View>
    )
  }

  componentDidMount(){
    this._getNewsList('福利')
    this._getNewsList('休息视频')
  }

  _getNewsList(sType){
    var url = FEED_URL + sType + '/4/1';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if(sType == '福利'){
            this.setState({
              listImageData: responseJson.results
            })
        }else{
          this.setState({
            listVideoData: responseJson.results
          })
        }
      })
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#ffffff",
    marginTop: 10,
    flexDirection: 'column',
  },
  myInfobg: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    height: 100,
    alignItems: 'center'
  },
  dividerItemH:{
    flex: 1, 
    flexDirection:"row", 
  },
  dividerItem:{
    flex: 1, 
    flexDirection:"column", 
    justifyContent: "center", 
    alignItems:"center"
  },
  horizontalItem:{
    flex: 1, 
    flexDirection:"row", 
    alignItems:"center",
    padding: 10
  },
  iconStyle:{ 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: "center", 
    alignItems:"center"
  }
})