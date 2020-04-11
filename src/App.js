import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setReposistories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setReposistories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Novo Projeto",
      url: "http://www.google.com.br",
      techs: [
        "NodeJS",
        "ReactJS",
        "React Native"
      ]
    });

    const repositorie = response.data;
    setReposistories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const index = repositories.findIndex(repositorie => repositorie.id === id);
    repositories.slice(index, 1);

    setReposistories(repositories.filter(repositorie => repositorie.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
