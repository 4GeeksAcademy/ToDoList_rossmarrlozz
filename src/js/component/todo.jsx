import React from 'react';
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
	
	
	return (
		<Container fluid className='estilo'>

			<Card style={{ width: '50rem', height: '30rem' }}>

				<Card.Header className='titulo'> <strong>ToDoList</strong></Card.Header>

				<ListGroup variant="flush">
					<ListGroup.Item className='addtask'>
						<input type="text"
							onChange={handleChange}
							placeholder="No hay tareas, añadir tareas"
						/>
						<button className='btn btn-info' onClick={handleClick}>
							<i class="fa fa-plus"></i>
						</button>
					</ListGroup.Item>
				</ListGroup>
				
				<ul className='agregartareas row'>
					{nuevalista.map((list, index) => (
						<li key={index}>
							{list} 
							<button onClick= { () => borrartarea (index)} className='btn btn-outline-info trash'>
							<i class="fa fa-trash"></i></button>
						</li>
					))}
				</ul>

				<Card.Footer className="text-muted">{nuevalista.length} tareas por hacer</Card.Footer>
			</Card>
		</Container>
	);
}

export default Todo;

