import React from 'react'
import "../styles/table.module.css"
import Pagination from './Pagination'

function TableComponent() {
    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Age', key: 'age' },
        { label: 'Country', key: 'country' },
        { label: 'City', key: 'city' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Action', key: 'action' },
    ]
    let data = [
        {
            name: 'John Doe',
            age: '30',
            country: 'USA',
            city: 'New York',
            email: 'john@gmail.com',
            phone: '+1-555-555-5555',
        },
        {
            name: 'Jane Doe',
            age: '25',
            country: 'USA',
            city: 'New York',
            email: 'john@gmail.com',
            phone: '+1-555-555-5555',
        },
        {
            name: 'John Doe',
            age: '30',
            country: 'USA',
            city: 'New York',
            email: 'johndoe@gmail.com',
            phone: '+1-555-555-5555',
        },
        {
            name: 'Jane Doe',
            age: '25',
            country: 'USA',
            city: 'New York',
            email: 'johndoe@gmail.com',
            phone: '+1-555-555-5555',
        },
        {
            name: 'John Doe',
            age: '30',
            country: 'USA',
            city: 'New York',
            email: 'johndoe@gmail.com',
            phone: '+1-555-555-5555',
        },
    ]

    // duplicate data 10 times
    data = data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data)
    data = data.map((item, index) => {
        return {
            ...item,
            id: index+1,
        }
    }
    )


    const [currentPage, setCurrentPage] = React.useState(1)
    const [itemsPerPage] = React.useState(5)
    const [totalItems, setTotalItems] = React.useState(data.length)
    const [totalPages] = React.useState(Math.ceil(totalItems / itemsPerPage))
    const [dataToDisplay, setDataToDisplay] = React.useState(data.slice(0, itemsPerPage))

    const handlePageChange = (page) => {
        console.log(page, "change page")
        setCurrentPage(page)
        setDataToDisplay(data.slice((page - 1) * itemsPerPage, page * itemsPerPage))
    }


    return (
        <div>
            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            {headers.map(header => (
                                <th key={header.key}>{header.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((row, index) => (
                            <tr key={index}>
                                <td>{row.id}</td>
                                {headers.map(header => (
                                    header.key === 'action' ? (
                                        <td key={header.key}>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    ) : (
                                        <td key={header.key}>{row[header.key]}</td>
                                    )
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}

export default TableComponent