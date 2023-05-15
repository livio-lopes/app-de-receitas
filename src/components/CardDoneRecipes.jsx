import React from 'react';
import shareIcon from '../images/shareIcon.svg';

// import propTypes from 'prop-types';

export default function CardDoneRecipes() {
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(getLocalStorage);
  return (
    <div>
      {
        getLocalStorage.length > 0 ? (getLocalStorage.map((each, index) => (
          each.type === 'meal' ? (
            <div key={ each + index }>
              <h1>ISSO AQUI É COMIDA</h1>
              <h2 data-testid={ `${index}-horizontal-name` }>
                { each.name }
              </h2>
              <img
                src={ each.image }
                alt="nada com nada"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${each.nationality} - ${each.category}`}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { each.doneDate }
              </p>
              <h1>{index}</h1>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="Ícone de compartilhamento" />
                Compartilhar
              </button>
              {
                each.tags
              && each.tags.length > 0
              && each.tags.map((eachTag, secondIndex) => (
                <p
                  data-testid={ `${index}-${eachTag}-horizontal-tag` }
                  key={ eachTag + secondIndex }
                >
                  { eachTag }
                </p>
              ))
              }
            </div>
          ) : (
            <div key={ each + index }>
              <h1>ISSO AQUI É BEBIDA</h1>
              <h2 data-testid={ `${index}-horizontal-name` }>
                { each.name }
              </h2>
              <img
                src={ each.image }
                alt="nada com nada"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                { each.alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { each.doneDate }
              </p>
              <h1>{index}</h1>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="Ícone de compartilhamento" />
                Compartilhar
              </button>
              {
                each.tags
            && each.tags.length > 0
            && each.tags.map((eachTag, secondIndex) => (
              <p
                data-testid={ `${index}-${eachTag}-horizontal-tag` }
                key={ eachTag + secondIndex }
              >
                { eachTag }
              </p>
            ))
              }
            </div>
          )
        ))
        ) : (
          <h1> LOCAL STORAGE VAZIO MEU PRINCIPE, VOLTE QUANDO TIVER ALGO AQUI </h1>
        )
      }
    </div>
  );
}
