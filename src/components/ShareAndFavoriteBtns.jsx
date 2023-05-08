import React from 'react';

function ShareAndFavoriteBtns() {
  const handleClick = (event) => {
    event.preventDefault();

    const { name } = event.target;

    if (name === 'shareBtn') {
      // inserir lógica do botão compartilhar
      console.log('compartilhar!');
    } else {
      // inserir lógica do botão favoritar
      console.log('favoritar!');
    }
  };

  return (
    <div>
      <section>
        <button
          data-testid="share-btn"
          onClick={ handleClick }
          name="shareBtn"
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ handleClick }
          name="favoriteBtn"
        >
          Favoritar
        </button>
      </section>
    </div>
  );
}

export default ShareAndFavoriteBtns;
