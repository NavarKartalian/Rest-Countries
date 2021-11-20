import { useEffect, useState } from "react";
import ErrorPage from 'next/error';
import { api } from "../services/api";
import { Stack, Center, Icon, Input, InputGroup, InputLeftElement, Flex, useColorModeValue } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
import { CountryList } from "../components/CountryList";
import Head from 'next/head';
import { GetStaticProps } from "next";
import { Pagination } from "../components/Pagination";

interface CountriesInfoProps {
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

interface CountriesResults {
  result: CountriesInfoProps[];
}

export default function Home({ result }: CountriesResults) {
  const [ countriesInfo, setCountriesInfo ] = useState<CountriesInfoProps[]>(result);
  const [ search, setSearch ] = useState('');
  const [ error, setError ] = useState(false);
  const [ region, setRegion ] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countriesInfo.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');
  const color = useColorModeValue('gray.600', 'white');

  useEffect(() => {
    if(search === '') {
      api.get('/all').then(({data}) => {
        setCountriesInfo(data);
        setError(false);
      })
    }

    if (!search.trim() || search.length < 2) {
      return;
    }

    api.get(`/name/${search}`).then(({data}) => {
      setCountriesInfo(data);
      setCurrentPage(1);
      setError(false);
    }).catch((err) => {
      if(err.response.status === 404) {
        setError(true);
      }
    })
  }, [search]);

  useEffect(() => {
    if(region === '') {
      return;
    }

    api.get(`/region/${region}`).then(({data}) => {
      setCountriesInfo(data);
      setCurrentPage(1);
      setError(false);
    }).catch((err) => {
      if(err.response.status === 404) {
        setError(true);
      }
    })
  }, [region])

  if(!result) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Home | Where in the world</title>
      </Head>

      <Stack
        maxW='1356px'
        mx='auto'
        mt={'8'}
        p={'8'}
        direction='column'
      >
        <Flex mb={['8', '12']} direction={['column', 'column', 'row']} justify='space-between'>
          <InputGroup bgColor={bg} maxW='480px' borderRadius='8' size='lg' mb={['4', '4', '0']}>
            <InputLeftElement
              pointerEvents="none"
              color={color}
            >
              <Icon as={FiSearch} fontSize='20' color={color} />
            </InputLeftElement>
            <Input placeholder="Search for a country..." onChange={e => setSearch(e.target.value)} value={search} />
          </InputGroup>

          <Menu>
            <MenuButton 
              as={Button} 
              backgroundColor={bg} 
              rightIcon={<BiChevronDown />} 
              h='48px' 
              maxW='170px'
            >
              Filter by Region
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight='semibold' onClick={() => setRegion('Africa')}>Africa</MenuItem>
              <MenuItem fontWeight='semibold' onClick={() => setRegion('Americas')}>Americas</MenuItem>
              <MenuItem fontWeight='semibold' onClick={() => setRegion('Asia')}>Asia</MenuItem>
              <MenuItem fontWeight='semibold' onClick={() => setRegion('Europe')}>Europe</MenuItem>
              <MenuItem fontWeight='semibold' onClick={() => setRegion('Oceania')}>Oceania</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        { !! !error && <CountryList countriesInfo={currentCountries} /> }
        { !! error && 
          <Center 
            align='center' 
            h='600px' 
            fontSize='22' 
            fontWeight='bold'
          >
            Sorry, we could not find what you are searching for 😞
          </Center> 
        }
        <Pagination 
          countriesPerPage={countriesPerPage}
          curPage={currentPage}
          totalCountries={countriesInfo.length}
          paginate={paginate} 
        />
      </Stack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get('/all');
    const result = response.data;

    return {
      props: {
        result,
      }
    }
  } catch {
    return {
      props: {},
    }
  }
}