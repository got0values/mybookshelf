import React from 'react';

const Pagination = ({booksPerPage, totalBooks, goToPage}) => {
    //get total page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="m-3 btn-group d-flex justify-content-center">
            {pageNumbers.map(number=> (
                <div key={number}>
                    <button 
                    onClick={()=>goToPage(number)} 
                    className="btn-light">
                        {number}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Pagination