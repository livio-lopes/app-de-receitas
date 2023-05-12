import React from 'react';
// import propTypes from 'prop-types';

export default function CardDoneRecipes() {
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(getLocalStorage);
  return (
    <div>
      {
        getLocalStorage.length > 0 ? (getLocalStorage.map((each, index) => (
          <div key={ each + index }>
            <img
              src={ each.image }
              alt="nada com nada"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { each.category }
            </p>
            <h5 data-testid={ `${index}-horizontal-name` }>
              { each.title }
            </h5>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { each.doneDate }
            </p>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              botão de compartilhar
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
        ))
        ) : (
          <h1> LOCAL STORAGE VAZIO MEU PRINCIPE, VOLTE QUANDO TIVER ALGO AQUI </h1>
        )
      }
    </div>
  );
}

// CardDoneRecipes.propTypes = {
//   arrayLocalStorage: propTypes.arrayOf(
//     propTypes.shape({
//       id: propTypes.string.isRequired,
//       type: propTypes.string.isRequired,
//       nationality: propTypes.string,
//       category: propTypes.string,
//       alcoholicOrNot: propTypes.string,
//       name: propTypes.string.isRequired,
//       image: propTypes.string.isRequired,
//       doneDate: propTypes.string.isRequired,
//       tags: propTypes.arrayOf(propTypes.string),
//     }),
//   ).isRequired,
// };
