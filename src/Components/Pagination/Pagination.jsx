import ReactPaginate from "react-paginate";
import "./Pagination.css";


export default function PaginatedItems({ itemsPerPage, data, setPage,total }) {
    const pageCount = Math.ceil(total / itemsPerPage);

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={(e) => setPage(e.selected + 1)}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="custom-pagination d-flex justify-content-end align-items-center"
                pageLinkClassName="pagination-link mx-2  text-secondary rounded-circle text-center"
                activeLinkClassName="bg-primary text-white"
            />
        </>
    );
}