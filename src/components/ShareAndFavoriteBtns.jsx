import React, { useContext } from 'react';
import './style/ShareAndFavoriteBtns.css';
import shareIcon from '../images/shareIcon.svg';
import { AppContext } from '../providers/AppProvider';
import LinkCopiedMessage from './LinkCopiedMessage';
import { RecipeDetailsContext } from '../providers/RecipeDetailsProvider';

const copy = require('clipboard-copy');

function ShareAndFavoriteBtns() {
  const contextValue = useContext(AppContext);
  const { statusLinkCopied } = contextValue;
  const { objectDetails } = useContext(RecipeDetailsContext);

  const handleClick = (event) => {
    event.preventDefault();
    console.log('objeto em share:', objectDetails);

    const { name } = event.target;
    const { setStatusLinkCopied } = contextValue;

    if (name === 'shareBtn') {
      // lógica do botão compartilhar
      const pageLink = window.location.href;
      copy(pageLink);
      setStatusLinkCopied(true);
    }
    if (name === 'favoriteBtn') {
      // inserir lógica do botão favoritar
      console.log('favoritar!');
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

export default ShareAndFavoriteBtns;
