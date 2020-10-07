import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import {createBoard, updateBoard, autoSolve, checkSolve} from '../store/action/index'

export default function GameScreen({navigation, route}) {
  const {name, level} = route.params
  const {loading, board, checkBoard, automaticSolve, isSolved} = useSelector((state) => state)
  const [hideButton, setHideButton] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createBoard(level))
  }, [dispatch,level])

  function handleInput(value, rowIdx, colIdx) {
    let copyBoard = JSON.parse(JSON.stringify(board))
    copyBoard[rowIdx][colIdx] = Number(value)
    dispatch(updateBoard(copyBoard))
  }

  function checkSolved(board) {
    dispatch(checkSolve(board))
    if(automaticSolve) {
      alert(`sorry you can't submit the answer because you completed it automatically, Please back to home`)
    } else {
      if(isSolved) {
        navigation.navigate('Finish', {name, level})
      } else {
        alert('Sorry the answer is still wrong ☹️')
      }
    }
  }

  function solve(board) {
    dispatch(autoSolve(board))
    alert('Sudoku Solved!')
    setHideButton(true)
  }

  let editBoard = JSON.parse(JSON.stringify(board))
  for(let i = 0; i < editBoard.length; i++) {
    for(let j = 0; j < editBoard[i].length; j++) {
        if(editBoard[i][j] === 0) {
            editBoard[i][j] = ' '
        }
    }
  }


  return (
    <View style={styles.container}>
      {!loading && <Image style={styles.title} source={require('../assets/sudoku.png')} />}
        {loading && <Text style={styles.text}>Welcome {name}! </Text>}
        <StatusBar style="auto" />
        <View style={{marginBottom: 20, marginTop: 10}}>
          {loading &&
            <View>
              <Text style={{marginBottom: 10}}>Please Wait..</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>}
        {
          editBoard && checkBoard[0] && editBoard.map((rowArr, rowIdx) => {
            return (
              <View style={{flexDirection: "row"}} key={rowIdx}>
                {
                  rowArr.map((colCell, colIdx) => {
                    return (
                      <TextInput 
                        style={boardStyle(checkBoard, rowIdx, colIdx)}
                        value={String(colCell)}
                        keyboardType='number-pad'
                        onChangeText={(val) => handleInput(val, rowIdx, colIdx)}
                        key={colIdx}
                        editable={edit(checkBoard, rowIdx, colIdx)}
                        />
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
      {!loading && <View style={{flexDirection: 'row'}}>
        {!hideButton && <TouchableOpacity style={styles.button} onPress={() => checkSolved(board)}>
            <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>}
        {!hideButton && <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#FF1493', marginTop: 30, padding: 15, marginLeft: 20}} onPress={() => solve(checkBoard)}>
            <Text style={styles.textButton}>Solve</Text>
        </TouchableOpacity>}
        {automaticSolve && <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#FF1493', marginTop: 30, padding: 15, marginLeft: 20}} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textButton}>Back To Home</Text>
        </TouchableOpacity>}
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDFD3',
    alignItems: 'center'
  },
  text: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'notoserif',
      marginBottom: 30,
      marginTop: 300
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FF1493',
    marginTop: 30,
    padding: 15
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'notoserif',
    color: 'white'
  },
  title: {
    marginTop: 100
  }
  
});

const cellWidth = Dimensions.get('window').width / 10

function boardStyle(checkBoard, rowIdx, colIdx) {
  let style = {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    width: cellWidth,
    height: cellWidth,
    textAlign: 'center',
    color: 'black'
  }

  if(checkBoard[rowIdx][colIdx] !== 0){
    style.backgroundColor = 'pink'
  }

  if (rowIdx % 3 === 0) {
    style.borderTopWidth = 5,
    style.borderTopColor = 'red'
  }
  if (colIdx % 3 === 0) {
    style.borderLeftWidth = 5,
    style.borderLeftColor = 'red'
  }
  if (rowIdx === 8) {
    style.borderBottomWidth = 5,
    style.borderBottomColor = 'red'
  }
  if (colIdx === 8) {
    style.borderRightWidth = 5,
    style.borderRightColor = 'red'
  }
  return style
}

function edit(checkBoard, rowIdx, colIdx) {
    if(checkBoard[rowIdx][colIdx] === 0) {
        return true
    } else {
      return false
    }
}