import React from "react";
import { View, Text } from 'react-native';

const Obstacles = ({
    color,
    obstaclesLeft,
    obstacleWidth,
    obstacleHeight,
    gap,
    randomBottom
}) => {
    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }} />
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom
            }} />
        </>
    )
}

export default Obstacles;