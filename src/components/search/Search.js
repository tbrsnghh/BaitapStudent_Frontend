import React, { useState } from 'react';  
import { useSelector } from 'react-redux';  

const Search = ({}) => {  
    const [searchQuery, setSearchQuery] = useState('');  
    const { students } = useSelector((state) => state.student);  

    // Xử lý cập nhật search query khi người dùng nhập vào input
    const handleSearch = (e) => {  
        setSearchQuery(e.target.value);  
    };  
    
    // Lọc sinh viên dựa trên tên nhập vào
    const filteredStudents = (students || []).filter(student =>   
        student.ten.toLowerCase().includes(searchQuery.toLowerCase())  
    );  

    return (  
        <div className="search-container">  
            <h2>Tìm kiếm sinh viên</h2>  
            <input  
                type="text"  
                placeholder="Nhập tên sinh viên..."  
                value={searchQuery}  
                onChange={handleSearch}  
            />  

            <div className="search-results">  
                {filteredStudents.length > 0 ? (  
                    <ul>  
                        {filteredStudents.map((student) => (  
                            <li key={student.id}>  
                                {student.ten} - {student.thanhpho}  
                            </li>  
                        ))}  
                    </ul>  
                ) : (  
                    <p>Không tìm thấy sinh viên nào.</p>  
                )}  
            </div>  
        </div>  
    );  
};  

export default Search;
