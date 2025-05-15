import { storeKeys } from "@data/index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  getData,
  getFriendlyFirebaseError,
  storeData,
  validateData,
} from "@utils/utils"
import { router, SplashScreen } from "expo-router"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { auth, firestore } from "../../firebaseConfig"

// User type for Typescript
type UserType = {
  uid: string
  email: string
  firstName: string
  lastName: string
}

// AuthContext Type for Typescript
type AuthContextType = {
  isReady: boolean
  alreadyLaunched: boolean
  isLoggedIn: boolean
  user: null | UserType
  setFirstLaunch: () => void
  sendVerificationEmail: (
    user: User | null
  ) => Promise<{ success: boolean; msg?: string }>
  logOut: () => void
  logIn: (data: {
    email: string
    password: string
  }) => Promise<{ success: boolean; msg?: string }>
  register: (data: {
    email: string
    password: string
    cPassword: string
    firstName: string
    lastName: string
  }) => Promise<{ success: boolean; msg?: string }>
}

// Creating an Auth Context
const AuthContext = createContext<AuthContextType>({
  isReady: false,
  alreadyLaunched: false,
  isLoggedIn: false,
  user: null,
  setFirstLaunch: () => {},
  sendVerificationEmail: async () => ({
    success: false,
    msg: "Not implemented",
  }),
  logOut: () => {},
  logIn: async () => ({ success: false, msg: "Not implemented" }),
  register: async () => ({ success: false, msg: "Not implemented" }),
})

// Stopping the Splash Screen while getting user from storage
SplashScreen.preventAutoHideAsync()

// Actual Auth Provider
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [alreadyLaunched, setAlreadyLaunched] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | null>(null)

  // Healper Funcition for get Single User from Firebase
  const getFirestoreUser = async (uid: string) => {
    const userDoc = await getDoc(doc(firestore, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserType
    } else {
      return null
    }
  }

  // Verification linke send funcition
  const sendVerificationEmail = async (
    user: User | null
  ): Promise<{ success: boolean; msg?: string }> => {
    try {
      if (!user) {
        throw new Error("User is not logged in.")
      }

      if (user.emailVerified) {
        return {
          success: false,
          msg: "Email is already verified.",
        }
      }

      await sendEmailVerification(user)

      return {
        success: true,
      }
    } catch (e: any) {
      const msg = getFriendlyFirebaseError(e)
      return { success: false, msg }
    }
  }

  // Seting the First Launch value
  const setFirstLaunch = () => {
    setAlreadyLaunched(true)
    storeData(storeKeys.alreadyLaunched, { alreadyLaunched: true })
    router.replace("/login")
  }

  // Login Logic
  const logIn = async (data: { email: string; password: string }) => {
    try {
      const isValid = validateData("login", data)
      if (isValid !== true) throw new Error(isValid.toString())

      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const firestoreUser = await getFirestoreUser(res.user.uid)

      if (firestoreUser) {
        setUser(firestoreUser)
        setIsLoggedIn(true)
        await storeData(storeKeys.auth, {
          isLoggedIn: true,
          user: firestoreUser,
        })
      } else {
        throw new Error("User Data not found.")
      }

      return { success: true }
    } catch (e: any) {
      const msg = getFriendlyFirebaseError(e)
      return { success: false, msg }
    }
  }

  // Register Logic
  const register = async (data: {
    email: string
    password: string
    cPassword: string
    firstName: string
    lastName: string
  }) => {
    try {
      const isValid = validateData("register", data)
      if (isValid !== true) throw new Error(isValid.toString())

      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const user = res.user
      const emailVerification = await sendVerificationEmail(user)

      if (!emailVerification.success) throw new Error(emailVerification.msg)

      const newUser: UserType = {
        uid: user.uid,
        email: user.email || "",
        firstName: data.firstName,
        lastName: data.lastName,
      }

      await setDoc(doc(firestore, "users", user.uid), newUser)

      setUser(newUser)
      setIsLoggedIn(true)
      await storeData(storeKeys.auth, { isLoggedIn: true, user: newUser })

      return { success: true }
    } catch (e: any) {
      const msg = getFriendlyFirebaseError(e)
      return { success: false, msg: msg.toString() }
    }
  }

  // Logout Logic
  const logOut = async () => {
    await signOut(auth)
    setIsLoggedIn(false)
    setUser(null)
    await AsyncStorage.removeItem(storeKeys.auth)
    router.replace("/login")
  }

  // Use Effect for restore User from Store
  useEffect(() => {
    const restoreUser = async () => {
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

    restoreUser()
  }, [])

  // User Effect for remove Splash Screen after restoring the user
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
        sendVerificationEmail,
        logIn,
        register,
        setFirstLaunch,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

// Hook for Direct user of Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error("useAuth must be wrappe within the AuthProvider.")

  return context
}
