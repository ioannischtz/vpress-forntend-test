import {
  Input,
  InputGroup,
  InputGroupProps,
  InputRightAddon,
} from '@chakra-ui/input';
import React from 'react';
import SearchButton from './SearchButton';

interface SearchBarProps {
  colorIcon: string;
  hoverC: string;
  locale?: string;
  initialValue: string;
  setSearchQ: (e: string) => void;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps & InputGroupProps> = ({
  hoverC,
  colorIcon,
  locale,
  setSearchQ,
  initialValue,
  onClose = () => {},
  ...props
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchQ(e.target.value);
  return (
    <InputGroup maxW="80%" size="md" {...props}>
      <Input
        aria-label="search-bar"
        name="q"
        placeholder={locale === 'en' ? 'Search' : 'Αναζήτηση'}
        onChange={handleChange}
        value={initialValue}
      />

      <InputRightAddon
        children={
          <SearchButton
            color={colorIcon}
            hoverC={hoverC}
            onclick={(e) => {}}
            aria-label="submit-search"
            type="submit"
            size={1.5}
          />
        }
      />
    </InputGroup>
  );
};

export default SearchBar;
