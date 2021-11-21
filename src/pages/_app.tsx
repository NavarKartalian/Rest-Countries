import { AppProps } from 'next/app';
import { ChakraProvider, Box, BoxProps } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps, router }: AppProps) {
  const MotionBox = motion<BoxProps>(Box);

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <MotionBox
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: '0.5' }}
      >
        <Component {...pageProps} />
      </MotionBox>
    </ChakraProvider>
  );
}

export default MyApp
