import React, { useEffect, useState } from 'react';
import './style/ContentFavoriteRecipes.css';

import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import LinkCopiedMessage from './LinkCopiedMessage';

const copy = require('clipboard-copy');

function ContentFavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [statusLinkCopied, setStatusLinkCopied] = useState(false);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getFavoriteRecipes.length > 0) {
      setFavoriteRecipes(getFavoriteRecipes);
    }
  }, []);

  const handleShareOrFavorite = (event, type, id) => {
    event.preventDefault();

    const { name } = event.target;

    if (name === 'shareBtn') {
      const url = window.location.href;
      const splitURL = url.split('favorite-recipes');
      const pageLink = `${splitURL[0]}${type}s/${id}`;
      copy(pageLink);
      setStatusLinkCopied(true);
    }

    if (name === 'favoriteBtn') {
      // Lógica do botão desfavoritar!
    }
  };

  return (
    <section>
      {/* Filtros */}
      <section>
        <button
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>

      {
        favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((favoriteRecipe, index) => (
            <section key={ `recipe${index}` }>
              <img
                className="RecipeImage"
                data-testid={ `${index}-horizontal-image` }
                src={ favoriteRecipe.image }
                alt="imagem da receita favoritada"
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {
                  favoriteRecipe.type === 'meal' ? `${favoriteRecipe
                    .nationality} - ${favoriteRecipe.category}`
                    : favoriteRecipe.alcoholicOrNot
                }
              </p>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                { favoriteRecipe.name }
              </h2>
              <div className="ContainerBtns">
                <label className="ShareBtnLabel">
                  <input
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="ShareBtnInput"
                    type="button"
                    name="shareBtn"
                    src={ shareIcon }
                    onClick={
                      (e) => handleShareOrFavorite(e, favoriteRecipe
                        .type, favoriteRecipe.id)
                    }
                  />
                  <img
                    className="ShareBtnIcon"
                    src={ shareIcon }
                    alt="ícone de compartilhar"
                  />
                </label>
                <label className="FavoriteBtnLabel">
                  <input
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    className="FavoriteBtnInput"
                    type="button"
                    value=""
                    src={ blackHeart }
                    name="favoriteBtn"
                    onClick={ handleShareOrFavorite }
                  />
                  <img
                    src={ blackHeart }
                    className="FavoriteBtnIcon"
                    alt="pequeno coração preto, indicando que a receita está favoritada"
                  />
                </label>
              </div>
            </section>
          ))
        )
          : (null)
      }
      {
        statusLinkCopied && <LinkCopiedMessage />
      }
    </section>
  );
}

export default ContentFavoriteRecipes;
