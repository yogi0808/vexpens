import { storeKeys } from "@data/index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getData, storeData } from "@utils/utils"
import { router, SplashScreen } from "expo-router"
import { createContext, PropsWithChildren, useEffect, useState } from "react"

type AuthType = {
  isReady: boolean
  alreadyLaunched: boolean
  isLoggedIn: boolean
  user: null | {}
  setFirstLaunch: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthType>({
  isReady: false,
  alreadyLaunched: false,
  isLoggedIn: false,
  user: null,
  setFirstLaunch: () => {},
  logOut: () => {},
})

SplashScreen.preventAutoHideAsync()

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false)
  const [alreadyLaunched, setAlreadyLaunched] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const setFirstLaunch = () => {
    setAlreadyLaunched(true)
    storeData(storeKeys.alreadyLaunched, { alreadyLaunched: true })
    router.replace("/login")
  }

  const logOut = async () => {
    setIsLoggedIn(false)
    setUser(null)
    await AsyncStorage.removeItem(storeKeys.auth)
    router.replace("/login")
  }

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await getData(storeKeys.auth)
        const launchValue = await getData(storeKeys.alreadyLaunched)

        if (value !== null) {
          setIsLoggedIn(value.isLoggedIn)
          setUser(value.user)
        }

        if (launchValue !== null) {
          setAlreadyLaunched(launchValue.alreadyLaunched)
        }
      } catch (e) {
        console.log("Error fatching from storage:", e)
      } finally {
        setIsReady(true)
      }
    }

    getAuthFromStorage()
  }, [])

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
    }
  }, [user, isReady])

  return (
    <AuthContext.Provider
      value={{
        isReady,
        alreadyLaunched,
        isLoggedIn,
        user,
        setFirstLaunch,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
