import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';


function Todo() {

	const [addtarea, setAddtarea] = useState("");
	const [nuevaTareaEnLaLista, setNuevaTareaEnLaLista] = useState([]);

	const handleChange = (event) => {
		setAddtarea(event.target.value);
	};

	const handleClick = () => {
		addTodo();
	}

	const borrartarea = (index) => {
		const trash = nuevaTareaEnLaLista.filter((list, i) => i !== index)
		setNuevaTareaEnLaLista(trash);
	}

	const limpiarTareas = async () => {
		const updatedList = [];
		setNuevaTareaEnLaLista(updatedList);
		await syncWithServer(updatedList);
	}

	const usuario = "rossmarrlozz";

	const getUsers = () => {
		fetch(`https://playground.4geeks.com/todo/users/${usuario}`)
			.then(respuesta => {
				if (respuesta.ok) {
					return respuesta.json();
				} else {
					throw new Error("User not found");
				}
			})
			.then(data => setNuevaTareaEnLaLista(data.todos))
			.catch(error => {
				console.error("error loading list", error);
			});
	};


	const addUser = () => {
		fetch(`https://playground.4geeks.com/todo/users/${usuario}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([])
		})
			.then(respuesta => {
				if (respuesta.ok) {
					console.log(`user${usuario}created successfully`);
				} else {
					console.error("error creating user");
				}
			})
			.catch(error => console.error("error creating user", error));
	};

	const addTodo = () => {
		fetch(`https://playground.4geeks.com/todo/todos/${usuario}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					label: addtarea,
					is_done: false
				})
		})
			.then(respuesta => {
				if (respuesta.ok) {
					console.log( "Task added successfully");
					getUsers()
				} else {
					console.error("error creating user");
				}
			})
			.catch(error => console.error("error creating user", error));
	};

	useEffect(() => {
		addUser();
		getUsers();
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
							onChange={(e) => setAddtarea(e.target.value)}
							value={addtarea}
							placeholder="Añadir tareas" />

						<button className='btn btn-info' onClick={handleClick}>
							<i className="fa fa-plus"></i>
						</button>
					</ListGroup.Item>
				</ListGroup>

				<ul className='agregartareas row'>
					{nuevaTareaEnLaLista.map((list, index) => (
						<li key={index}>
							{list.label}
							<button onClick={() => borrartarea(index)} className='btn btn-info trash'>
								<i className="fa fa-trash"></i></button>
						</li>
					))}
				</ul>

				<Card.Footer className="text-muted contadordetareas">{nuevaTareaEnLaLista.length} tareas por hacer</Card.Footer>
				<button onClick={limpiarTareas} className='btn btn-info ml-3 limpiartareas'>
					Limpiar Todas
				</button>
			</Card>
		</Container>
	);
}

export default Todo;
