import { Text, Box, Heading, useColorModeValue  } from '@chakra-ui/react';
import Link from 'next/link';

interface CountriesInfo {
  name: {
    common: string;
  };
  region: string;
  capital: string;
  flags: {
    svg: string;
  };
  population: number;
}

interface CountryCardProps {
  countries: CountriesInfo[];
}

export function CountryCard( { countries }: CountryCardProps ) {
  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');

  return (
    <>
      {countries.map(country => (
        <Box key={country.name.common} mx='auto' minW='288px'>
          <Link href={`/country/${country.name.common}`}>
          <a style={{maxWidth: '288px'}}>
            <Box maxW='72'>
              <Box 
                backgroundImage={country.flags.svg} 
                backgroundPosition='center' 
                backgroundSize='cover'
                backgroundRepeat='no-repeat' 
                borderTopRadius='md' 
                height='164px' 
              />
              <Box pl='6' pt='8' pb='8' backgroundColor={bg} borderBottomRadius='md'>
                <Heading marginBottom='4' fontSize='18px'>{country.name.common}</Heading>
                <Text as='strong' display='block'>{`Population: `}<Text as='span' fontWeight='600'>{country.population.toLocaleString()}</Text></Text>
                <Text as='strong' display='block'>{`Region: `}<Text as='span' fontWeight='600'>{country.region}</Text></Text>
                <Text as='strong' display='block'>{`Capital: `}<Text as='span' fontWeight='600'>{country.capital}</Text></Text>
              </Box>
            </Box>
          </a>
        </Link>
        </Box>
      ))}
    </>
  );
}