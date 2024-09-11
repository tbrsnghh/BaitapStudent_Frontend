import React, { useEffect, useState } from "react";  
import { Button, Container, Table, Alert } from "reactstrap";  
import { useDispatch, useSelector } from "react-redux";  
import { deleteStudent, getAlll, resetStatusAndMessage } from "../../redux/studentSlice";  
import ReactPaginate from "react-paginate";  

export default function Student() {  
  const [currentPage, setCurrentPage] = useState(0);  
  const [showMessage, setShowMessage] = useState(false); // Local state to control message visibility  
  const limit = 5;  
  const dispatch = useDispatch();  
  
  const { totalPages, students, status, message } = useSelector((state) => state.student);  

  useEffect(() => {  
    dispatch(getAlll({ currentPage, limit }));  
  }, [currentPage, dispatch]);  

  useEffect(() => {  
    if (status && message) {  
      setShowMessage(true);  
      const timer = setTimeout(() => {  
        setShowMessage(false);  
        dispatch(resetStatusAndMessage()); // Reset status and message  
      }, 2000);  
      return () => clearTimeout(timer);  
    }  
  }, [status, message, dispatch]);  

  const handlePageClick = (event) => {  
    setCurrentPage(event.selected);  
  };  

  const handleDeleteStudent = (id) => {  
    dispatch(deleteStudent(id));  
  };  

  return (  
    <Container>  
      {showMessage && (  
        <Alert color={status === 200 ? "success" : "danger"}>  
          {message}  
        </Alert>  
      )}  
      <h1>Total: {totalPages}</h1>  
      <Table striped>  
        <thead>  
          <tr>  
            <th>#</th>  
            <th>Tên sinh viên</th>  
            <th>Thành phố</th>  
            <th>Delete</th>  
          </tr>  
        </thead>  
        <tbody>  
          {students &&  
            students.map((item, index) => (  
              <tr key={index}>  
                <td>{index + 1}</td>  
                <td>{item.ten}</td>  
                <td>{item.thanhPho}</td>  
                <td>  
                  <Button  
                    className="btn btn-danger"  
                    onClick={() => {  
                      if (window.confirm("Are you sure you want to delete this student?")) {  
                        handleDeleteStudent(item.id);  
                      }  
                    }}  
                  >  
                    <i className="fa-solid fa-delete-left"></i>  
                  </Button>  
                </td>  
              </tr>  
            ))}  
        </tbody>  
      </Table>  
      <ReactPaginate  
        previousLabel={"Previous"}  
        nextLabel={"Next"}  
        breakLabel={"..."}  
        pageCount={Math.ceil(totalPages)}  
        marginPagesDisplayed={2}  
        pageRangeDisplayed={5}  
        onPageChange={handlePageClick}  
        containerClassName={"pagination"}  
        pageClassName={"page-item"}  
        pageLinkClassName={"page-link"}  
        previousClassName={"page-item"}  
        nextClassName={"page-item"}  
        previousLinkClassName={"page-link"}  
        nextLinkClassName={"page-link"}  
        breakClassName={"page-item"}  
        breakLinkClassName={"page-link"}  
        activeClassName={"active"}  
      />  
    </Container>  
  );  
}