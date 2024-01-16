# Random Pokémon generator

## Overview

This project started with Udemy's [The Ultimate 2023 Fullstack Web Development Bootcamp](https://www.udemy.com/course/the-ultimate-fullstack-web-development-bootcamp/) for the 'JavaScript 201' course, and I have improved it further to make it responsive. The aim was to create a website that randomly sorts a Pokemón by its number and displays some of its properties.

To get the pokémon information, I am using [PokéAPI](https://pokeapi.co/). I have no rights to any images used here.

The CSS code for the button was taken from [CSS Scan](https://getcssscan.com/?ref=beautifulbuttons_header_logo).

For any suggestions for improvements, contact me!

### Limitations
To get the weakness and strengths of each pokémon ("super effective against" and "weak against") we need to resort to the pokémon's type, and not the pokémon itself. Since I did not know this information was available, I created objects inside the JavaScript code to substitute that.  However, this means that the weaknesses and strengths displayed only relate to the first pokémon type listed, which can be incorrect in the case of multi-type pokémon.

