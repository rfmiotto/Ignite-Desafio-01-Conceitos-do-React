import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle) return;
    
    const newTask = {
      id: Math.random(), // não é recomendado em aplicações sérias!!!
      title: newTaskTitle,
      isComplete: false,
    }

    // O setState (setTasks no caso) pode ser utilizado na forma de callback.
    // Isso é vantajoso porque a renderização do React com setState ocorre
    // de forma assíncrona, então pode ser que ela demore para atualizar o valor
    // na tela e eu esteja interagindo com um valor antigo desatualizado.
    // Imagine por exemplo que a gente está clicando no botão de forma bem
    // rápida. Como garantir que o valor sendo calculado no setState é realmente
    // o valor anterior e que eu não estou pegando um valor desatualizado?
    // Para resolver esse problema, ao invés de fazer simplismente:
    // setTasks([...tasks, newTask])
    // é melhor fazer da forma abaixo:
    setTasks(oldState => [...oldState, newTask]);
    // Esse tipo de resolução é chamado de Atualizações Funcionais, e ela
    // garante que o valor sendo atualizado é o valor atual.

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task);

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}