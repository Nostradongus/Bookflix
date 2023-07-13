<p align="center"><img src="./public/images/readme_title.PNG" alt="Bookflix title" width="800" height="275"><center>

Bookflix is an electronic commerce application for movies and electronic books (e-books). It serves as a web application for users to view, purchase, and review movies and e-books around the world.

<b> Disclaimer: The web application does not really contain the movies and electronic books. The purpose of the web application is to simulate the features coded as part of the project requirement for CCAPDEV. </b>

## Authors

- <b> Canicon, Jan Ambro </b> (jan_canicon@dlsu.edu.ph)
- <b> Jadie, Joshue Salvador </b> (joshue_jadie@dlsu.edu.ph)

## Deployed Web Application Link (Heroku)

- https://bookflix-p3.herokuapp.com

## Prerequisites

- [Node.js](https://nodejs.dev/download)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)  
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [hbs](https://www.npmjs.com/package/hbs)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)

## Sample Features

Below are some of the features that each user can experience while using the web application:

- <b> Create Review Post </b> - A user may make a post on a specific e-book or movie indicating his or her thoughts about it. A created review post contains a star rating (0-5) and an optional text post containing the user's comments.
- <b> Edit Review Post </b> - The user that created the review post on an item can edit it at any point in time.
- <b> Delete Review Post </b> - Users can choose to delete reviews they add to items through the corresponding item's page.
- <b> Favorite Item </b> - Users can add an item to their favorite item list so that they can view it later at any given time.
- <b> Unfavorite Item </b> - Users can choose to remove an item from their lists through the item's page.
- <b> Add Item to Cart </b> - Users can store an item that they will purchase to their local cart.
- <b> Delete Item from Cart </b> - Users can remove an item from their local cart when necessary.
- <b> Checkout and Buy Item/s from Cart </b> - Users can proceed to purchase the items stored in their local cart.

## Running the application locally

1. Clone the repository either by downloading the contents of the repository [here](https://github.com/DLSU-CCAPDEV/2021T2-G02/archive/main.zip), or using the command below (<b>Note: git should be installed in your system for this to work</b>).

```
git clone https://github.com/DLSU-CCAPDEV/2021T2-G02.git
```

2. Open command prompt (cmd).
3. Change directory and navigate to where the web application's folder was placed in your system.
4. Run the command `npm install` to install the necessary dependencies of the application project.
5. Run the command `node create_db.js` to manually create the web application's database. Press `CTRL + C` afterwards to finish the script process.
6. Run the command `node index.js` to start the web application.
7. Go to `http://localhost:3000` to view the web application.

## Project Contents

The project contains files and folders that were organized properly in order for the web application to work. Each folder will also contain a `README.md` file as documentation for the files inside. Below are the description of each folder and the files they contain:

- [controllers](controllers) - Contains javascript (`.js`) files which defines the callback functions for client requests.
- [helpers](helpers) - Contains files which contain helper functions specifically for form validation on login, register, account profile edit, and checkout.
- [models](models) - Contains files for database modeling and access.
- [public](public) - Contains static assets specifically css, js, fonts, and image files.
- [routes](routes) - Contains files describing the server's response for each HTTP method request to a specific server path.
- [views](views) - Contains the handlebars (`.hbs`) files which will be rendered when requested from the server.
- [index.js](index.js) - The main entry point of the web application.
- [create_db.js](create_db.js) - `.js` file to manually create the web application's database.

## Assets

- Libraries:
  - [jQuery](https://api.jquery.com)
  - [Font Awesome](https://fontawesome.com)
- Fonts:
  - [Bebas Neue Pro](https://www.dafont.com/bebas-neue.font)
