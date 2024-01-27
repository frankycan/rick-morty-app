import useAuth from "../hooks/useAuth.js"
import React from "react"
import { Link } from "react-router-dom"
import "../styles/characterSummary.css"

const CharacterSummary = ({ character }) => {
  const { userInfo } = useAuth();
  const isFavorite = (characterId) => {
    if (userInfo.favoriteCharacters?.includes(characterId)) {
      return (
        <li>
          <div className="heart"></div>
        </li>
      );
    }
    return <></>;
  };

  return (
    <Link className="characters-element" to={"/characters/" + character.id}>
      <div className="characters-element__container">
        <img src={character.image} alt={character.name} />
        <ul className="characters-element__container__description">
          <li>{character.name}</li>
          <li>{character.species}</li>
          <li>{character.status}</li>
          {isFavorite(character.id)}
        </ul>
      </div>
    </Link>
  );
};

export default CharacterSummary;