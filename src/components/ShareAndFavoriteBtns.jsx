import React, { useContext } from 'react';
import propTypes from 'prop-types';
import './style/ShareAndFavoriteBtns.css';
import shareIcon from '../images/shareIcon.svg';
import { AppContext } from '../providers/AppProvider';
import LinkCopiedMessage from './LinkCopiedMessage';

const copy = require('clipboard-copy');

function ShareAndFavoriteBtns({ recipe }) {
  const contextValue = useContext(AppContext);
  const { statusLinkCopied } = contextValue;

  // console.log(title); não está retornando nada
  const handleClick = (event) => {
    event.preventDefault();
    // console.log('objeto em share:', recipe);

    const { name } = event.target;
    const { setStatusLinkCopied } = contextValue;

    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')); // array de objetos(receitas favoritadas)

    if (name === 'shareBtn') {
      // lógica do botão compartilhar
      const pageLink = window.location.href;
      copy(pageLink);
      setStatusLinkCopied(true);
    }

    if (name === 'favoriteBtn' && getFavoriteRecipes) {
      // lógica do botão favoritar
      const objectFound = getFavoriteRecipes.some((recipeFound) => recipeFound
        .id === recipe[0].id); // verifica se o objeto já existe na lista

      if (objectFound === false) {
        // caso o objeto ainda não exista no localStorage
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...getFavoriteRecipes, ...recipe]));
      }
    } else if (name === 'favoriteBtn') {
      // caso o objeto já exista no localStorage
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
    }
  };

  return (
    <div>
      <section>
        <button
          data-testid="share-btn"
          type="submit"
          name="shareBtn"
          onClick={ handleClick }
        >
          <img
            className="ShareIcon"
            src={ shareIcon }
            alt="ícone de compartilhar"
          />
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ handleClick }
          name="favoriteBtn"
        >
          Favoritar
        </button>
      </section>

      {/* Mensagem exibida no click do botão share */}
      {
        statusLinkCopied === true ? (
          <LinkCopiedMessage />
        )
          : null
      }
    </div>
  );
}

ShareAndFavoriteBtns.propTypes = {
  recipe: propTypes.shape({
    idFood: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    categoryText: propTypes.string.isRequired,
    instructionsText: propTypes.string.isRequired,
    youtubeVideoID: propTypes.string.isRequired,
    alcoholic: propTypes.string.isRequired,
  }).isRequired || ({
    idFood: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    categoryText: propTypes.string.isRequired,
    instructionsText: propTypes.string.isRequired,
    youtubeVideoID: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
  }).isRequired,
}.isRequired;

export default ShareAndFavoriteBtns;
