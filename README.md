# Smart Inventory Shelves

A second year group project, using Node.js and express.

The main site is in the '*ServerDev*' folder. An outline of the development folder structure is below.

The '*DatabaseDumps*' folder' contains database schemas and dump files.

### Outline of 'ServerDev' folder and file structure:

- **controllers:** Some routes, specifically the item setup and shelf overview pages, have their routing logic separated into controllers and then exported and called in the route file. The benefit of this approach is it allows the routing logic to be swapped out - a replacement set of logic for a route can be created without affecting the original. The route logic usually extracts or passes data from requests, then renders a page. They may call model methods to process that data or interact with the database.
  - **itemSetupController.js, mainController.js**

- **models:** created to represent either tables in the database or used to contain database calls useful to specific functions, such as the overview. They have constructors allowing for data to be packaged conveniently for rendering on pages or inserting into the database, they also have methods which may interact with the database performing CRUD operations.
  - **Item.js, overview.js, shelf.js, weight.js**

- **public:** for storing files public users will have direct access to - CSS files and images mainly
  - **CSS**: Stores CSS and SCSS files
  - **images:** Stores site images
  - **upload:** Stores item images uploaded by users

- **routes**: for storing routing files. Each file contains the routes for specific paths. Routes are split up this way because sites often end up with a lot of routes and the logic can be quite long - by splitting up the logic it is easier to see what routes a site has in the routes files.
  - **delete.js, help.js, itemSetup.js, main.js, shelfDetails.js, swap.js**

- **util**: for storing any functions run separately from routes
  - **autoCalcWeight.js**: Finds the most recent highest weight in a weight table and sets that to 100% (if this feature is turned on)

- **views**: For storing HTML EJS template files
  - **includes folder:** EJS allows for common HTML elements (such as the head and navigation bar) to be stored in separate files then imported into individual files. The benefit provided is that changes to common elements need only be done in one file to update every page.
  - **test folder** - for creating test views (in order to test routes)
  - **One folder for each domain path**: Each path has a separate folder for storing EJS files. Many files had similar names, so splitting them up this way seemed sensible

- **index.js**: main express server file
