import React, { useContext } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Footer from '../components/Footer';
import LinkCopiedMessage from '../components/LinkCopiedMessage';
import { AppContext } from '../providers/AppProvider';

export default function DoneRecipes() {
  const { statusLinkCopied } = useContext(AppContext);
  const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(getLocalStorage);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {
        statusLinkCopied === true ? (
          <LinkCopiedMessage />
        )
          : null
      }
      <div>
        {
          getLocalStorage.length > 0 ? (getLocalStorage.map((each, index) => (
            each.type === 'meal' ? (
              <CardDoneRecipes
                key={ each + index }
                name={ each.name }
                image={ each.image }
                nationality={ each.nationality }
                category={ each.category }
                doneDate={ each.doneDate }
                index={ index }
                tag={ each.tags }
                type={ each.type }
                id={ each.id }
              />
            ) : (
              <CardDoneRecipes
                key={ each + index }
                name={ each.name }
                image={ each.image }
                nationality={ each.nationality }
                category={ each.category }
                doneDate={ each.doneDate }
                index={ index }
                tag={ each.tags }
                alcoholicOrNot={ each.alcoholicOrNot }
                type={ each.type }
                id={ each.id }
              />
            )
          ))
          ) : (
            <h1> LOCAL STORAGE VAZIO MEU PRINCIPE, VOLTE QUANDO TIVER ALGO AQUI </h1>
          )
        }
      </div>
      <Footer />
    </div>
  );
}
