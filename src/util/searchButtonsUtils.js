import beef from '../images/beef.svg';
import dessert from '../images/dessert.svg';
import breakfast from '../images/breakfast.svg';
import goat from '../images/goat.svg';
import chicken from '../images/chicken.svg';
import all from '../images/All.svg';

const iconFilter = (nameFilter) => {
  switch (nameFilter) {
  case 'Beef':
    return beef;
  case 'Dessert':
    return dessert;
  case 'Breakfast':
    return breakfast;
  case 'Goat':
    return goat;
  case 'Chicken':
    return chicken;
  default:
    return all;
  }
};

export default iconFilter;
