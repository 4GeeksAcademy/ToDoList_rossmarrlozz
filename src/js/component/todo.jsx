import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';



function Todo() {

	/* Estados para almacenar tareas y nueva tarea*/
	const [tareas, setTareas] = useState([])
	const [nuevaTarea, setNuevaTarea] = useState("")

	const urlApi = 'https://playground.4geeks.com/todo/users/LozzRossMarr';

	
	/* Función para borrar una tarea específica*/
	const borrarTarea = async (index) => {
		const nuevasTareas = tareas.filter((_, i) => i !== index);
		try {
			await fetch('https://playground.4geeks.com/todo/users/LozzRossMarr', {
				method: "PUT",
				body: JSON.stringify({ todos: nuevasTareas }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			setTareas(nuevasTareas);
		} catch (error) {
			console.error('Error eliminando tarea', error);
		}
	};


	/*Función para limpiar todas las tareas*/
	const limpiarTareas = async () => {
		try {
			await fetch('https://playground.4geeks.com/todo/users/LozzRossMarr', {
				method: "PUT",
				body: JSON.stringify({ todos: [] }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			setTareas([]);
		} catch (error) {
			console.error('Error limpiando tareas', error);
		}
	};


	/*Función para agregar una nueva tarea*/
	const agregarTarea = async () => {
        if (nuevaTarea !== "") {
            const actualizarTareas = [...tareas, nuevaTarea];
            setTareas(actualizarTareas);
            await sincronizarTareas(actualizarTareas);
            setNuevaTarea("");
        }
    };


	/*Sicronizar tareas con el servidor*/
	const sincronizarTareas = async (tareasActualizadas) => {
        try {
            const respuesta = await fetch(urlApi, {
                method: "PUT",
                body: JSON.stringify(tareasActualizadas),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(respuesta.ok); // true si la respuesta es exitosa
            console.log(respuesta.status); // Código de estado 200, 300, 400, etc.
            console.log(await respuesta.text()); // Resultado como string
            const datos = await respuesta.json(); // Parseo del resultado a JSON
            console.log(datos); // Imprime el objeto recibido del servidor
        } catch (error) {
            console.error('Error sincronizando tareas', error);
        }
    };


	/*useEffect para obtener las tareas al cargar el componente*/
	useEffect(() => {
		const fetchUsuarios = async () => {
			try {
				const respuesta = await fetch('https://playground.4geeks.com/todo/users/LozzRossMarr');
				const datos = await respuesta.json();
				setTareas(datos.todos || []);
			} catch (error) {
				console.error('Error al obtener usuarios:', error);
			}
		};
		fetchUsuarios();
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
							onClick={agregarTarea}
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
					onClick={limpiarTareas}
				>
					<strong>Limpiar Todas</strong>
				</button>
			</Card>
		</Container >
	);
}

export default Todo;
