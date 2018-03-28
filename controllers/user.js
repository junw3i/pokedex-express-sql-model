/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const newForm = (request, response) => {
  response.render('user/new');
};

const create = (db) => {
  return (request, response) => {
    // use user model method `create` to create new user entry in db
    db.user.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error creating user:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('User created successfully');

        // drop cookies to indicate user's logged in status and username
        response.cookie('loggedIn', true);
        response.cookie('username', request.body.name);
      } else {
        console.log('User could not be created');
      }

      // redirect to home page after creation
      response.redirect('/');
    });
  };
};

const logout = (request, response) => {
  response.clearCookie('loggedIn');
  response.clearCookie('username');
  response.redirect(301, '/');
};

const loginForm = (request, response) => {
  // redirect logged in users to root
  if (request.cookies['loggedIn'] == 'true') {
    response.redirect('/');
  } else {
    response.render('user/login');
  }

};

const login = (db) => {
  return (request, response) => {
    db.user.login(request.body, (queryResult) => {
      if (queryResult) {
        response.cookie('loggedIn', true);
        response.cookie('username', request.body.name);
        response.redirect('/');
      } else {
        console.log("login unsuccessful");
        response.redirect('/users/login');
      }
    })
  }
};

const getPokemons = (db) => {
  return (request, response) => {
    if (request.cookies['loggedIn'] != 'true') {
      response.redirect('/');
    } else {
      db.user.getUser(request.params.id, (queryResult) => {
        // console.log("MY RESULTS", queryResult);
        db.user.getPokemons(request.params.id, (queryResult2) => {
          response.render("user/user", {user: queryResult, pokemons: queryResult2});
        })
      })
    }
  }
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  newForm,
  create,
  logout,
  loginForm,
  login,
  getPokemons
};
