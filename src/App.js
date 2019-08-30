import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

import Menu from './Menu';
import AnecdoteList from './AnecdoteList';
import About from './About';
import Footer from './Footer';
import Create from './CreateNew';
import Anecdote from './Anecdote';
import { initialAnecdotes } from './data';

const CreateNew = withRouter(Create);

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const [notification, setNotification] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const onSuccess = state => {
    setIsSuccessful(state);
    setTimeout(() => {
      setIsSuccessful(false);
    }, 300);
  };

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Menu />
          <Route
            exact
            path="/"
            render={() => <AnecdoteList anecdotes={anecdotes} />}
          />
          <Route
            path="/anecdotes/:id"
            render={({ match }) => (
              <Anecdote anecdote={anecdoteById(match.params.id)} />
            )}
          />
          <Route path="/about" render={() => <About />} />
          <Route
            path="/create"
            render={() =>
              isSuccessful ? (
                <Redirect to="/" />
              ) : (
                <CreateNew addNew={addNew} onSuccess={onSuccess} />
              )
            }
          />
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
