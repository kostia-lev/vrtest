import React from 'react';
import {
    AppRegistry,
    asset,
    Pano,
    Text,
    View,
    Image,
    Sphere,
    PointLight, Box, Cylinder, Plane
} from 'react-vr';

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {earthDeg: 10};

    }
    componentDidMount(){
        console.log('hi');
        setInterval(()=>{ alert('timeout'); this.setState({earthDeg: this.state.earthDeg + 10}) }, 1000);

    }
    render() {
        return (
            <View>
                <Pano source={asset('chess-world.jpg')}/>

                <Sphere
                    ref="earth"
                    style={{
                        transform: [{translateZ: -2}, {rotateY: this.state.earthDeg + 'deg'}]
                    }}
                    lit
                    texture={asset('earth.jpg')}
                    heightSegments={20}
                    widthSegments={20}
                    onClick={()=>{alert('hi')}}
                />



                <PointLight
                    intensity={1}
                    style={{
                        transform: [{translate: [0, 700, 700]}]
                    }}
                />



                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.8,
                        fontWeight: '400',
                        layoutOrigin: [0.5, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [{ translate: [0, 0, -3] }]
                    }}>
                    {this.state.earthDeg}
                </Text>
                <View style={{
                    width: 2,
                    height: 2.4,
                    backgroundColor: 'white',
                    layoutOrigin: [0.5, 0.5],
                    transform: [{ translate: [0, -1, -3] }]
                }}>
                    <Image source={asset('gazon.jpg')}
                           style={{ height: 1.2 }}
                    />
                    <Text style={{
                        color: '#333',
                        fontSize: 0.16,
                        textAlign: 'center'
                    }}
                    >Газонокосильщик</Text>

                </View>
            </View>
        );
    }
};

AppRegistry.registerComponent('App', () => App);
