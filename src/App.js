import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  async function handleAddRepository() {
    // TODO
    const response = await api.post(
      '/repositories',{
      "title": `Novo Projeto ${Date.now()}`,
      "url": "https://github.com/aminsales/node_basic",
      "techs": "REACT, nodeJS, REACT Native"
    });
    console.log(response);
    setRepository([...repositories, response.data ]);

  }

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, [])

  async function handleRemoveRepository(id) {
    // TODO
    console.log(id);
    const repositoryIndex = repositories.findIndex(repository=>repository.id ===id);
  
    try {
      await api.delete(`/repositories/${id}`)
      console.log(repositories);
      repositories.splice(repositoryIndex, 1);
      setRepository([...repositories]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button> 
        </li>)}
         
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
