import React, { Component } from 'react'
import {View, StyleSheet, Image, Modal} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

export default class ImageView extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: "",
        };
    }

    
    componentWillMount() {
        // 上个界面传来的照片集合
        const params = this.props;
        const images = params.images;
        this.setState({
            imageUrl: images,
            modalVisible: true
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <Modal
                 visible={this.state.modalVisible}
                 transparent={true}
                 onRequestClose={() => {
                    this.setState({modalVisible: false});
                    this.props.navigator.pop()
                 }}>
                    <ImageViewer
                        imageUrls={[{url: this.state.imageUrl}]} // 照片路径
                        enableImageZoom={true} // 是否开启手势缩放
                        saveToLocalByLongPress={false}
                        flipThreshold={0}
                        maxOverflow={0}/>
                </Modal>        
            {/* <Image source={{uri: this.state.imageUrl}} style={{width: 480, height: 640}}/>     */}
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    }
});