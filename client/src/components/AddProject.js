import React, { useState } from 'react'
import axios from 'axios';

export default function AddProject(props) {
	const [visible, setVisible] = useState(false);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [endStation, setEndStation] = useState('');
	const [startStation, setStartStation] = useState('');
	const [date, setDate] = useState('');

	const handleSearchRide = e => {
		e.preventDefault()
		setVisible(true)
	}
	const storedToken = localStorage.getItem('authToken')
	const handleSubmit = e => {
		e.preventDefault()
		// send the data from the state as a post request to 
		// the backend
		axios.post('/api/projects', { title, description, endStation }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				console.log('test');
			})
			.catch(err => console.log(err))
		// reset the form
		setTitle('')
		setDescription('')
		setEndStation('')
		setStartStation('')
		setDate('')
		// refresh the list of the projects in ProjectList
		props.refreshProjects()
	}

	return (
		<>
			<h1>Add your own ride</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">From: </label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<label htmlFor="startStation">To: </label>
				<input
					id="startStation"
					type="text"
					value={startStation}
					onChange={e => setStartStation(e.target.value)}
				/>
				
				<label htmlFor="endStation">Date: </label>
				<input

					id="endStation"
					type="text"
					value={endStation}
					onChange={e => setEndStation(e.target.value)}
				/>
				<button type="submit">Add this ride</button>
			</form>
			<h1>Search for a train</h1>
			<form onSubmit= {handleSearchRide}>
			<label htmlFor="title">Title to keep track JG </label>
				<input
					id="title"
					type="text"
					placeholder="xD"
					value= {title}
					onChange= {e => setTitle(e.target.value)
					}
				/>
			<label htmlFor="startStation">From: </label>
				<input
					id="startStation"
					type="text"
					placeholder="searchbar placeholder"
					value={startStation}
					onChange={e => setStartStation(e.target.value)
					}
				/>
			<label htmlFor="endStation">To: </label>
				<input
					id="endStation"
					type="text"
					placeholder="searchbar placeholder"
					value={endStation}
					onChange={e => setEndStation(e.target.value)
					}
				/>

			<label htmlFor="departureDate">Date: </label>
				<input
					id="departureDate"
					type="text"
					placeholder="departure date"
					value={date}
					onChange={e => setDate(e.target.value)
					}
				/>
				<button>Search</button>
				</form>
				{
					visible && (<h1>test</h1>)
				}

		</>
	)
}
