import { useHistory } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'

function NewProject() {
  const history = useHistory()//redirects para direcionar o usuario

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project), //envia o dados do projeto por POST NA ROTA  http://localhost:5000/projects
    })
      .then((resp) => resp.json()) 
      .then((data) => {
        console.log(data);
        history.push('/projects', { message: 'Projeto criado com sucesso!' })//redirecionou o usuario e mandou uma mensagem para rota 
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}

export default NewProject