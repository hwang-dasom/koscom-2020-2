import React from 'react';
import TodoList from './components/TodoList';

function Home(props) {
//localStorage.getItem("username")
  console.log('Home : ', localStorage.getItem("username"));
  return (
    <div className='home'>
      <TodoList />
    </div>
  );
}

export default Home;

