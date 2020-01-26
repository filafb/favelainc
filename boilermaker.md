1.  Intro 1.1 npm init => create an package.json 1.2 git init => Initialized
    empty Git repository 1.3 make a .gitignore file ``example: node_modules
    bundle.js //if you're using a module builder like webpack // assuming your
    bundled js file is called 'bundle.js', and is located in the root of your
    project folder bundle.js.map

2.  Express 2.1 Install and Choose an Entry Point `./server/index.js`
    `npm install --save express`

    2.2 Create an app

    ```js
    const express = require("express")
    const app = express()
    ```

    2.3 Logging Middleware It hepls with debugging (even in production
    environments) Install and hook up Examples: `morgan`, `express-logger`,
    `volleyball`

    2.4 Static Middleware Require path - helps ensuring the right path to static
    files

    ```js
    const path = require("path")
    ```

    2.5 Parsing Middleware If we want to use the requests body as `req.body`, we
    need a middleware to parse the body `npm install --save body-parser`

    2.6 API Routes API: Application programming interface By convention, the
    start pointing is `/api`, to namespace them away from the front-end routes

    - Remember: When writting the api's, we don't need to re-write
      `/app/<apiName>` because we've composed our middleware together

      2.7 Handle 404s

      2.8 Send Index HTML (when buidling single page application)

      2.9 Handle 500 Errors 4 arguments in the middleware

      2.10 Start the Server

3.  React 3.1 Index HTML `This case: public/index.html`

    3.2 Basic Server How the HTML will be served? `Express` server or a quicker
    solution like `webpack-dev-server`, `http-server`, or some other static file
    server? `webpack-dev-server`: will listen to the localhost 8080 // need to
    install it // alternativelly `webpack --watch & http-server`


    3.3 Dev Dependencies
    `npm install --save-dev`
    --> `webpack webpack-cli babel-core babel-loader babel-preset-react`
      * making sure your code is safer for older browsers: `babel-preset-env`
      * newer language features: `babel-preset-stage-2`

    3.4 Regular Dependencies
    `npm install --save`
    --> `react react-dom react-router-dom`

    3.5 Index JS
    Decide on an `entry`and an `output` file for the webpack pipeline
    Entry: `this case: client/app.js`
    Output: will be created by webpack

    3.6 Webpack Config
    new file: `webpack.config.js`

    3.7 .babelrc
    new file: `.babelrc`
    Setting `babel-loader` in the webpack config, we are teaching webpack to use babel. However, we also need to tell babel hot to parse our code.

    3.8 ReactDOM Render
    In the `entry` file

    3.9 Start Script
    In `package.json`set up an npm star command

4.  Sequelize 4.1 Create your database `createdb <dbName>` on terminal // comes
    with some installations of postgres

    4.2 Install `npm install --save sequelize pg pg-hstore` for sequelize with
    postgres

    4.3 Create Sequelize Instance invoke the Sequelize constructor and pass on
    it the database address

    - Database name will be defined based on our project name on package.json

    ```js
    const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
      logging: false
    })
    ```

    4.4 Define your models and establish Associations models:
    http://docs.sequelizejs.com/manual/tutorial/models-definition.html in
    `./db/models` associations:
    http://docs.sequelizejs.com/manual/tutorial/associations.html in
    `./db/index.js`

    4.5 Sync your Database Best practice: before your server starts

5.  Redux 5.1 Install `npm install --save redux react-redux` Common middlewares:
    `npm install --save redux-thunk redux-logger`

    5.2 Create a Reducer Function 5.3 Create your store. Set up middlewares
    Methods in store: `dispatch(action)` --> the only way to trigger a state
    change `getState()` --> return the current state `subscribe(listener)` -->
    Listener will be called any time an action is dispatched 5.4 Provider In the
    root of the React app, import store and import the Provier from react-redux
    5.5 Define: `action types` --> Strings `action creators` --> functions that
    return an object with `type: string` `sub-reducers` `thunk creators` --> for
    Async actions 5.6 Connect components Inside the components, use `connect`to
    obtain slices of `state` and the `dispatch` method

6.  Authentication 6.1 Install `npm install --save express-session passport` 6.2
    Set up session middleware & Protect Session Secret 6.3 OPTIONAL: Session
    store Store session information in postgres dtabase
    `npm install connect-session-sequelize` 6.4 Initialize Passport attach user
    to request object

7.  OAuth

    `Google console`:
    https://console.cloud.google.com/home/dashboard?project=boilermaker-demo-211119

8.  CSS 8.1 Install `npm install --save-dev style-loader css-loader` 8.2 Add to
    webpack config Docs: https://github.com/webpack-contrib/sass-loader 8.3
    Create an entry point: `./client/stile/main.scss` 8.4 Import the entry point
    in the js entry point for the webpack

9)  Testing 9.1 Install `npm install --save-dev mocha chai` `Mocha`: test
    framework - `describe` and `it` `Chai`: assertion library - `expect`,
    `should` and `assert` - http://www.chaijs.com/plugins/
    `npm install --save-dev supertest` `supertest`: a fake client. We can make
    CRUD request with it `npm install --save-dev enzyme` `enzyme`: A browserless
    abstraction for testing React components -
    https://github.com/airbnb/enzyme#installation Other libraries: `sinon`:
    provides spies, stubs and mocks `chai-as-promised`: extends chai with
    assertions specific to promises `chai-things`: extends chai with helpful
    assertions specific to arrays `sinon-as-promised`: extends sinon with sugar
    for promises `chai-enzyme`: extends chai with some convenience functions for
    working with enzyme 9.2 Where to write Tests
    - Alongside the source code \*\* In a dedicated testing folder 9.3 Test
      script Write it on `package.json` Also,
      `npm install --save-dev babel-register` to run test through `babel` //
      Add: `--compilers js:babel-register` on the script Watch for changes:
      `--watch` Configure babel: `.babelrc`
