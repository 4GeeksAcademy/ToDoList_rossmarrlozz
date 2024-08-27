import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';



function Todo() {

	/*usestate*/
	const [tareas, setTareas] = useState([]) /*almacena tareas*/
	const [nuevaTarea, setNuevaTarea] = useState("") /*entrada de texto*/
	const borrarTarea = (index) => {
		setTareas(tareas.filter((_, i) => i !== index));
	};

	/*useEffect*/

	useEffect(() => {
		// Obtener tareas de la API
		const fetchTareas = async () => {
		  try {
			const respuesta = await fetch('https://playground.4geeks.com/todo/users/ross_marr_lozz');
			const datos = await respuesta.json();
			setTareas(datos.todos);
		  } catch (error) {
			console.error('Error al obtener tareas:', error);
		  }
		};
	  
		fetchTareas(); // Llama a la función para obtener las tareas
	  }, []); 

	


	return (

		<Container fluid className='estilo'>

			<Card className='contenedorListadetareas'>
				<h1>¡Que no se me olvide nada</h1>
				<Card.Header className='titulo'> <strong>Tareas diarias</strong></Card.Header>

				<ListGroup variant="flush">
					<ListGroup.Item className='addtask'>

						<input type="text"
							id="name"
							name="name"
							placeholder="Añadir tareas"
							//*Actualiza las nuevas tareas*//
							value={nuevaTarea}
							onChange={(e) => setNuevaTarea(e.target.value)} />

						<button
							className='btn btn-info'
							onClick={() => {
								if (nuevaTarea !== "") {
									setTareas([...tareas, nuevaTarea]); // Añade la nueva tarea a la lista
									setNuevaTarea(""); // Limpia el input
								}
							}}
						>
							<i className="fa fa-plus"></i>
						</button>

					</ListGroup.Item>
				</ListGroup>

				<ul className='agregartareas row'>
					{tareas.map((tarea, index) => (
						<li key={index} className="formatoTareas">
							{tarea}
							<button
								className='btn btn-info trash'
								onClick={() => borrarTarea(index)}
							>
								<i className="fa fa-trash"></i>
							</button>
						</li>
					))}



				</ul>

				<Card.Footer className="text-muted contadordetareas">{tareas.length} tareas por hacer</Card.Footer>
				<button className='btn btn-info ml-3 limpiartareas'
					onClick={() => setTareas([])} // Limpia todas las tareas
				>
					<strong>Limpiar Todas</strong>
				</button>
			</Card>
		</Container>
	);
}

export default Todo;
