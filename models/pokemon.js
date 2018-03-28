/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (pokemon, callback) => {
      // set up query
      const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
        VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },
    updatePokemon: (data, callback) => {
      const values = [];
      console.log("id", data[0]);
      dbPool.query(`update pokemons set name='${data[1].name}', img='${data[1].img}', height='${data[1].height}', weight='${data[1].weight}' where id=${data[0]}`, values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },
    updateForm: (id, callback) => {
      const values = [id];
      // console.log(values);
      dbPool.query('select * from pokemons where id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  };
};
