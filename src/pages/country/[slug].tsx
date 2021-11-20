import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import ErrorPage from 'next/error';
import { Box, Button, Flex, Heading, Icon, Text, useColorModeValue, BoxProps } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { BordersCard } from "../../components/BordersCard";
import Head from 'next/head';

interface CountryProps {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  nativeName: string;
  region: string;
  subregion: string;
  capital: string;
  tld: string;
  borders: [];
}

interface CountryResults {
  result: CountryProps[];
  formattedCurrencies: string;
  formattedLanguages: string;
  name: string;
}

export default function Country({ result, formattedCurrencies, formattedLanguages, name }: CountryResults) {
  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');

  if(!result) {
    return <ErrorPage statusCode={404} />
  }

  const MotionBox = motion<BoxProps>(Box);

  return (
    <>
      <Head>
        <title>{`${name} | Where in the world`}</title>
      </Head>

      <Flex maxW='1440px' mx='auto' padding='8' mt={['8', '16', '16']} direction='column'>
        <Link href='/' passHref>
            <Button w={36} bgColor={bg} boxShadow='md'> 
                <Icon as={FiArrowLeft} fontSize='20' mr='2' />
                Back
            </Button>
        </Link>
        
        <Box mt='20'>
          {result.map(country => {
            return (
              <Flex key={country.name.common} direction={['column', 'column','row']}>
                <MotionBox 
                  backgroundImage={country.flags.svg} 
                  w='100%'
                  maxW={['580px', '580px', '650px']} 
                  height={['240px', '320px', '380px']} 
                  backgroundPosition='center'
                  bgSize='cover'
                  mx='auto'
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: '50%' }}
                  transition={{ duration: '1' }}
                  />
                <Box pt='12' pl={['0', '8', '16', '32']} maxW='850px' pr='4'>
                  <Heading mb='8'>{country.name.common}</Heading>
                  <Flex lineHeight='8' direction={['column', 'column', 'row']}>
                    <Box>
                      <Text as='strong' display='block'>{`Region: `}<Text as='span' fontWeight='300'>{country.region}</Text></Text>
                      <Text as='strong' display='block'>{`Sub Region: `}<Text as='span' fontWeight='300'>{country.subregion}</Text></Text>
                      <Text as='strong' display='block'>{`Capital: `}<Text as='span' fontWeight='300'>{country.capital}</Text></Text>
                    </Box>

                    <Box maxW='440px' pl={['0', '0', '20', '40']} mt={['8', '8', '0', '0']} textAlign='left'>
                      <Text as='strong' display='block'>{`Top Level Domain: `}<Text as='span' fontWeight='300'>{country.tld}</Text></Text>
                        <Text as='strong' display='block'>
                          {`Currencies: `}
                          <Text as='span' fontWeight='300'>{formattedCurrencies}</Text>
                        </Text>
                      <Text as='strong' display='block'>
                        {`Languages: `}
                        <Text as='span' fontWeight='300'>{formattedLanguages}</Text>
                      </Text>
                    </Box>
                  </Flex>

                  <Box>
                    { !! Array.isArray(country.borders) && <BordersCard borders={country.borders} />}
                  </Box>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
      paths: [],
      fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params;

    const response = await api.get(`/name/${slug}?fullText=true`);
    const result = response.data

    const name = result.map(name => {
      return name.name.common
    })

    const currencies = result.map(currency => {
      return Object.keys(currency.currencies).map(res => {
        return currency.currencies[res].name
      })
    })

    const formattedCurrencies = currencies.flatMap(res => {
      return res.join(', ')
    })

    const languages = result.map(language => {
      return Object.keys(language.languages).map(res => {
        return language.languages[res]
      })
    })
    const formattedLanguages = languages.flatMap(res => {
      return res.join(', ')
    });

    return {
      props: {
        result,
        name,
        formattedCurrencies,
        formattedLanguages
      }
    }
  } catch {
    return {
      props: {}
    }
  }
}