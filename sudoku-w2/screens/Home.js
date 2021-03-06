import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import DialogInput from 'react-native-dialog-input'
import {playGame} from '../store/action/index'
import {useDispatch} from 'react-redux'

export default function HomeScreen({ navigation }) {
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [level, setLevel] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    function startGame(name, level) {
        navigation.navigate('Game', {
            name, level
        })
    }

    function setLevelAndCallDialog(levelChoose) {
        setIsDialogVisible(true)
        setLevel(levelChoose)
    }

    function submitDialog(inputText, level) {
        if(!inputText) {
            setError('Please Input Your Name!')
        } else {
            startGame(inputText, level)
            setIsDialogVisible(false)
            dispatch(playGame())
        }
    }

    function closeDialog() {
        setIsDialogVisible(false)
        setError('')
    }

    return (
        <>
            <DialogInput 
                isDialogVisible={isDialogVisible}
                title={"Input Your Name First"}
                message={error}
                hintInput ={"Your Name Here.."}
                submitInput={(inputText) => {submitDialog(inputText, level)}}
                closeDialog={closeDialog}>
            </DialogInput>

            <View style={style.container}>
                <Text />
                <Image style={style.welcome} source={require('../assets/welcome3.png')} />
                <Image style={style.logo} source={require('../assets/logo.png')} />
                <Image style={style.level} source={require('../assets/level3.png')} />
                <View>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('easy')}}>
                        <Text style={{fontSize: 20}}>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('medium')}}>
                        <Text style={{fontSize: 20}}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => {setLevelAndCallDialog('hard')}}>
                        <Text style={{fontSize: 20}}>Hard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#90EE90'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FFDF00',
        marginTop: 10,
        padding: 10
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20
    },
    welcome: {
        height: 150,
        width: 300,
        marginBottom: 15,
        marginTop: 50
    },
    level: {
        width: 150,
        height: 30,
        marginBottom: 10
    }
})