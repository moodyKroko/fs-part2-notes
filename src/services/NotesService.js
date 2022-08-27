import axios from 'axios'

const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(`${baseURL}`)
  return request.then((response) => response.data)
}

const createNote = (noteObject) => {
  const request = axios.post(`${baseURL}`, noteObject)
  return request.then((response) => response.data)
}

const updateNoteImportance = (id, changedNote) => {
  const request = axios.put(`${baseURL}/${id}`, changedNote)
  return request.then((response) => response.data)
}

export default { getAll, createNote, updateNoteImportance }
