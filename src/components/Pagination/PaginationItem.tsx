import { Button, useColorMode } from "@chakra-ui/react";

interface PaginationItemProps {
    isCurrent?: boolean;
    number: number;
    paginate: (pageNumber: number) => void;
}

export function PaginationItem({isCurrent, number, paginate}: PaginationItemProps) {
  const { colorMode } = useColorMode();

  if(isCurrent) {
    return (
      <Button 
        size='sm' 
        fontSize='xs' 
        width='4'
        colorScheme={colorMode === 'dark' ? 'white' : 'hsl(209, 23%, 22%)'}
        disabled
        _disabled={colorMode === 'dark' ? {
          bgColor: 'white',
          cursor: 'default'
        } : {
          bgColor: 'gray.600',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    );
  }

  return (
      <Button 
        size='sm' 
        fontSize='xs' 
        width='4'
        bgColor={colorMode === 'dark' ? 'gray.700' : 'white'}
        _hover={colorMode === 'dark' ? {
          bg: 'gray.500'
        } : {
          bg: 'gray.400'
        }}
        onClick={() => paginate(number)}
      >
        {number}
      </Button>
  );
}