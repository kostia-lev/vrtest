import React from 'react';
import {
    AppRegistry,
    asset,
    StyleSheet,
    Pano,
    Text,
    View,
} from 'react-vr';

const StaticContainer = require('StaticContainer.react');
const processTransform = require('processTransform');
const MatrixMath = require('MatrixMath');

class Camera extends React.Component {
    render() {
        var matrix = this.props.transform ?
            processTransform(this.props.transform) :
            MatrixMath.createIdentityMatrix();
        var invMatrix = MatrixMath.inverse(matrix);
        return (
            <View style={{transform:[{matrix:invMatrix}]}}>
                <StaticContainer>
                    <View>
                        {this.props.children}
                    </View>
                </StaticContainer>
            </View>);
    }
}

class RenderScene extends React.Component {
    render() {
        return (
            <View>
                <Text
                    style={{
                        backgroundColor:'blue',
                        padding: 0.02,
                        textAlign:'center',
                        textAlignVertical:'center',
                        fontSize: 0.8,
                        layoutOrigin: [0.5, 0.5],
                        transform: [{translate: [0, 0, -3]}],
                    }}>
                    hello
                </Text>
            </View>);
    }
}

export class JumpAround extends React.Component {
    constructor() {
        super();
        this.timer = 0;
        this.state = {
            view: [0,0,0],
        }
    }
    _update() {
        this.setState({view:[(Math.random()-0.5) * 5,0,(Math.random()-0.5) * 5]})
        this.timer = setTimeout(() => this._update(), 1000);
    }
    componentDidMount() {
        this._update();
    }
    componentWillUnmount() {
        cancelTimeout(this.timer);
    }
    render() {
        return (
            <View>
                <Pano source={asset('chess-world.jpg')}/>
                <Camera transform={[{translate:this.state.view}]}>
                    <RenderScene/>
                </Camera>
            </View>);
    }
};

//AppRegistry.registerComponent('JumpAround', () => JumpAround);