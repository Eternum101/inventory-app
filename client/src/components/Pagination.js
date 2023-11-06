import '../styles/Pagination.css'

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
            <a href="#">&laquo;</a>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <a 
                            onClick={(event) => {
                                event.preventDefault();
                                paginate(number);
                            }} 
                            href='!#' 
                            className='page-link'
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <a href="#">&raquo;</a>
            </ul>
        </nav>
    );
}

export default Pagination;