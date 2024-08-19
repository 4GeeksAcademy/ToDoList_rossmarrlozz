import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';


function Todo() {

	const [addtarea, setAddtarea] = useState("Agrega una tarea");
	const [nuevalista, setNuevalista] = useState([]);

	const handleChange = (event) => {
		setAddtarea(event.target.value);
	};

	const handleClick = () => {
		setNuevalista([...nuevalista, addtarea]);
	}

	const borrartarea = (index) => {
		const trashs = nuevalista.filter((list, i) => i !== index)
		setNuevalista(trashs);
	}

	const limpiarTareas = async () => {
		const updatedList = [];
		setNuevalista(updatedList);
		await syncWithServer(updatedList);
	}

	const usuario = "rossmarrlozz";

	useEffect(() => {
		const respuestaAppi = () => {
			fetch(`https://playground.4geeks.com/todo/users/${usuario}`)
				.then(respuesta => {
					if (respuesta.ok) {
						return respuesta.json();
					} else {
						throw new Error("User not found");
					}
				})
				.then(data => setNuevalista(data.todos))
			.catch (error => {
				console.error("error loading list", error);
				addUser();
			});
		};

		const addUser = () => {
			fetch(`https://playground.4geeks.com/todo/users/${usuario}`, {
				method:"POST",
				headers:{
					"Content-Type": "aplication/json"
				}, 
				body: JSON.stringify([])
			})
			.then(res => {
				if(respuesta.ok) {
					console.log(`user${usuario}created successfully`);
					respuestaAppi();
				} else{
					console.error("error creating user");
				}
			})
			.catch(error => console.error("error creating user", error));
		};
		respuestaAppi();
	}, []);


return (
	<Container fluid className='estilo'>

		<Card style={{ width: '50rem', height: '30rem', backgroundColor: '#ba55d3' }}>

			<Card.Header className='titulo'> <strong>ToDoList</strong></Card.Header>

			<ListGroup variant="flush">
				<ListGroup.Item className='addtask'>
					<input type="text"
						id="name"
						name="name"
						onChange={handleChange}
						placeholder="No hay tareas, añadir tareas" />

					<button class='btn btn-info' onClick={handleClick}>
						<i class="fa fa-plus"></i>
					</button>
				</ListGroup.Item>
			</ListGroup>

			<ul className='agregartareas row'>
				{nuevalista.map((list, index) => (
					<li key={index}>
						{list}
						<button onClick={() => borrartarea(index)} className='btn btn-outline-info trash'>
							<i class="fa fa-trash"></i></button>
					</li>
				))}
			</ul>

			<Card.Footer className="text-muted">{nuevalista.length} tareas por hacer</Card.Footer>
			<button onClick={limpiarTareas} className='btn btn-dark ml-3'>
            Limpiar Todas
          </button>
		</Card>
	</Container>
);
}

export default Todo;
