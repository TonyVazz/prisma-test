'use client'
import React, { useEffect, useState } from 'react'


export const Formulario = () => {
  const [data, setData] = useState({})
  const [estudiantes, setEstudiantes] = useState([])
  const [actualizarEstudiante, setActualizarEstudiante] = useState(null)
 

  
  useEffect ( () => {
    fetch('/api/registros').then((res) => res.json()).then((res) => {setEstudiantes(res)})  
    
  }, [])
  
  
  async function handleSubmit(e){
    e.preventDefault()

    if(actualizarEstudiante){
      await fetch(`/api/registros/${actualizarEstudiante.id}`,{method:'PUT', body: JSON.stringify(data)});
      setActualizarEstudiante(false);

      const estudiantesActualizados = await fetch('/api/registros').then((res) => res.json());
      setEstudiantes(estudiantesActualizados)

      setData({});
    }else{
      const respuesta = await fetch('/api/registros',{method:"POST", body: JSON.stringify(data)})
      setEstudiantes(estudiantes.concat(await respuesta.json()))
      setData({});
    } 
    
  }

  const handleActualizarEstudiante = (estudiante) =>{
    setActualizarEstudiante(estudiante);
    setData(estudiante);
    console.log(estudiante)

  }

  async function handleEliminarEstudiante(estudianteId){
    
    await fetch(`/api/registros/${estudianteId}`,{method: 'DELETE',});
    //actualizar los estudiantes
    setEstudiantes(estudiantes.filter((estudiante) => estudiante.id !== estudianteId))
   
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
      }} id='name' name='name' type="text" value={data.nombre || ''} className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Full Name"/>
      <label htmlFor="age">Age</label>
      <input onChange={(e) =>{
        setData({...data, edad:Number(e.target.value)})
      }} id='age' name='age' type="number" value={data.edad ||''} className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Age"/>
      <label htmlFor="gender">Gender</label>
      <input onChange={(e) =>{
        setData({...data, genero:e.target.value})
      }} id='gender' name='gender' type="text" value={data.genero ||''} className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Gender"/>
      <label htmlFor="career">Career</label>
      <input onChange={(e) =>{
        setData({...data, carrera:e.target.value})
      }} id='career' name='career' type="text" value={data.carrera ||''} className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" placeholder="Career"/>
      <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">{actualizarEstudiante ? "Update Student" : "Add Student"}</button>
    </form>
  </div>
</div>
      
      
      
          {/* {estudiante.nombre} */}
          {/*tabla para mostrar los estudiantes*/}
        <div className="">
            <table className="w-[80%] mx-auto text-white dark:text-white ">
                <thead className=" border dark:border-gray-700 text-xs text-center text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Edad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Genero
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Carrera
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Opciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                {estudiantes.map((estudiante) => (
                   <tr key={estudiante.id} className="text-center bg-white border dark:bg-gray-800 dark:border-gray-700">
                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       {estudiante.id}
                   </th>
                   <td className="px-6 py-4">
                       {estudiante.nombre}
                   </td>
                   <td className="px-6 py-4">
                       {estudiante.edad}
                   </td>
                   <td className="px-6 py-4">
                       {estudiante.genero}
                   </td>
                   <td className="px-6 py-4">
                       {estudiante.carrera}
                   </td>
                   <td className="px-6 py-4">
                       <button onClick={() => handleActualizarEstudiante(estudiante)} className='bg-blue-400 rounded-lg p-3 text-white'>Modificar</button>
                       <button onClick={() => handleEliminarEstudiante(estudiante.id)} className='bg-red-400 rounded-lg ml-2 p-3 text-white'>Eliminar</button>
                   </td>
                 </tr>
                ))}
                </tbody>
            </table>
             {/*fin de la tabla */}
          </div>
    </div>
  )
}

export default Formulario