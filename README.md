# Boilermaker

A ready-to-use boilerplate for applications using Node.js, Express, Sequelize,
React, and Redux. For testing, Mocha & Chai. Style? SCSS!

## How to use it:

1. Create your own repo on gitHub, **without a README.md file**
2. Clone it to your local machine
3. Add this repo as a remote one:
   `git remote add boilermaker https://github.com/filafb/boilermaker-simple.git`
4. `git fetch boilermaker`
5. `git merge boilermaker/master`

## Starting the application:

1. Change the application name on package.json
2. Create two databases using `Postgres` command line:
   - createdb <your_application_name>
   - createdb <your_application_name-test>
3. `npm install`
4. Run the following script: `npm run start-dev`
5. Enjoy it on localhost:4321. Want a different port? No worries. Set it on
   `server/index` line 2.

## Testing it:

`npm test` _When touching the db inside tests, it's necessary to hook
db.sinc({force:true}) before all tests_

## Deploying it (manually, using heroku):

1. Create your heroku app: `heroku create your-app-name`
2. Add a postgres database to your heroku dyno:
   `heroku addons:create heroku-postgresql:hobby-dev`
3. Add the heroku address as a remote on your git:
   `heroku git:remote your-app-name` _Rename your heroku remote name with:_
   `git remote rename heroku new-remote-name`
4. When you a ready to deploy it, make sure everything is commited, and then
   run: `npm run deploy` Your terminal will ask you the branch you want to
   deploy and the remote to receive it. It can be useful in the case you have
   different remotes, as dev, staging and/or production.
5. You should be good to go!
