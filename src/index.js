import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import Axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', fetchMoviesSaga);
    yield takeEvery('GET_GENRES', fetchGenresSaga);
    yield takeEvery('UPDATE_MOVIE', putMovieSaga);
    yield takeEvery('GET_GENRE_DATABASE', fetchGenreDatabaseSaga);
    yield takeEvery('ADD_GENRE_TO_MOVIE', addGenreToMovieSaga);
    yield takeEvery('REMOVE_GENRE_FROM_MOVIE', removeGenreFromMovieSaga);
}

function* removeGenreFromMovieSaga(action){
    try{
        yield Axios.delete(`/movies/delete/movie/genre/${action.payload.movie_id}/${action.payload.genre_id}`);
        yield put({type: 'GET_GENRES'});
    }catch(err){console.log('ERROR removing genre from movie', err)}
}

function* addGenreToMovieSaga(action){
    try{
        const resposne = yield Axios.post('/movies/add/movie/genre', action.payload);
        yield put({type:'GET_GENRES'});
    }catch(err){console.log('ERROR adding genre to movie', err);}
}


function* fetchGenreDatabaseSaga(action){
    try{
        const response = yield Axios.get('/movies/genre/all');
        yield put({type: 'SET_ALL_GENRE', payload:response.data})
    }catch(err){console.log('ERROR getting genre database', err)}
}


function* putMovieSaga(action){
    try{
        yield Axios.put('/movies/update', action.payload)
        yield put({type:'GET_MOVIES'})
    }catch(err){console.log('ERROR updating movie', err);}
}

function* fetchGenresSaga(action){
    try{
        const response = yield Axios.get('/movies/genre');
        yield put({ type: 'SET_GENRES', payload: response.data})
    }catch(err){console.log('ERROR getting genres', err);}
}

function* fetchMoviesSaga(action){
    try{
        const response = yield Axios.get('/movies');
        yield put({type:'SET_MOVIES', payload: response.data})
    }catch(err){console.log('ERROR getting movies', err);}
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server the state will be an array of objects
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres the state will be an array of objects
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const genreDatabase = (state=[], action) => {
    if (action.type === 'SET_ALL_GENRE'){
        return action.payload
    }else{
        return state
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        genreList: genreDatabase,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
