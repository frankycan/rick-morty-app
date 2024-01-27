import React from "react"
import CharacterSummary from "./characterSummary.js"
import "../styles/charactersList.css"

const CharactersList = ({ characters }) => {
  const characterElements = [];
  characters.forEach((character, index) => {
    characterElements.push(
      <CharacterSummary key={index} character={character} />
    );
  });
  return <div className="characters-list">{characterElements}</div>;
};

export default CharactersList;