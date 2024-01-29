import useAuth from "../hooks/useAuth.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../store/slices/authSlice.js";

const CharacterView = ({ character }) => {
  const { userInfo } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (character)
      setIsFavorite(userInfo.favoriteCharacters.includes(character.id));
  });

  const updateFavorites = () => {
    let favoriteCharacters = [...userInfo.favoriteCharacters];
    let isFavorite = favoriteCharacters.includes(character.id);
    if (isFavorite) {
      favoriteCharacters = favoriteCharacters.filter(function (value) {
        return value !== character.id;
      });
    } else {
      favoriteCharacters.push(character.id);
    }
    setIsFavorite(isFavorite);
    dispatch(
      userUpdate({
        data: { favoriteCharacters: favoriteCharacters },
      })
    );
  };
  const favoriteButton = () => {
    if (isFavorite) {
      return (
        <button onClick={updateFavorites}>Remove from favorites :(</button>
      );
    }
    return <button onClick={updateFavorites}>Add to favorites!</button>;
  };

  const renderCharacter = () => {
    if (character) {
      const { name, gender, location, origin, species, status, type } =
        character;
      return (
        <ul>
          <li>
            <strong>Name: </strong>
            {name}
          </li>
          <li>
            <strong>Gender: </strong>
            {gender}
          </li>
          <li>
            <strong>Location: </strong>
            {location.name}
          </li>
          <li>
            <strong>Origin: </strong>
            {origin.name}
          </li>
          <li>
            <strong>Species: </strong>
            {species}
            <ul>
              <li>{type || <i>No subspecies</i>}</li>
            </ul>
          </li>

          <li>
            <strong>Status: </strong>
            {status}
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      <img
        src={character?.image}
        alt={character?.name}
        className="background-image"
      />
      <div className="container">
        {renderCharacter()} {favoriteButton()}
      </div>
    </>
  );
};
export default CharacterView;