import React, { useState } from 'react';
import './App.css';

function App() {
  const [numSubjects, setNumSubjects] = useState(0);
  const [grades, setGrades] = useState([]);
  const [spi, setSpi] = useState(null);

  const handleNumSubjectsChange = (event) => {
    const number = parseInt(event.target.value, 10);
    setNumSubjects(number);
    setGrades(Array(number).fill({ subject: '', grade: '', credit: '' }));
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...grades];
    values[index] = { ...values[index], [name]: value };
    setGrades(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateSPI();
  };

  const calculateSPI = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    grades.forEach((course) => {
      const gradePoint = getGradePoint(course.grade);
      totalGradePoints += gradePoint * parseFloat(course.credit);
      totalCredits += parseFloat(course.credit);
    });

    const spi = totalGradePoints / totalCredits;
    setSpi(spi.toFixed(2));
  };

  const getGradePoint = (grade) => {
    switch (grade.toUpperCase()) {
      case 'A+': return 10;
      case 'A': return 9;
      case 'B+': return 8;
      case 'B': return 7;
      case 'C+': return 6;
      case 'C': return 5;
      case 'D+': return 4;
      case 'D': return 3;
      case 'E': return 2;
      case 'F': return 0;
      default: return 0;
    }
  };

  return (
    <div className="App">
      <h1>SPI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number of Subjects:
            <input
              type="number"
              value={numSubjects}
              onChange={handleNumSubjectsChange}
              min="1"
              required
            />
          </label>
        </div>
        {grades.map((grade, index) => (
          <div key={index} className="grade-input">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={grade.subject}
              onChange={(event) => handleChange(index, event)}
              required
            />
            <select
              name="grade"
              value={grade.grade}
              onChange={(event) => handleChange(index, event)}
              required
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
            <input
              type="number"
              name="credit"
              placeholder="Credits"
              value={grade.credit}
              onChange={(event) => handleChange(index, event)}
              required
              min="1"
            />
          </div>
        ))}
        {numSubjects > 0 && <button type="submit">Calculate SPI</button>}
      </form>
      {spi && <h2>Your SPI is: {spi}</h2>}
    </div>
  );
}

export default App;
