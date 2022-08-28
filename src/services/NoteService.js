import axios from 'axios'

const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(`${baseURL}`)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then((response) => response.data.concat(nonExisting))
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
