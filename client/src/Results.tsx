import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

interface FormData {
  workNature: string | null;
  isMainEarner: string | null;
  birthYear: string | null;
  birthMonth: string | null;
  birthPincode: string | null;
  workPincode: string | null;
}

interface UserDetails {
  name: string;
  phone: string;
}

interface ValidationErrors {
  name: string;
  phone: string;
}

interface GitaPersonality {
  personality: string;
  strengths: string;
  weaknesses: string;
}

interface CharacterMapType {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
}

const personalityData: { [key: string]: GitaPersonality } = {
  Krishna: {
    personality: "You are a charismatic strategist who balances persuasion and leadership to achieve success.",
    strengths: "Visionary, diplomatic, adaptable.",
    weaknesses: "Can be manipulative, always two steps ahead of others."
  },
  Arjuna: {
    personality: "You are highly skilled and goal-oriented, always striving for excellence.",
    strengths: "Determined, disciplined, courageous.",
    weaknesses: "Can overthink decisions, struggles with self-doubt."
  },
  Karna: {
    personality: "You are resilient and self-made, determined to prove your worth.",
    strengths: "Hardworking, loyal, unwavering in principles.",
    weaknesses: "Emotional, holds grudges, struggles with acceptance."
  },
  Bhishma: {
    personality: "You are duty-bound and unwavering, prioritizing responsibility over personal desires.",
    strengths: "Wise, disciplined, powerful.",
    weaknesses: "Stubborn, clings to outdated traditions, resists change."
  },
  Duryodhana: {
    personality: "You are strong-willed and ambitious, never backing down from a challenge.",
    strengths: "Fearless, determined, charismatic.",
    weaknesses: "Arrogant, envious, refuses to see alternative perspectives."
  },
  Yudhishthira: {
    personality: "You are principled and fair, always striving for justice.",
    strengths: "Honest, patient, morally upright.",
    weaknesses: "Overly trusting, hesitant in tough decisions."
  },
  Vidura: {
    personality: "You are thoughtful and intelligent, guiding others with your wisdom.",
    strengths: "Logical, diplomatic, truthful.",
    weaknesses: "Avoids confrontation, often underappreciated."
  },
  Drona: {
    personality: "You are a teacher and leader, passing down knowledge and discipline.",
    strengths: "Intelligent, respected, skilled.",
    weaknesses: "Biased, can be too rigid in discipline."
  },
  Kunti: {
    personality: "You are nurturing and wise, balancing love with strategic thinking.",
    strengths: "Strong-willed, patient, resilient.",
    weaknesses: "Struggles with guilt, sometimes sacrifices too much."
  },
  Draupadi: {
    personality: "You are bold and passionate, standing up against injustice.",
    strengths: "Fearless, outspoken, fiercely loyal.",
    weaknesses: "Holds grudges, emotionally intense."
  },
  Ashwatthama: {
    personality: "You are driven and relentless, seeking to prove your worth.",
    strengths: "Powerful, determined, strategic.",
    weaknesses: "Can be impulsive, struggles with moral dilemmas."
  },
  Subhadra: {
    personality: "You are compassionate and strong-willed, protecting those you love.",
    strengths: "Loyal, adaptable, nurturing.",
    weaknesses: "Overprotective, sometimes hesitant to take risks."
  },
  Gandhari: {
    personality: "You are loyal and dutiful, standing by your loved ones at all costs.",
    strengths: "Patient, strong in faith, supportive.",
    weaknesses: "Blind to faults, overly attached to family."
  },
  Parashurama: {
    personality: "You are fierce and just, balancing knowledge with warrior instincts.",
    strengths: "Fearless, powerful, deeply knowledgeable.",
    weaknesses: "Quick to anger, struggles with forgiveness."
  },
  Narada: {
    personality: "You are free-spirited and wise, embracing life's constant change.",
    strengths: "Persuasive, adaptable, charming.",
    weaknesses: "Mischievous, sometimes provokes conflict for learning."
  },
  Nakula: {
    personality: "You are calm and resourceful, valuing stability and intelligence.",
    strengths: "Practical, intelligent, good under pressure.",
    weaknesses: "Avoids risk, doesn't seek the spotlight."
  },
  Sahadeva: {
    personality: "You are a deep thinker, absorbing knowledge before speaking.",
    strengths: "Insightful, analytical, observant.",
    weaknesses: "Can be too reserved, hesitant to take initiative."
  }
};

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as FormData;
  const [isRevealed, setIsRevealed] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({ name: '', phone: '' });

  const determineCharacter = (data: FormData) => {
    if (!data) return null;

    // Convert birth month to the modifier category
    const getMonthModifier = (month: string | null) => {
      if (!month) return '';
      const monthIndex = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'].indexOf(month);
      
      if (monthIndex === 0 || monthIndex === 1) return 'Jan-Feb (Disciplined)';
      if (monthIndex === 2 || monthIndex === 3) return 'Mar-Apr (Fiery)';
      if (monthIndex === 4 || monthIndex === 5) return 'May-Jun (Smart)';
      if (monthIndex === 6 || monthIndex === 7) return 'Jul-Aug (Emotional)';
      if (monthIndex === 8 || monthIndex === 9) return 'Sep-Oct (Balanced)';
      return 'Nov-Dec (Intense)';
    };

    // Determine if birth and work locations are same or different
    const locationStatus = data.birthPincode === data.workPincode ? 'Same' : 'Moved';
    
    // Clean up work nature to match table format
    const workType = data.workNature === 'Healthcare (doctor, nurse, etc)' ? 'Healthcare' : data.workNature;

    // Get month modifier
    const monthMod = getMonthModifier(data.birthMonth);

    // Character mapping based on Gita Table
    const characterMap: CharacterMapType = {
      'Business': {
        'Yes': {
          'Same': {
            'Jan-Feb (Disciplined)': 'Bhishma',
            'Mar-Apr (Fiery)': 'Duryodhana',
            'May-Jun (Smart)': 'Krishna',
            'Jul-Aug (Emotional)': 'Karna',
            'Sep-Oct (Balanced)': 'Yudhishthira',
            'Nov-Dec (Intense)': 'Karna'
          },
          'Moved': {
            'May-Jun (Smart)': 'Krishna',
            'Jul-Aug (Emotional)': 'Karna',
            'Nov-Dec (Intense)': 'Karna'
          }
        },
        'No': {
          'Same': {
            'Sep-Oct (Balanced)': 'Yudhishthira'
          },
          'Moved': {
            'Nov-Dec (Intense)': 'Karna'
          }
        }
      },
      'Govt Service': {
        'Yes': {
          'Same': {
            'Jan-Feb (Disciplined)': 'Bhishma'
          },
          'Moved': {
            'Mar-Apr (Fiery)': 'Karna'
          }
        },
        'No': {
          'Same': {
            'May-Jun (Smart)': 'Vidura'
          },
          'Moved': {
            'Jul-Aug (Emotional)': 'Drona'
          }
        }
      },
      'Teacher': {
        'Yes': {
          'Same': {
            'Sep-Oct (Balanced)': 'Drona'
          },
          'Moved': {
            'Nov-Dec (Intense)': 'Krishna'
          }
        },
        'No': {
          'Same': {
            'Jan-Feb (Disciplined)': 'Vidura'
          },
          'Moved': {
            'Mar-Apr (Fiery)': 'Parashurama'
          }
        }
      },
      'IT/Engineer': {
        'Yes': {
          'Same': {
            'May-Jun (Smart)': 'Arjuna'
          },
          'Moved': {
            'Jul-Aug (Emotional)': 'Karna'
          }
        },
        'No': {
          'Same': {
            'Sep-Oct (Balanced)': 'Nakula'
          },
          'Moved': {
            'Nov-Dec (Intense)': 'Sahadeva'
          }
        }
      },
      'Healthcare': {
        'Yes': {
          'Same': {
            'Jan-Feb (Disciplined)': 'Bhishma'
          },
          'Moved': {
            'Mar-Apr (Fiery)': 'Karna'
          }
        },
        'No': {
          'Same': {
            'May-Jun (Smart)': 'Kunti'
          },
          'Moved': {
            'Jul-Aug (Emotional)': 'Ashwatthama'
          }
        }
      },
      'Housewife': {
        'Yes': {
          'Same': {
            'Sep-Oct (Balanced)': 'Kunti'
          },
          'Moved': {
            'Nov-Dec (Intense)': 'Draupadi'
          }
        },
        'No': {
          'Same': {
            'Jan-Feb (Disciplined)': 'Subhadra'
          },
          'Moved': {
            'Mar-Apr (Fiery)': 'Gandhari'
          }
        }
      },
      'Other': {
        'Yes': {
          'Same': {
            'May-Jun (Smart)': 'Narada'
          },
          'Moved': {
            'Jul-Aug (Emotional)': 'Narada'
          }
        },
        'No': {
          'Same': {
            'Sep-Oct (Balanced)': 'Vidura'
          },
          'Moved': {
            'Nov-Dec (Intense)': 'Parashurama'
          }
        }
      }
    };

    try {
      if (!workType || !data.isMainEarner || !locationStatus || !monthMod) {
        return 'Arjuna';
      }
      return characterMap[workType]?.[data.isMainEarner]?.[locationStatus]?.[monthMod] || 'Arjuna';
    } catch {
      return 'Arjuna';
    }
  };

  const handleRevealClick = () => {
    setShowUserForm(true);
  };

  const validateName = (name: string) => {
    if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!/^\d+$/.test(phone)) {
      return 'Phone number can only contain digits';
    }
    if (phone.length !== 10) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserDetails(prev => ({ ...prev, name }));
    if (hasSubmitted) {
      setErrors(prev => ({ ...prev, name: validateName(name) }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    if (phone.length <= 10 && /^\d*$/.test(phone)) {
      setUserDetails(prev => ({ ...prev, phone }));
      if (hasSubmitted) {
        setErrors(prev => ({ ...prev, phone: validatePhone(phone) }));
      }
    }
  };

  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    const nameError = validateName(userDetails.name);
    const phoneError = validatePhone(userDetails.phone);
    
    setErrors({ name: nameError, phone: phoneError });

    if (!nameError && !phoneError) {
      setIsRevealed(true);
      setShowUserForm(false);
    }
  };

  if (!formData) {
    return (
      <div className="results-error">
        <h2>No quiz data found</h2>
        <button onClick={() => navigate('/')}>Take the Quiz</button>
      </div>
    );
  }

  const character = determineCharacter(formData);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h1 className="quiz-title">Gita Quiz</h1>
      </div>

      <div className={`quiz-card ${!isRevealed ? 'not-revealed' : ''}`} style={{ position: 'relative' }}>
        <div className="question-image-container">
          <img 
            src="/GitaImages/Result.png" 
            alt="Bhagavad Gita Result" 
            className={`question-image ${!isRevealed ? 'blurred-content' : ''}`}
          />
        </div>
        
        <div className="result-content">
          <h2 className="result-heading">Your Bhagavad Gita personality:</h2>
          <div className="character-name-container">
            <div className={!isRevealed ? 'blurred-content' : ''}>
              <h1 className="character-name">{character}</h1>
              {isRevealed && character && personalityData[character as keyof typeof personalityData] && (
                <div className="personality-traits">
                  <div className="personality-trait">
                    <span className="trait-emoji">💡</span>
                    <div className="trait-label">Personality:</div>
                    <div className="trait-text">{personalityData[character as keyof typeof personalityData].personality}</div>
                  </div>
                </div>
              )}
            </div>
            {!isRevealed && !showUserForm && (
              <button className="reveal-button" onClick={handleRevealClick}>
                Reveal Now
              </button>
            )}
          </div>
        </div>

        {showUserForm && (
          <div className="user-form-overlay" onClick={(e) => {
            // Close the form if clicking outside the form area
            if ((e.target as HTMLElement).className === 'user-form-overlay') {
              setShowUserForm(false);
            }
          }}>
            <form className="user-form" onSubmit={handleUserFormSubmit}>
              <h3>Enter Your Details to Reveal</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userDetails.name}
                  onChange={handleNameChange}
                  className={hasSubmitted && errors.name ? 'error' : ''}
                  required
                />
                {hasSubmitted && errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handlePhoneChange}
                  className={hasSubmitted && errors.phone ? 'error' : ''}
                  required
                />
                {hasSubmitted && errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <button 
                type="submit" 
                disabled={hasSubmitted && (!!errors.name || !!errors.phone || !userDetails.name || !userDetails.phone)}
              >
                Submit
              </button>
            </form>
          </div>
        )}

        <div className="navigation-buttons">
          {!showUserForm && (
            <button 
              className="nav-button"
              onClick={() => navigate('/')}
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results; 