import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const ProgressCard = () => {
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={75}
      tintColor="#00e0ff"
      backgroundColor="#3d5875"
    />
  )
}

export default ProgressCard