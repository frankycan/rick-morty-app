import React, { useEffect, useState } from "react"
import { getCharacters } from "../services/charactersService.js"
import CharactersList from "../components/charactersList.js"
import Pagination from "../components/pagination.js"
import { useSearchParams  } from 'react-router-dom'
import '../styles/characters.css'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(urlPage)
  const [lastPage, setLastPage] = useState(0)

  const getCharactersByPage = async () => {
    const { results, info } = await getCharacters(urlPage)
    setCharacters(results)
    setLastPage(info.pages)
  };
  useEffect(() => {
    getCharactersByPage()
    setSearchParams({ page: urlPage })
  }, [page]);

  const increasePage = () => {
    setSearchParams({ page: page + 1 })
    setPage(page + 1);
  };
  const decreasePage = () => {
    setSearchParams({ page: page - 1 })
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