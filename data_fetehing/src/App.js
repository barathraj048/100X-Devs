import Usedatafetch from './hooks/retrive_from_backend';
import './App.css';
import UseIsOnline from './hooks/IsonlineHook';
import { useState } from 'react';
import Usedebound from  './hooks/Debound'



function App() {
  const [input ,setinput]= useState('')


  const {todos,loading}=Usedatafetch('https://jsonplaceholder.typicode.com/todos',5)
  const isonline=UseIsOnline()
  const debound=Usedebound(input,500)

  return (
    <div className="App">
      {loading ? (<div>loading...</div>):(<div>
        {todos.map((todo, index) => (
          <div key={index} className="Style">{todo}</div>
          ))}</div>)
      }
      {isonline ? console.log(`user is online`) : console.log(`user is offline`)}
      <input type='text' value={input} onChange={(event)=> {setinput(event.target.value)}}/>
    </div>
  );
}

export default App;
