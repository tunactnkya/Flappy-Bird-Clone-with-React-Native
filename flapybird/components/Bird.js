import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50
  const birdHeight = 60
  return (
    <View style={{
      position: 'absolute',
      backgroundColor: 'red',
      width: birdWidth,
      height: birdHeight,
      borderRadius: 20,
      bottom: birdBottom,
      left: birdLeft - (birdWidth / 2)
    }} />
  )
}

export default Bird;