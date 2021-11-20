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
            },
            "*::-webkit-scrollbar": {
                width: '14px'
            },
            "*::-webkit-scrollbar-track": {
                backgroundColor: mode('#FAF8FF', '#3E4759')(props),
            },
            "*::-webkit-scrollbar-thumb": {
                backgroundColor: mode('#BABABA', '#B9C6D4')(props),
                border: mode('3px solid #FAF8FF', '3px solid #3E4759')(props),
                borderRadius: '10px'
            }
        })
    },
    config
})