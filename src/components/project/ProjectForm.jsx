import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {}) //pode vir do formulario ou preencher manualmente
  const [categories, setCategories] = useState([])

  useEffect(() => { //Utilizar o useEffect para que o looping nao fique acontecendo sem parar e utilizar de forma dinamica
    fetch('http://localhost:5000/categories', {//utilizado para pegar as categorias criadas no bd
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data)
      })
  }, []) //Passa o valor inicial com as options vazias

  const submit = (e) => {
    e.preventDefault() //Não deixa dar reloud no site
    handleSubmit(project)// executa o metodo e passa a prop
   
  }

  function handleChange(e) { //metodo dinamico para alterar um valor, reaproveitar outro formulario
    setProject({ ...project, [e.target.name]: e.target.value }) //pega todos os dados do projeto e muda o valor do texto independente de qual seja
  
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: { //cria um objeto da categoria com o id da categoria e o nome
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        key="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm