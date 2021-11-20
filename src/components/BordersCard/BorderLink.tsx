import Link from 'next/link';
import { Button, Box, useColorModeValue } from "@chakra-ui/react";

interface CountriesProps {
  name: {
    common: string;
  };
  cca3: string;
}

interface BorderLinkProps {
  border: string;
  countries: CountriesProps[];
}

export function BorderLink({ border, countries }: BorderLinkProps) {
  const borderCountries = countries.filter(borders => borders.cca3 === border)
  const borderName = borderCountries.map(border => border.name.common);

  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');
  
  return (
    <Link key={border} href={`/country/${borderName}`} passHref>
      <Box 
        pr='2' 
        pb='1'
        _hover={{transform: "scale(1.1)", transition: '0.5s'}} 
        transition='0.8s'
      >
        <Button minW={24} h={'26px'} bgColor={bg} boxShadow='lg' fontSize='14' borderRadius='4' p='4'>
          {borderName}
        </Button>
      </Box>
    </Link>
  );
}