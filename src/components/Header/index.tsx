import { Heading, Flex, Button, Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FiMoon, FiSun } from 'react-icons/fi'


export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');

  return (
    <>
      <Box w='100%' bgColor={bg} p='22px' boxShadow='md'>
        <Flex direction='row' justify='space-between' maxW='1600px' bgColor={bg} mx='auto' align='center'>
          <Heading fontSize='24px'>Where in the world?</Heading>
          <Button 
            leftIcon={colorMode === 'light' ? <FiMoon /> : <FiSun />} 
            bgColor={bg}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Flex>
      </Box>
    </>
  );
}