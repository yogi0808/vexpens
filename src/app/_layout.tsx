import AuthProvider from "@context/authContext"
import ThemeProvider from "@context/themeContext"
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen
            name="(protected)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="on-boarding"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  )
}
