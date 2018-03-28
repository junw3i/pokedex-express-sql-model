/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const get = (db) => {
  return (request, response) => {
    // use pokemon model method `get` to retrieve pokemon data
    db.pokemon.get(request.params.id, (error, queryResult) => {
      // queryResult contains pokemon data returned from the pokemon model
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        // render pokemon.handlebars in the pokemon folder
        response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const updateForm = (db) => {
  return (request, response) => {

    db.pokemon.updateForm(request.params.id, (error, queryResult) => {
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        // render pokemon.handlebars in the pokemon folder
        console.log("results", queryResult.rows[0]);
        response.render('pokemon/edit', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const update = (db) => {
  return (request, response) => {
    // console.log("request body", request.body);
    db.pokemon.updatePokemon([request.params.id, request.body], (error, queryResult) => {
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        response.redirect('/');
      }
    });
  };
};

const createForm = (request, response) => {
  response.render('pokemon/new');
};

const create = (db) => {
  return (request, response) => {
    // use pokemon model method `create` to create new pokemon entry in db
    db.pokemon.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log(queryResult.rows[0].id);
        console.log('Pokemon created successfully');
        db.pokemon.mapOwner([queryResult.rows[0].id, request.body.user_id], (error2, queryResult2) => {
          if (error2) {
            console.error('error mapping pokemon to user:', error2.stack);
            response.sendStatus(500);
          }
          if (queryResult2.rowCount >= 1) {
            console.log('Pokemon mapped to user successfully');
          }

          response.redirect('/');
        })
      } else {
        console.log('Pokemon could not be created');
        response.redirect('/');
      }

      // redirect to home page after creation
      // response.redirect('/');
    });
  };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  get,
  updateForm,
  update,
  createForm,
  create
};
