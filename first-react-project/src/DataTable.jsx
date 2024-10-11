import React, { useState } from "react";


const data = [
  { lastName: "Ancheta", firstName: "James", course: "IT", birthdate: "2003-06-17" },
  { lastName: "Kim", firstName: "Sally", course: "IS", birthdate: "1999-05-15" },
  { lastName: "Zhang", firstName: "Maria", course: "CS", birthdate: "1998-04-14" },
  { lastName: "Rogers", firstName: "Kenny", course: "DS", birthdate: "1997-03-13" },
  
];

function DataTable() {
  const [filter, setFilter] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [ageFilter, setAgeFilter] = useState(""); 

  
  const calculateAge = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    return age;
  };

  
  const isWithinDateRange = (birthdate) => {
    const date = new Date(birthdate);
    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;

    
    const withinMin = min ? date >= min : true;
    const withinMax = max ? date <= max : true;

    return withinMin && withinMax;
  };

  
  return (
    <div className="table-container">
      <div className="input-container">
        
        <input
          type="text"
          placeholder="Filter by name or course"
          className="input-box" 
          onChange={(e) => setFilter(e.target.value)}
        />

        
        <input
          type="number"
          placeholder="Filter by age"
          className="input-box" 
          onChange={(e) => setAgeFilter(e.target.value)}
        />

        
        <div>
          <input
            type="date"
            placeholder="Min Date"
            value={minDate}
            className="input-box" 
            onChange={(e) => setMinDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Max Date"
            value={maxDate}
            className="input-box" 
            onChange={(e) => setMaxDate(e.target.value)}
          />
        </div>
      </div>

     
      <table className="data-table"> 
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              const matchesNameOrCourse =
                item.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                item.course.toLowerCase().includes(filter.toLowerCase());

              const withinDateRange = isWithinDateRange(item.birthdate);

              const age = calculateAge(item.birthdate);
              const matchesAge = ageFilter ? age === parseInt(ageFilter) : true;

              return matchesNameOrCourse && withinDateRange && matchesAge;
            })
            .map((item, index) => (
              <tr key={index}>
                <td>{item.lastName}</td>
                <td>{item.firstName}</td>
                <td>{item.course}</td>
                <td>{item.birthdate}</td>
                <td>{calculateAge(item.birthdate)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
