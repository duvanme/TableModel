import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import React from 'react'
import './Table.css'
const Table = ({ rows, deleteRow, editRow }) => {
    console.log('deleteRow function:', deleteRow);
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Page</th>
                        <th className='expand'>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        rows.map((row, idx) => {
                            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                            return (
                                <tr key={idx}>
                                    <td>{row.page}</td>
                                    <td className="expand">{row.description}</td>
                                    <td>
                                        <span className={`label label-${row.status}`}>{statusText}</span>
                                    </td>
                                    <td>
                                        <span className='actions'>
                                            <BsFillTrashFill className='delete-btn'
                                                onClick={() => deleteRow(idx)} />
                                            <BsFillPencilFill onClick={() => editRow(idx)} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
