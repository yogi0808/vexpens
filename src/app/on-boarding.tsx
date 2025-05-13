import OnBoardingSlide from "@components/OnBoardingSlide"
import { AuthContext } from "@context/authContext"
import { ThemeContext } from "@context/themeContext"
import { onBoardingData } from "@data/index"
import { Ionicons } from "@expo/vector-icons"
import { useContext, useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

export default function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const flatListRef = useRef<FlatList<any>>(null)

  const { Colors } = useContext(ThemeContext)

  const { setFirstLaunch } = useContext(AuthContext)

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems && viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0)
      }
    }
  ).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({ index: onBoardingData.length - 1 })
  }

  const handleNext = async () => {
    if (currentIndex < onBoardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      setFirstLaunch()
    }
  }

  const styles = StyleSheet.create({
    bottomContainer: {
      width: width,
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      marginBottom: 80,
      justifyContent: "space-between",
    },
    nextBtn: {
      backgroundColor: Colors.p,
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      transform: [{ rotateZ: "45deg" }, { translateX: -10 }],
      elevation: 10,
    },
    nextBtnText: {
      fontSize: 28,
      transform: [{ rotateZ: "-45deg" }],
      color: "white",
    },
    dot: {
      elevation: 1,
      width: 15,
      height: 3,
      backgroundColor: Colors.p_disabled,
      borderRadius: 50,
    },
    activeDot: {
      backgroundColor: Colors.p,
    },
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FlatList
        data={onBoardingData}
        renderItem={({ item }: ListRenderItemInfo<any>) => (
          <OnBoardingSlide item={item} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.7}
          style={{ width: 50 }}
        >
          {currentIndex === onBoardingData.length - 1 ? null : (
            <Text
              style={{
                color: Colors.text_sec,
              }}
            >
              Skip
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 5 }}>
          {onBoardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            ></View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          {currentIndex === onBoardingData.length - 1 ? (
            <Text style={styles.nextBtnText}>✓</Text>
          ) : (
            <Ionicons
              name="chevron-forward-outline"
              color="white"
              size={24}
              style={{
                transform: [{ rotateZ: "-45deg" }],
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
