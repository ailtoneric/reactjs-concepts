import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    let response = await api.post('repositories', {
      title: `reactjs-concepts - ${Date.now()}`,
      url: 'https://github.com/ailtoneric/nodejs-concepts',
      techs: [
        'NodeJS', 'ReactJS', 'React Native'
      ]
    });
    
    let repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    let response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {

      let repositoriesFiltered = repositories.filter(repository => repository.id !== id);
            
      setRepositories(repositoriesFiltered);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
