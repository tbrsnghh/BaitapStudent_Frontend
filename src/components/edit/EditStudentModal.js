import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default function EditStudentModal({ isOpen, toggleModal, editStudentData, handleEditChange, handleEditSubmit }) {
  const mapXepLoai = (value) => {
    switch (value) {
      case "KHA":
        return "Khá";
      case "GIOI":
        return "Giỏi";
      case "TRUNG_BINH":
        return "Trung bình";
      case "YEU":
        return "Yếu";
      default:
        return value;
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Edit Student</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleEditSubmit}>
          <FormGroup>
            <Label for="ten">Tên sinh viên</Label>
            <Input
              type="text"
              name="ten"
              value={editStudentData.ten}
              onChange={handleEditChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="thanhPho">Thành phố</Label>
            <Input
              type="text"
              name="thanhpho"
              value={editStudentData.thanhpho}
              onChange={handleEditChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="ngsinh">Date of Birth</Label>
            <Input
              type="date"
              id="ngsinh"
              name="ngsinh"
              value={editStudentData.ngsinh}
              onChange={handleEditChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="xepLoai">Xếp loại</Label>
            <Input
              type="select"
              id="xepLoai"
              name="xepLoai"
              value={mapXepLoai(editStudentData.xepLoai)}
              onChange={handleEditChange}
              required
            >
              <option>Giỏi</option>
              <option>Khá</option>
              <option>Trung bình</option>
              <option>Yếu</option>
            </Input>
          </FormGroup>
          <ModalFooter>
            <Button type="submit" color="primary">Save</Button>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
