const express = require('express');
const pool= require('../modules/pool');
const router = express.Router();

//set up route to send all movie with genres info to client this will return the movie id in one 
//column and in the "movie_genres" column it will be an array of all the genres attributed with
//that movie.
router.get('/genre', (req, res) => {
    let queryText = `SELECT "movies"."id", array_agg("genres"."name") AS "movie_genres" FROM "movies"
JOIN "movie_genre" ON "movies"."id" = "movie_genre"."movie_id"
JOIN "genres" ON "movie_genre"."genre_id" = "genres"."id"
GROUP BY "movies"."id";`
pool.query(queryText).then(result => res.send(result.rows)).catch(err => {
    console.log('ERROR in get to /', err );
    res.sendStatus(500);
});
});

//set up route to grab all movies in the movies table
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "movies";`
    pool.query(queryText).then(result => res.send(result.rows)).catch(err => {
        console.log('ERROR in get to /', err);
        res.sendStatus(500);
    });
});

//route to update movie title and description
router.put('/update', (req, res) => {
    let queryText = `UPDATE "movies" SET "title"=$1, "description"=$2 WHERE "id"=$3; `;
    pool.query(queryText, [req.body.title, req.body.description, req.body.id])
    .then(result => res.sendStatus(200)).catch(err => {
        console.log('ERROR in put', err);
        res.sendStatus(500);
    });
});

//route to get all genres from the genres table
router.get('/genre/all', (req, res) => {
    let queryText = `SELECT * FROM "genres"`
    pool.query(queryText).then(result => res.send(result.rows)).catch(err => {
        console.log('ERROR getting all genres', err);
        res.sendStatus(500);
    })
})

//route to add a genre to a movie
router.post('/add/movie/genre', (req, res) => {
    let queryText = `INSERT INTO "movie_genre" ("movie_id", "genre_id") VALUES ($1,$2)`;
    pool.query(queryText, [req.body.movie_id, req.body.genre_id]).then(result => res.sendStatus(200)).catch(err => {
        console.log('Error in posting genre for movie', err);
        res.sendStatus(500);
    })
})

//route to remove a genre from a movie
router.delete('/delete/movie/genre/:movie_id/:genre_id', (req, res) => {
    console.log('Delete request', req.params);
    let queryText = `DELETE FROM "movie_genre" WHERE "movie_id"= $1 AND "genre_id"= $2;`;
    pool.query(queryText, [req.params.movie_id, req.params.genre_id]).then(result => res.sendStatus(202)).catch(err => {
        console.log('ERROR deleting genre from movie', err);
        res.sendStatus(500);
    })
})






module.exports = router;