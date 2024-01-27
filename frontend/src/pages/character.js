import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCharacter } from "../services/charactersService.js"
import CharacterView from "../components/characterView.js"

export default function Character() {
  let { characterId } = useParams();
  const [character, setCharacter] = useState();
  useEffect(() => {
    setCharacterFromApi();
  }, []);
  const setCharacterFromApi = async () => {
    const character = await getCharacter(characterId);
    setCharacter(character.result);
  };

  return (
    <main>
      <CharacterView character={character} />
    </main>
  );
}