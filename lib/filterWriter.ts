import { WritersResponse } from '../custom_typings/models';

export const filterWriterID = (writers: WritersResponse[], name: string) => {
  for (let i = 0; i < writers.length; i++) {
    if (writers[i].name === name) return writers[i].id;
  }
  return null;
};

function filterWriter(writers: WritersResponse[], writerID) {
  for (let i = 0; i < writers.length; i++) {
    if (writers[i].id === writerID) return writers[i];
  }
  return null;
}

export default filterWriter;
