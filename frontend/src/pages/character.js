import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCharacter } from "../services/charactersService.js"
import CharacterView from "../components/characterView.js"

export default function Character() {
  let { characterId } = useParams();
  const [character, setCharacter] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    setCharacterFromApi();
  }, []);
  const setCharacterFromApi = async () => {
    try {
      const character = await getCharacter(characterId);
      if (character)
        setCharacter(character.result);
    } catch (error) {
      navigate('/404')
    }
  };

  return (
    <main>
      <CharacterView character={character} />
    </main>
  );
}