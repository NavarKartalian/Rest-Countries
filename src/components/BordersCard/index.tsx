import { Button, Flex, Text, Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { BorderLink } from "./BorderLink";

interface BordersCardProps {
  borders: [];
}

interface CountriesProps {
  name: {
    common: string;
  };
  cca3: string;
}

export function BordersCard({ borders }: BordersCardProps) {
  const [ countries, setCountries ] = useState<CountriesProps[]>([]);

  useEffect(() => {
    api.get('/all').then(({data}) => {
      setCountries(data);
    })
  }, [])

  return (
    <>
      <Flex mt={['8', '12', '16']} direction={['column', 'column', 'row']}>
        <Text as='strong' mb={['4', '4', '0']}>{`Border Countries:`}</Text>
          <Flex flexWrap='wrap' pl={['0', '0', '2']}>
            {borders.map(border => (
              <BorderLink key={border} border={border} countries={countries} />
            ))}
          </Flex>
      </Flex>
    </>
  );
}