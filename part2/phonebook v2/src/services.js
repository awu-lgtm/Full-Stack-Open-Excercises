import axios from 'axios'

const posts = (personsObject) => {
    const request = axios.post('http://localhost:3001/api/persons', personsObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get('http://localhost:3001/api/persons')
    return request.then(response => response.data)
}

const deletion = (id) => {
    const request = axios.delete(`http://localhost:3001/api/persons/${id}`)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    const request = axios.put(`http://localhost:3001/api/persons/${id}`, personObject)
    return request.then(response => response.data)
}

export default { posts, getAll, deletion, update }