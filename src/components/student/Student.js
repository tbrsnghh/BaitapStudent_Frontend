import React, { useEffect, useState } from "react";  
import { Button, Container, Table, Alert } from "reactstrap";  
import { useDispatch, useSelector } from "react-redux";  
import { deleteStudent, getAll, resetStatusAndMessage, editStudent, getAllPage } from "../../redux/studentSlice";  
import ReactPaginate from "react-paginate";  
import EditStudentModal from "../edit/EditStudentModal";
import Search from "../search/Search";


export default function Student() {  
  const [currentPage, setCurrentPage] = useState(0); 
  const limit = 5; 
  const [showMessage, setShowMessage] = useState(false);  
  const [modal, setModal] = useState(false);  
  const [editStudentData, setEditStudentData] = useState(
    { id: '', ten: '', thanhpho: '', ngsinh: '', xepLoai: '' });  
  
  const dispatch = useDispatch();  

  const { totalPages,students, status, message } = useSelector((state) => state.student);  

  useEffect(() => {  
    dispatch(getAllPage({ currentPage, limit }));  
  }, [currentPage, dispatch]);  

  useEffect(() => {  
    if (status && message) {  
      setShowMessage(true);  
      const timer = setTimeout(() => {  
        setShowMessage(false);  
        dispatch(resetStatusAndMessage());  
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

  const toggleModal = () => setModal(!modal);  

  const handleEditClick = (student) => { 
    setEditStudentData(student);  
    toggleModal();  
  };   

  const handleEditChange = (e) => {  
    setEditStudentData({ ...editStudentData, [e.target.name]: e.target.value });  
  };  

  const handleEditSubmit = (e) => {  
    e.preventDefault();  
    dispatch(editStudent({ id: editStudentData.id, student: editStudentData }));  
    toggleModal();  
  };  

  return (  
    <Container>  
      <Search 
      />
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
            <th>ID</th>  
            <th>Tên sinh viên</th>  
            <th>Thành phố</th>  
            <th>Ngày sinh</th>  
            <th>Xếp loại</th>  
            <th>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {students &&  
            students.map((item, index) => (  
              <tr key={index}>  
                <td>{index + 1}</td>  
                <td>{item.id}</td>  
                <td>{item.ten}</td>  
                <td>{item.thanhpho}</td>  
                <td>{item.ngsinh}</td>  
                <td>{item.xepLoai}</td>   
                <td>  
                  <Button  
                    className="btn btn-warning"  
                    onClick={() => handleEditClick(item)}  
                  >  
                    <i class="fa-solid fa-pen-to-square"></i>  
                  </Button>  
                  <Button  
                    className="btn btn-danger"  
                    onClick={() => {  
                      if (window.confirm("Bạn có chắc muốn xóa?")) {  
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

      <EditStudentModal 
        isOpen={modal}
        toggleModal={toggleModal}
        editStudentData={editStudentData}
        handleEditChange={handleEditChange}
        handleEditSubmit={handleEditSubmit}
      />
    </Container>  
  );  
}
