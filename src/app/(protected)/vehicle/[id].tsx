import { useLocalSearchParams } from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const Vehicle = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default Vehicle
