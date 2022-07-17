import React, {useState, useEffect} from 'react';
import './style.css';

import {Card} from '../../componentes/Card';




export function Home() {
  const [studantName, setStudantName ] = useState();
  const [students, setstudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent() {
    const newStudent = {
      name: studantName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setstudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Viniciuzsato')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
  }, [])

  return (
    <div className='container'>
       <header>
         <h1>Lista de Amigos</h1>
         
         <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
         </div>
       </header>
       
       <input 
       type="text" 
       placeholder='Digite um nome...'
       onChange={e => setStudantName(e.target.value)} 
       />
       
       <button type='button' onClick={handleAddStudent}>
         Adicionar
       </button>


        {
          students.map(student => (
            <Card 
              key= {student.time}
              name= {student.name}  
              time= {student.time} 
            />
          ))
        } 
        
    </div>
  )

  }
