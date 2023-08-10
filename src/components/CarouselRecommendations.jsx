import { Carousel, Row, Col } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CarouselRecommendations.module.css';

function CarouselRecommendations() {
  const [items, setItems] = useState([]);

  const recommendationMeals = async () => {
    const baseURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataMeals = await results.json();

      const limitAPI = 6;
      const itemsMeals = [];
      for (let i = 0; i < limitAPI; i += 2) {
        const meals = {
          img1: dataMeals.meals[i].strMealThumb,
          title1: dataMeals.meals[i].strMeal,
          img2: dataMeals.meals[i + 1].strMealThumb,
          title2: dataMeals.meals[i + 1].strMeal,
        };
        itemsMeals.push(meals);
      }
      setItems(itemsMeals);
    } catch (error) {
      console.log(error);
    }
  };

  const recommendationDrinks = async () => {
    const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    try {
      const results = await fetch(baseURL);
      const dataDrinks = await results.json();
      // criar item do carousel de bebidas na tela de carnes
      // 0, 1, 2, 3, 4, 5
      const limitAPI = 6;
      const itemsDrinks = [];
      for (let i = 0; i < limitAPI; i += 2) {
        const drink = {
          img1: dataDrinks.drinks[i].strDrinkThumb,
          title1: dataDrinks.drinks[i].strDrink,
          img2: dataDrinks.drinks[i + 1].strDrinkThumb,
          title2: dataDrinks.drinks[i + 1].strDrink,
        };
        itemsDrinks.push(drink);
      }
      setItems(itemsDrinks);
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const actualPath = location.pathname;

  const chooseRecommendation = useCallback(() => {
    if (actualPath.includes('/meals')) {
      recommendationDrinks();
    }

    if (actualPath.includes('/drinks')) {
      recommendationMeals();
    }
  }, [actualPath]);

  useEffect(() => {
    chooseRecommendation();
  }, [chooseRecommendation]);

  return (
    <Carousel className={ styles.ifood__carousel }>
      {items.length > 0 && items.map((item, index) => (
        <Carousel.Item key={ index }>
          <Row className={ styles.ifood__carouselRow }>
            <Col className="ifood-carousel-col">
              <div
                className={ styles.ifood__carouselImgContainer }
                data-testid={ `${index * 2}-recommendation-card` }
              >
                <img
                  className={ styles.ifood__carouselImg }
                  src={ item.img1 }
                  alt={ `Slide ${index}` }
                />
                <h5
                  data-testid={ `${index * 2}-recommendation-title` }
                >
                  {item.title1}

                </h5>
              </div>
            </Col>
            <Col className={ styles.ifood__carouselCol }>
              <div
                className={ styles.ifood__carouselImgContainer }
                data-testid={ `${index * 2 + 1}-recommendation-card` }
              >
                <img
                  className={ styles.ifood__carouselImg }
                  src={ item.img2 }
                  alt={ `Slide ${index}` }
                />
                <h5
                  data-testid={
                    `${index * 2 + 1}-recommendation-title`
                  }
                >
                  {item.title2}

                </h5>
              </div>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselRecommendations;
