import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

interface FormData {
  workNature: string | null;
  isMainEarner: string | null;
  birthYear: string | null;
  birthMonth: string | null;
  birthPincode: string | null;
  workPincode: string | null;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const [formData, setFormData] = useState<FormData>({
    workNature: null,
    isMainEarner: null,
    birthYear: null,
    birthMonth: null,
    birthPincode: null,
    workPincode: null,
  });

  // Validation for pincode
  const validatePincode = (pincode: string): boolean => {
    return /^\d{6}$/.test(pincode);
  };

  // Generate year options (100 years back from 1995)
  const yearOptions = Array.from({ length: 100 }, (_, i) => 1995 - i);

  // Month options
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const workOptions = [
    'Business',
    'Govt Service',
    'Teacher',
    'IT/Engineer',
    'Healthcare (doctor, nurse, etc)',
    'Housewife',
    'Other'
  ];

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Navigate to results page with form data
      navigate('/results', { state: { formData } });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const canProceed = (): boolean => {
    switch (currentPage) {
      case 1:
        return !!formData.workNature;
      case 2:
        return !!formData.isMainEarner;
      case 3:
        return !!formData.birthYear && !!formData.birthMonth;
      case 4:
        return validatePincode(formData.birthPincode || '') && 
               validatePincode(formData.workPincode || '');
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    // Function to get the appropriate image for the current page
    const getQuestionImage = (page: number) => {
      return (
        <div className="question-image-container">
          <img 
            src={`/GitaImages/Question${page}.png`} 
            alt={`Question ${page}`} 
            className="question-image"
          />
        </div>
      );
    };

    switch (currentPage) {
      case 1:
        return (
          <>
            {getQuestionImage(1)}
            <h2 className="question-text">What is your nature of work?</h2>
            <div className="options-container">
              {workOptions.map((option) => (
                <button
                  key={option}
                  className={`option-button ${formData.workNature === option ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, workNature: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <>
            {getQuestionImage(2)}
            <h2 className="question-text">Are you the main earning member of your family?</h2>
            <div className="options-container">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  className={`option-button ${formData.isMainEarner === option ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, isMainEarner: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        );

      case 3:
        return (
          <>
            {getQuestionImage(3)}
            <div className="birth-details">
              <div className="birth-year">
                <h2 className="question-text">What is your year of birth?</h2>
                <select
                  value={formData.birthYear || ''}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  className="date-picker"
                  aria-label="Select birth year"
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="birth-month">
                <h2 className="question-text">What is your month of birth?</h2>
                <select
                  value={formData.birthMonth || ''}
                  onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                  className="date-picker"
                  aria-label="Select birth month"
                >
                  <option value="">Select Month</option>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            {getQuestionImage(4)}
            <div className="pincode-container">
              <div className="pincode-input">
                <h2 className="question-text">Where were you born? (Enter Pincode)</h2>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.birthPincode || ''}
                  onChange={(e) => {
                    // Limit to 6 digits and remove non-digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFormData({ ...formData, birthPincode: value });
                  }}
                  className="pincode-field"
                  placeholder="Enter 6-digit pincode"
                  aria-label="Birth place pincode"
                />
                {formData.birthPincode && !validatePincode(formData.birthPincode) && (
                  <div className="error-message">Please enter a valid 6-digit pincode</div>
                )}
              </div>

              <div className="pincode-input">
                <h2 className="question-text">Where are you working now? (Enter Pincode)</h2>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.workPincode || ''}
                  onChange={(e) => {
                    // Limit to 6 digits and remove non-digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFormData({ ...formData, workPincode: value });
                  }}
                  className="pincode-field"
                  placeholder="Enter 6-digit pincode"
                  aria-label="Work place pincode"
                />
                {formData.workPincode && !validatePincode(formData.workPincode) && (
                  <div className="error-message">Please enter a valid 6-digit pincode</div>
                )}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">←</button>
        <h1 className="quiz-title">Gita Quiz</h1>
      </div>

      <div className="quiz-card">
        <div className="question-header">
          <span className="question-number">Page: {currentPage}/{totalPages}</span>
        </div>

        <div className="quiz-content">
          {renderQuestion()}
        </div>

        <div className="navigation-buttons">
          {currentPage !== 1 && (
            <button 
              className="nav-button" 
              onClick={handlePrevious}
              aria-label="Previous page"
            >
              Previous
            </button>
          )}
          <button 
            className="nav-button"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ marginLeft: currentPage === 1 ? 'auto' : '0' }}
            aria-label={currentPage === totalPages ? "Submit quiz" : "Next page"}
          >
            {currentPage === totalPages ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 