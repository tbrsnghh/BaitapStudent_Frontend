import React, { useState } from "react";
import Header from "../../components/header/Header";
import Student from "../../components/student/Student";
import { Button } from "reactstrap";
import AddNewStudent from "../../components/add/AddNewStudent";

export default function StudentPage() {
  return (
    <div>
      <Header />
      <h1>Student page</h1>
      <AddNewStudent/>
      <Student/>
    </div>
  );
}
