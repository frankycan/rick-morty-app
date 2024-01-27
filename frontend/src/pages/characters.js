import { getCharacters } from "../services/charactersService.js"
import CharactersList from "../components/charactersList.js"
import Pagination from "../components/pagination.js"
import '../styles/characters.css'

import React, { useEffect, useState } from "react";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getCharactersByPage = async () => {
    const { results, info } = await getCharacters(page);
    setCharacters(results);
    setLastPage(info.pages);
  };
  useEffect(() => {
    getCharactersByPage();
  }, [page]);

  const increasePage = () => {
    setPage(page + 1);
  };
  const decreasePage = () => {
    setPage(page - 1);
  };
  return (
    <div>
      <Pagination
        currentPage={page}
        lastPage={lastPage}
        decreasePage={decreasePage}
        increasePage={increasePage}
      />
      <CharactersList characters={characters} />
    </div>
  )
}

export default Characters