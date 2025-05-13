import { ThemeContext } from "@context/themeContext"
import React, { useContext } from "react"
import { Text, View } from "react-native"

const Home = () => {
  const { Colors } = useContext(ThemeContext)
  return (
    <View style={{ backgroundColor: Colors.bg }}>
      <Text>Home</Text>
    </View>
  )
}

export default Home
