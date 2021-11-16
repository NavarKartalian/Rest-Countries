import { Grid } from "@chakra-ui/react";
import { memo } from "react";
import { CountryCard } from "../CountryCard";

interface CountryListProps {
  countriesInfo: CountriesInfoProps[];
}

interface CountriesInfoProps {
  name: {
    common: string;
  };
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
  };
}

function CountryListComponent({ countriesInfo }: CountryListProps) {
  return (
    <Grid 
      templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} 
      gridRowGap={12} 
      gridColumnGap={2}
      >
      <CountryCard countries={countriesInfo} />
    </Grid>
  );
}

export const CountryList = memo(CountryListComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.countriesInfo, nextProps.countriesInfo);
});