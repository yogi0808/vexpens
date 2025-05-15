import { useTheme } from "@context/themeContext"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

const TabLayout = () => {
  const { Colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.p.toString(),
        tabBarInactiveTintColor: Colors.text_tert.toString(),
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 84,
          borderColor: Colors.border_act,
          backgroundColor: Colors.bg_muted,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
