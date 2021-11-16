import { Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  countriesPerPage: number;
  totalCountries: number;
  curPage: number;
  paginate: (pageNumber: number) => void;
}

const siblingsCount = 1;

function generatePagesArray( from: number, to: number ) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1;
    }).filter(page => page > 0)
}

export function Pagination({ countriesPerPage, totalCountries, paginate, curPage }: PaginationProps) {
  const bg = useColorModeValue('white', 'hsl(209, 23%, 22%)');
  const color = useColorModeValue('gray.600', 'white');

  const lastPage = Math.ceil(totalCountries / countriesPerPage);
    
  const previousPages = curPage > 1 ? generatePagesArray(curPage - 1 - siblingsCount, curPage - 1) : [];

  const nextPages = curPage < lastPage ? generatePagesArray(curPage, Math.min(curPage + siblingsCount, lastPage)) : [];

  return (
    <>
       <Stack
          direction={['column', 'row']}
          pt='8'
          justify='center'
          align='center'
          spacing='6'
        >
          <Stack
            spacing='2'
            direction='row'
          >
            {curPage > (1 + siblingsCount) && (
              <>
                <PaginationItem paginate={paginate} number={1} />
                  {curPage > (2 + siblingsCount) && (
                    <Text color={color} width='8' textAlign='center'>...</Text>
                  )}
              </>
            )}

            {previousPages.length > 0 && previousPages.map(page => {
              return <PaginationItem paginate={paginate} key={page} number={page} />
            })}

            <PaginationItem paginate={paginate} number={curPage} isCurrent/>

            {nextPages.length > 0 && nextPages.map(page => {
              return <PaginationItem paginate={paginate} key={page} number={page} />
            })}

            {(curPage + siblingsCount) < lastPage && (
              <>
                {(curPage + 1 + siblingsCount) < lastPage && (
                  <Text color={color} width='8' textAlign='center'>...</Text>
                )}

                <PaginationItem paginate={paginate} number={lastPage} />
              </>
            )}
          </Stack>
      </Stack>
    </>
  );
}