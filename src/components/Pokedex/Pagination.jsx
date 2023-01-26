import React from 'react';

const Pagination = ({page, maxPage, setPage}) => {

    const pagesPerBlock = 6
    const currentBlock = Math.ceil(page / pagesPerBlock)
    const maxBlock = Math.ceil(maxPage / pagesPerBlock)

    const arrPages = []
    const initialPage = (currentBlock - 1) * pagesPerBlock
    const finalPage = maxBlock === currentBlock ? maxPage : currentBlock * pagesPerBlock

    for(let i = initialPage; i <= finalPage; i++) {
        arrPages.push(i)
    }

    const handlePage = number => {
        setPage(number)
    }

    const handlePrevious = () => {
        if(page - 1 >= 1) {
            setPage(page - 1)
        }
    }

    const handleNext = () => {
        if (page + 1 <= maxPage) {
            setPage(page + 1)
        }
    }



    return (
        <div>
            <ul>
            <li onClick={handlePrevious}>&#60;</li>
                {
                    arrPages.map(e => (
                        <li onClick={() => handlePage(e)} key={e}>{e + 1}</li>
                    ))
                }
            <li onClick={handleNext}>&#62;</li>             
            </ul>
        </div>
    );
};

export default Pagination;