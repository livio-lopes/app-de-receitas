import beef from '../images/beef.svg';
import dessert from '../images/dessert.svg';
import breakfast from '../images/breakfast.svg';
import goat from '../images/goat.svg';
import chicken from '../images/chicken.svg';
import cocoa from '../images/cocoa.svg';
import drink from '../images/drink.svg';
import cocktail from '../images/cocktail.svg';
import shake from '../images/shake.svg';
import other from '../images/other.svg';
import all from '../images/All.svg';

const listIcons = [
  { name: 'Beef', icon: beef },
  { name: 'Dessert', icon: dessert },
  { name: 'Breakfast', icon: breakfast },
  { name: 'Goat', icon: goat },
  { name: 'Chicken', icon: chicken },
  { name: 'All', icon: all },
  { name: 'Ordinary Drink', icon: drink },
  { name: 'Cocktail', icon: cocktail },
  { name: 'Shake', icon: shake },
  { name: 'Other / Unknown', icon: other },
  { name: 'Cocoa', icon: cocoa },
];

const iconFilter = (nameIcon) => listIcons.find((icon) => icon.name === nameIcon).icon;

export default iconFilter;
