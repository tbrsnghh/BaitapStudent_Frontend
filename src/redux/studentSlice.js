import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import StudentPage from '../pages/student/StudentPage';

const BASE_URL = 'http://localhost:8080/api/v1/student';

export const getAlll=createAsyncThunk("student/getAll",async ({currentPage,limit},thunkAPI)=>{
    const url=BASE_URL + `/list?page=${currentPage}&size=${limit}`;
    try{
        const response=await axios.get(url);
        return response.data;
    }
    catch (error){
        return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
});
export const addStudent = createAsyncThunk('student/addNewStudent', async (student, thunkAPI) => {
  const url = BASE_URL;
  try {
    const response = await axios.post(url, student);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const deleteStudent = createAsyncThunk('student/deleteStudent', async (id, thunkAPI) => {
  const url = BASE_URL+`/${id}`;
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const studentSlice=createSlice({
  name: 'student',  
  initialState: {  
    status: 'idle',  
    error: null,  
    students: null,  
    totalPages: 0,  
    message: "",  
  },  
    reducers:{
      resetStatusAndMessage: (state) => {
        state.status = null;
        state.message = "";
        state.error=null;
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAlll.fulfilled,(state,action)=>{

            state.students=action.payload.data.studentResponseList
            state.totalPages=action.payload.data.totalPages
        })
        .addCase(addStudent.fulfilled,(state,action)=>{
          state.status=action.payload.status
          state.message=action.payload.message
          state.students=[action.payload.data,...state.students]
        })
        .addCase(addStudent.rejected, (state, action) => {
          state.status=action.payload.status
          state.message=action.payload.message
          state.error=action.payload.data
        })
        .addCase(deleteStudent.fulfilled,(state,action)=>{
          state.status=action.payload.status
          state.message=action.payload.message
          state.students=state.students.filter((student)=>student.id!==action.payload.data)
        })
    }
})
export const { resetStatusAndMessage } = studentSlice.actions;
export default studentSlice.reducer