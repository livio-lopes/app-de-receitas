import React from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';

export default function DoneRecipes() {
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      <CardDoneRecipes />
    </div>
  );
}
