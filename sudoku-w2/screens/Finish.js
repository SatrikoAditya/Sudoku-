import React from 'react'
import {View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native'
import {playGame, createBoard} from '../store/action/index'
import {useDispatch} from 'react-redux'

export default function FinishScreen( {navigation, route} ) {
    const {name, level} = route.params

    const dispatch = useDispatch()

    function playAgain(name, level) {
        navigation.navigate('Game', {name, level})
        dispatch(playGame())
        dispatch(createBoard(level))
    }

    return (
        <View style={style.container}>
            <Image style={{width: 400, height: 300, marginTop: 25}} source={{uri: 'http://pngimg.com/uploads/confetti/confetti_PNG87045.png'}} />
            <Text style={style.text}>Congratulation!</Text>
            <Text style={style.text}>{name}</Text>
            <View style={style.popper}>
                <Image style={{width: 150, height: 150}} source={require('../assets/popper.png')}></Image>
                <Image style={{width: 150, height: 150, marginLeft: 100}} source={require('../assets/popper_rotate.png')}></Image>
            </View>
            <Pressable style={{marginTop: 60}}>
                <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={{color: 'white', fontSize: 25}}>Back To Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={() => playAgain(name, level)}>
                    <Text style={{color: 'white', fontSize: 25}}>Play Again</Text>
                </TouchableOpacity>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFF33'
    },
    popper: {
        marginTop: 30,
        flexDirection: 'row'
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'red'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FF4500',
        marginTop: 20,
        padding: 10
    }
})

