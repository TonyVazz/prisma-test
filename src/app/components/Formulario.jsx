'use client'
import React, { useEffect, useState } from 'react'


export const Formulario = () => {
  const [data, setData] = useState({})
  const [estudiantes, setEstudiantes] = useState([])

  
  useEffect ( () => {
    fetch('/api/registros').then((res) => res.json()).then((res) => {setEstudiantes(res)})  
    
  }, [])
  
  
  async function handleSubmit(e){
    e.preventDefault()
    const respuesta = await fetch('/api/registros',{method:"POST", body: JSON.stringify(data)})
    setEstudiantes(estudiantes.concat(await respuesta.json()))
    
    
  }
  return (
    <div>

<div className="flex flex-col items-center justify-center h-screen">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Student</h2>

    <form onSubmit={handleSubmit} className="flex flex-col">
      <label  htmlFor="name">Name</label>
      <input onChange={(e) =>{
        setData({...data, nombre:e.target.value})
      }} id='name' name='name' type="text" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Full Name"/>
      <label htmlFor="age">Age</label>
      <input onChange={(e) =>{
        setData({...data, edad:Number(e.target.value)})
      }} id='age' name='age' type="number" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Age"/>
      <label htmlFor="gender">Gender</label>
      <input onChange={(e) =>{
        setData({...data, genero:e.target.value})
      }} id='gender' name='gender' type="text" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Gender"/>
      <label htmlFor="career">Career</label>
      <input onChange={(e) =>{
        setData({...data, carrera:e.target.value})
      }} id='career' name='career' type="text" className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Career"/>
      <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">Add Student</button>
    </form>
  </div>
</div>

      <div>
        {estudiantes.map((estudiante) => <div>
          {estudiante.nombre}
        </div>)}
      </div>
    </div>
  )
}

export default Formulario