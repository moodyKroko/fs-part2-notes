import { useEffect, useState } from 'react'
import Note from './components/Note'
import NoteService from './services/NoteService'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    NoteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
      console.log('promise fulfilled')
    })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    NoteService.createNote(noteObject).then((createdNote) => {
      setNotes(notes.concat(createdNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    NoteService
      .updateNoteImportance(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)))
      })
      .catch((error) => {
        alert(`The note ${note.content} was already deleted from the server`)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  return (
    <>
      <h1> Notes </h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
