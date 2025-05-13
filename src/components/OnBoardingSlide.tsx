import { ThemeContext } from "@context/themeContext"
import React, { useContext } from "react"
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native"

const { width } = Dimensions.get("window")

type ItemProp = {
  id: string
  title: string
  subtitle: string
  image: ImageSourcePropType
}

const OnBoardingSlide = ({ item }: { item: ItemProp }) => {
  const { Colors } = useContext(ThemeContext)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      width: width,
      paddingHorizontal: 20,
    },
    box: {
      backgroundColor: Colors.bg_surface,
      alignItems: "center",
      justifyContent: "center",
      height: width,
      width: "100%",
      borderRadius: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: Colors.text_prim,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      color: Colors.text_sec,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={item.image}
          style={{
            width: "100%",
            height: item.id === "1" ? "110%" : "130%",
          }}
          resizeMode="contain"
        />
      </View>
      <View style={{ gap: 20 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  )
}

export default OnBoardingSlide
