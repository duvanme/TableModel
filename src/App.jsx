import { useState } from 'react'
import './App.css'
import Table from './components/Table'
import Modal from './components/Modal'

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    { page: "Page 1", description: "This is the 1st page", status: "live" },
    { page: "Page 2", description: "This is the 2nd page", status: "draft" },
    { page: "Page3", description: "This is the 3rd page", status: "error" },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);
  /*if modal open equals true, then show modal*/

  const handleDeleterows = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  }

  /*Add new rows */
  const handleSubmit = (newRow) => {
    rowToEdit === null ?
      setRows([...rows, newRow]) :
      setRows(rows.map((CurrRow, idx) => {
        if (idx !== rowToEdit) {
          return CurrRow;
        } else { return newRow }
      }))
  }

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleterows} editRow={handleEditRow} />
      <button className='btn' onClick={() => setModalOpen(true)}>Add</button>
      {modalOpen && <Modal closeModal={() => { setModalOpen(false); setRowToEdit(null); }}
        onSubmit={handleSubmit}
        defaultValue={rowToEdit !== null && rows[rowToEdit]}
      />}
    </div>


  )
}

export default App
