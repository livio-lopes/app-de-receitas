import React, { useEffect, useState } from 'react';
import './style/ContentFavoriteRecipes.css';

import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ContentFavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (getFavoriteRecipes.length > 0) {
      setFavoriteRecipes(getFavoriteRecipes);
    }
  }, []);

  const handleShareOrFavorite = (event) => {
    event.preventDefault();

    const { name } = event.target;

    if (name === 'shareBtn') {
      const pageLink = window.location.href;
      copy(pageLink);
    } else {
      // lógica do botão desfavoritar
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
            <section key={ `recipe${index + 1}` }>
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
                <label>
                  <input
                    data-testid={ `${index}-horizontal-share-btn` }
                    className="ShareBtnInput"
                    type="button"
                    name="shareBtn"
                    src={ shareIcon }
                    onClick={ handleShareOrFavorite }
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
    </section>
  );
}

export default ContentFavoriteRecipes;
