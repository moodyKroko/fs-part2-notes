import { useEffect, useState } from 'react'
import Note from './components/Note'
import NoteService from './services/NoteService'
import Notification from './components/Notification'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    NoteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  const notify = (message, type = 'info') => {
    setErrorMessage({ message, type })

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    NoteService.createNote(noteObject).then((createdNote) => {
      setNotes(notes.concat(createdNote))
      setNewNote('')
      notify(`Added ${noteObject.content}`)
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    NoteService.updateNoteImportance(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)))
        notify('Note importance successfully changed')
      })
      .catch((error) => {
        setNotes(notes.filter((note) => note.id !== id))
        notify(`Note '${note.content}' was already removed from server`, 'error')
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  return (
    <>
      <h1> Notes </h1>
      <Notification notifications={errorMessage} />

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
          placeholder="a new note..."
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default App
