import { useTheme } from "@context/themeContext"
import React, { useContext } from "react"
import { Text, View } from "react-native"

const Home = () => {
  const { Colors } = useTheme()
  return (
    <View style={{ backgroundColor: Colors.bg }}>
      <Text>Home</Text>
    </View>
  )
}

export default Home
