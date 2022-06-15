import React from 'react'
import "../styles/pagination.module.css"

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    ...props
}) => {
  return (
    <div>
        <ul className="pagination">
            <li className={currentPage === 1 ? 'disabled' : ''}>
                <a onClick={() => onPageChange(currentPage - 1)}>Previous</a>
            </li>
            {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`${currentPage === i + 1 ? 'active' : '' }  pagination-item`}>
                    <a onClick={() => onPageChange(i + 1)} style={{marginLeft: "10px"}}>{i + 1}</a>
                </li>
            ))}
            <li className={currentPage === totalPages ? 'disabled' : ''}>
                <a onClick={() => onPageChange(currentPage + 1)}>Next</a>
            </li>
        </ul>
    </div>
  )
}

export default Pagination