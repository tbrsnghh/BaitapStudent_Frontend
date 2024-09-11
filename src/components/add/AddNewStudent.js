import React, { useEffect, useState } from "react";  
import {  
  Button,  
  FormGroup,  
  Input,  
  Label,  
  Modal,  
  ModalBody,  
  ModalFooter,  
  ModalHeader,  
} from "reactstrap";  
import { useDispatch, useSelector } from "react-redux";  
import {  
  addStudent,  
  resetStatusAndMessage,  
} from "../../redux/studentSlice";  
import { toast, ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  

const AddNewStudent = () => {  
  const [modal, setModal] = useState(false);  
  const [student, setStudent] = useState({  
    ten: "Hoang An",  
    thanhpho: "Sai Gon",  
    ngsinh: "2022-02-05", // Initial format: YYYY-MM-DD  
    xepLoai: "Giỏi",  
  });  

  const { status, message, error } = useSelector((state) => state.student);  
  const dispatch = useDispatch();  

  const toggle = () => {  
    setModal(!modal);  
    if (modal) {  
      // Reset errors when modal is closed  
      dispatch(resetStatusAndMessage());  
    }  
  };  

  const handleAdd = () => {  
    dispatch(addStudent(student));  
  };  

  const handleChange = ({ target: { name, value } }) => {  
    setStudent((prevState) => ({ ...prevState, [name]: value }));  
  };  

  useEffect(() => {  
    if (status && message) {  
      if (status === 200) {  
        toast.success(message);  
        setModal(false); // Close modal if success  
      } 
      else {  
        toast.error(message);  
      }  
    }  
  }, [status, message]);  

  return (  
    <>  
      <ToastContainer />  
      <Button className="btn btn-success" onClick={toggle}>  
        Add New Student  
      </Button>  
      <Modal isOpen={modal} toggle={toggle}>  
        <ModalHeader toggle={toggle}>Add New Student</ModalHeader>  
        <ModalBody>  
          <FormGroup>  
            <Label for="ten">Student Name</Label>  
            <Input  
              type="text"  
              id="ten"  
              name="ten"  
              value={student.ten}  
              onChange={handleChange}  
              required  
            />  
          </FormGroup>  
          <FormGroup>  
            <Label for="thanhpho">City</Label>  
            <Input  
              type="text"  
              id="thanhpho"  
              name="thanhpho"  
              value={student.thanhpho}  
              onChange={handleChange}  
              required  
            />  
          </FormGroup>  
          <FormGroup>  
            <Label for="ngsinh">Date of Birth</Label>  
            <Input  
              type="date"  
              id="ngsinh"  
              name="ngsinh"  
              value={student.ngsinh}  
              onChange={handleChange}  
              required  
            />  
          </FormGroup>  
          <FormGroup>  
            <Label for="xepLoai">Classification</Label>  
            <Input  
              type="select"  
              id="xepLoai"  
              name="xepLoai"  
              value={student.xepLoai}  
              onChange={handleChange}  
              required  
            >  
              <option>Giỏi</option>  
              <option>Khá</option>  
              <option>Trung bình</option>  
              <option>Yếu</option>  
            </Input>  
          </FormGroup>  
          {error && (  
            <div className="text-danger">  
              <ul>  
                {error.map((err, index) => (  
                  <li key={index}>{err}</li>  
                ))}  
              </ul>  
            </div>  
          )}  
        </ModalBody>  
        <ModalFooter>  
          <Button color="secondary" onClick={toggle}>  
            Cancel  
          </Button>  
          <Button color="primary" onClick={handleAdd}>  
            Add Student  
          </Button>  
        </ModalFooter>  
      </Modal>  
    </>  
  );  
};  

export default AddNewStudent;