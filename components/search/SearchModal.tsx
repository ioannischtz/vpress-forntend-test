import { Kbd, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Select } from '@chakra-ui/select';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import React, { EventHandler, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { HiCursorClick } from 'react-icons/hi';
import { GiClick } from 'react-icons/gi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useRouter } from 'next/router';
import * as qs from 'qs';
import { WritersResponse } from '../../custom_typings/models';
import slugify from 'slugify';
import Flatpickr from 'react-flatpickr';
import { Greek } from 'flatpickr/dist/l10n/gr.js';
import { english } from 'flatpickr/dist/l10n/default.js';

interface SearchModalProps {
  isOpen: boolean;
  writers: WritersResponse[];
  onClose: () => void;
  locale?: string;
  isMobile: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  writers,
  locale,
  isMobile,
}) => {
  const { pathname, push } = useRouter();
  const [searchQ, setSearchQ] = useState<string>('');
  const [writerID, setWriterID] = useState(0);
  const [selectID, setSelectID] = useState(0);
  const [selectVals, setSelectVals] = useState<string[]>([]);

  const [dateInputValue, setDateInputValue] = useState('');
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  const advancedMenu = useDisclosure();

  useEffect(() => {
    setSelectVals(writers?.map((writer) => slugify(writer.name)));
    return () => {};
  }, [writers]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault();
    onClose();

    let whereArr = [];

    if (writerID > 0) {
      whereArr[0] = { 'writer.id': writerID };
      if (startDate) {
        whereArr[1] = { published_at_gte: startDate };
        if (endDate) whereArr[2] = { published_at_lte: endDate };
      } else {
        if (endDate) whereArr[1] = { published_at_lte: endDate };
      }
    } else {
      if (startDate) {
        whereArr[0] = { published_at_gte: startDate };
        if (endDate) whereArr[1] = { published_at_lte: endDate };
      } else {
        if (endDate) whereArr[0] = { published_at_lte: endDate };
      }
    }
    const query = qs.stringify({
      ...(searchQ.length > 0 ? { _q: searchQ } : {}),
      _where: whereArr,
    });

    push(
      { pathname: '/search-page', query: { q: query } },
      { pathname: '/search-page', query: { q: query } },
      {
        locale,
        shallow: pathname === '/search-page',
      }
    );
  };

  const handleOnSelect: React.ChangeEventHandler<HTMLSelectElement> | undefined = (e) => {
    if (e.target.value === 'all-writers') {
      setWriterID(0);
      setSelectID(0);
      return;
    }
    // const id = filterWriterID(writers, e.target.value);
    // const id = selectVals.findIndex((val) => val === e.target.value) + 1;
    const id = selectVals.findIndex((val) => val === e.target.value);
    if (id !== undefined && id !== null) {
      setWriterID(writers[id].id);
      setSelectID(id + 1);
    }
  };
  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="neutral.timberwolf.light">
        <ModalBody py="24px">
          <form onSubmit={onSubmit}>
            <Flex direction="column">
              <FormControl>
                <FormLabel>
                  {locale === 'en' ? 'Search Bar' : 'Μπάρα Αναζήτησης'}
                </FormLabel>
                <SearchBar
                  maxW="100%"
                  borderColor="blackAlpha.300"
                  color="neutral.jet.dark"
                  colorIcon="neutral.jet.dark"
                  hoverC="semantic.blue.dark"
                  onClose={onClose}
                  setSearchQ={setSearchQ}
                  locale={locale}
                  initialValue={searchQ}
                />
                <FormHelperText>
                  <Flex
                    color="blackAlpha.800"
                    direction="row"
                    alignItems="flex-end"
                    pb="12px"
                  >
                    {locale === 'en' ? ' Click' : ' Κλικ '}
                    <span>&nbsp;</span>
                    {isMobile ? <GiClick /> : <HiCursorClick />}
                    <span>&nbsp;</span>
                    {!isMobile && (
                      <>
                        {locale === 'en' ? ' or press' : '  ή πάτα '}
                        <span>&nbsp;</span>
                        <span>
                          <Kbd
                            bgColor="blackAlpha.700"
                            borderColor="blackAlpha.500"
                            color="whiteAlpha.900"
                            flexGrow="unset"
                          >
                            Enter
                          </Kbd>
                        </span>
                      </>
                    )}
                  </Flex>
                </FormHelperText>
              </FormControl>
              <Flex direction="row" justifyContent="flex-end" mt="12px">
                <Button
                  variant="ghost"
                  rightIcon={
                    advancedMenu.isOpen ? <MdExpandLess /> : <MdExpandMore />
                  }
                  onClick={advancedMenu.onToggle}
                >
                  {locale === 'en' ? 'Advanced Search' : 'Σύνθετη Αναζήτηση'}
                </Button>
              </Flex>

              <Flex
                display={advancedMenu.isOpen ? 'flex' : 'none'}
                direction={['column', 'column', 'row', 'row', 'row']}
                px="8px"
                py="24px"
                justifyContent="space-between"
              >
                <FormControl pr={['0', '0', '12px', '12px', '12px']} py="8px">
                  <FormLabel>
                    {locale === 'en'
                      ? 'Select Writer'
                      : 'Διάλεξε Συντάκτρια/κτη'}
                  </FormLabel>
                  <Select
                    _hover={{
                      borderColor: 'blackAlpha.600',
                      cursor: 'pointer',
                    }}
                    onChange={handleOnSelect}
                    defaultValue={
                      writerID > 0 ? selectVals[selectID - 1] : 'all-writers'
                    }
                  >
                    <option key="all" value="all-writers">
                      {locale === 'en'
                        ? 'All writers'
                        : 'Όλοι/ες οι Συντάκτες/ριες'}
                    </option>
                    {writers.map((writer, index) => (
                      <option key={writer.slug} value={selectVals[index]}>
                        {writer.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl pl={['0', '0', '12px', '12px', '12px']} py="8px">
                  <FormLabel>
                    {locale === 'en'
                      ? 'Published at (Date Range):'
                      : 'Δημοσιεύθηκε (Εύρος Ημ/νιων):'}
                  </FormLabel>
                  <Flatpickr
                    defaultValue={
                      dateInputValue.length < 0
                        ? locale === 'en'
                          ? 'Pick a date range'
                          : 'Διάλεξε Εύρος Ημ/νιων'
                        : dateInputValue
                    }
                    onChange={(selectedDates: Date[], dateStr) => {
                      setDateInputValue(dateStr);

                      if (selectedDates[0]) {
                        const start = selectedDates[0]
                          .toISOString()
                          .substring(0, 10);
                        setStartDate(start);
                      }
                      if (selectedDates[1]) {
                        const end = selectedDates[1]
                          .toISOString()
                          .substring(0, 10);
                        setEndDate(end);
                      }
                    }}
                    options={{
                      enableTime: false,
                      mode: 'range',
                      dateFormat: 'Y-m-d',
                      locale: locale === 'en' ? english : Greek,
                    }}
                    render={({ defaultValue, value, ...props }, ref) => {
                      return (
                        <Input
                          placeholder={defaultValue}
                          ref={ref}
                          borderColor="blackAlpha.300"
                          color="neutral.jet.dark"
                          _hover={{
                            borderColor: 'blackAlpha.600',
                            cursor: 'pointer',
                          }}
                          value={value}
                        />
                      );
                    }}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
