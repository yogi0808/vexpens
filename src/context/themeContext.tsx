import { darkTheme, lightTheme } from "@data/index"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Appearance, ColorSchemeName, ColorValue } from "react-native"

type ColorsType = {
  bg: ColorValue
  bg_muted: ColorValue
  bg_surface: ColorValue
  text_prim: ColorValue
  text_sec: ColorValue
  text_tert: ColorValue
  p: ColorValue
  p_hover: ColorValue
  p_pressed: ColorValue
  p_disabled: ColorValue
  border_def: ColorValue
  border_act: ColorValue
  border_dis: ColorValue
}

type ValueType = {
  Colors: ColorsType
  themeMode: ColorSchemeName
  toggleTheme: () => void
}

const ThemeContext = createContext<ValueType>({
  Colors: {
    bg: "#FFFFFF",
    bg_muted: "#F9FAFB",
    bg_surface: "#F3F4F6",
    text_prim: "#111827",
    text_sec: "#6B7280",
    text_tert: "#6B7280",
    p: "#3A5AFF",
    p_hover: "#2F4DE6",
    p_pressed: "#243FCC",
    p_disabled: "#B3C5FF",
    border_def: "#E5E7EB",
    border_act: "#3A5AFF",
    border_dis: "#D1D5DB",
  },
  themeMode: "dark",
  toggleTheme: () => {},
})

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme()
  const [themeMode, setThemeMode] = useState<ColorSchemeName>(colorScheme)

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeMode(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  const Colors = themeMode === "dark" ? darkTheme : lightTheme

  const value: ValueType = useMemo(
    () => ({
      Colors,
      themeMode,
      toggleTheme: () =>
        setThemeMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [themeMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

export const useTheme = (): ValueType => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be wrappe within ThemeProvider.")

  return context
}
