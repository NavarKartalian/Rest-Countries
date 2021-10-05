import { extendTheme,ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
    sm: "40em",
    md: "56em",
    lg: "80em",
    xl: "101em",
    "2xl": "116em",
  })

  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }

export const theme = extendTheme({
    breakpoints,
    fonts : {
        heading: 'Nunito Sans',
        body: 'Nunito Sans'
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode("black", "white")(props),
                bg: mode('gray.200', 'hsl(207, 26%, 17%)')(props),
            }
        })
    },
    config
})