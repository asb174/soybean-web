import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [entries, setEntries] = useState([])
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState('')

  function loadEntries() {
    fetch(`${API_URL}/entries`)
      .then((response) => response.json())
      .then((data) => setEntries(data))
  }

  useEffect(() => {
    loadEntries()
  }, [])

  function addEntry() {
    fetch(`${API_URL}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight: parseFloat(weight), date: date }),
    })
      .then((response) => response.json())
      .then(() => {
        loadEntries()
        setWeight('')
        setDate('')
      })
  }

  return (
    <div>
      <h1>Soybean — Weight Entries</h1>

      <div>
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>

      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.date}: {entry.weight} kg
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App