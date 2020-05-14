import React from "react";
import { useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([
    {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": "Umbriel",
      "techs": [
        "Node",
        "Express",
        "TypeScript"
      ],
      "id": "4954f6f9-1aab-4d61-9b9b-d9cd0c34a86c",
      "likes": 6
    }
  ])

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
    // TODO
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
