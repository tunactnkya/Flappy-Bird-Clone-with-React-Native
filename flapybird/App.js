import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [score, setScore] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const [isGameOver, setIsGameOver] = useState(false)


  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }

    }
  }, [birdBottom])
  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('Jumped')
    }
  }

  // First obstacles

  useEffect(() => {
    if (obstaclesLeft > - obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
      setScore(score => score + 1)
    }
  }, [obstaclesLeft])

  // Second obstacles

  useEffect(() => {
    if (obstaclesLeftTwo > - obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random() * 100)
      setScore(score => score + 1)
    }
  }, [obstaclesLeftTwo])


  //  for collision

  useEffect(() => {
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 5)) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 5) &&
        (obstaclesLeft > screenWidth / 2 - 30 && obstaclesLeft < screenHeight / 2 + 5)
      )
      ||
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 5) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 5)) &&
        (obstaclesLeftTwo > screenWidth / 2 - 30 && obstaclesLeftTwo < screenWidth / 2 + 5)
      )
    ) {
      console.log('game over')
      gameOver()

    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
  }
  return (
    <TouchableWithoutFeedback onPress={jump} >
      <View style={styles.container} >
        {isGameOver && <Text>{score}</Text>}
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles
          color={'yellow'}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          obstaclesLeft={obstaclesLeft}
          randomBottom={obstaclesNegHeight}
          gap={gap} />
        <Obstacles
          color={'blue'}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          obstaclesLeft={obstaclesLeftTwo}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap} />
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App;