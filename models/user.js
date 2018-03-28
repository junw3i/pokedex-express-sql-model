const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);

        // set up query
        const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [
          user.name,
          user.email,
          hashed
        ];

        // execute query
        dbPool.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
      });
    },

    get: (id, callback) => {
      // set up query
      const queryString = 'SELECT * from users WHERE id=$1';
      const values = [id];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    login: (user, callback) => {
      console.log(user);
      // { name: 'junwei', password: '123', submit: 'Submit' }
      // fetch hash from db
      const username = user.name;
      // console.log("username", user.name);
      dbPool.query(`select password from users where name='${username}'`, (error, queryResult) => {
        if (error) {
          console.error("unable to retrive pw", error.stack)
        }
        console.log(queryResult.rows[0].password);
        bcrypt.compare(user.password, queryResult.rows[0].password, (err, res) => {
          if (res) {
            callback(true);
          } else {
            callback(false);
          }
        });
      })
    },

    getUser: (data, callback) => {
      // console.log(data);
      const values = [data];
      dbPool.query(`select users.id, users.name, users.email from users where users.id=${data}`, (error, queryResult) => {
        if (error) {
          console.error("unable to get user_pokemons", error.stack)
        }
        // console.log("results", queryResult.rows);
        callback(queryResult.rows[0]);
      })
    },

    getPokemons: (data, callback) => {
      dbPool.query(`select distinct pokemons.name from user_pokemons left join pokemons on user_pokemons.pokemon_id=pokemons.id where user_pokemons.user_id=${data}`, (error, queryResult) => {
        if (error) {
          console.error("unable to get user caught pokemons", error.stack)
        }
        console.log("CAUGHT", queryResult.rows)
        callback(queryResult.rows);
      })
    }
  };
};
