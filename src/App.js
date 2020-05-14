import React from "react";
import { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("/repositories").then(function (response) {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Título ${Date.now()}`,
      techs: ['Node', 'React'],
      url: 'https://github.com/Rocketseat/umbriel'
    })

    const newRepository = response.data
    
    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    console.log(response.status)

    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )) }        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
