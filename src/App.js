import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [buttonClass, setButtonClass] = useState('get-name-button');
  const [nameContainerClass, setNameContainerClass] = useState('hidden')
  const [peopleContainerClass, setPeopleContainerClass] = useState('people-container')

  useEffect(() => {
    fetch('/people')
      .then(res => res.json())
      .then(data => setPeople(data));
  }, []);

  const handleGetName = () => {
    if (username.length === 0) return;

    fetch(`/name?username=${username}`)
      .then(res => res.json())
      .then(data => 
        setName(data)
      );

    fetch('/people')
      .then(res => res.json())
      .then(data => setPeople(data))
      .finally(() => {
        setButtonClass('get-name-button hidden');
        setNameContainerClass('name-container');
      });
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Secret Santa</h1>
      </header>
      <div>
        {people.length == 0 ? <h1>No more names!</h1> : 
        <div className={peopleContainerClass}>
          <h2>What is your name?</h2>
          <input onChange={handleUsernameInput}></input>
          <button className={buttonClass} onClick={handleGetName}>Få ett namn</button>

          <div className={nameContainerClass}>
            <h2>You are secret santa for:</h2>
            <h1>{name.name}</h1>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
