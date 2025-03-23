import './SymptomButtons.scss';

const SymptomButton = ({ symptom, isSelected, onClick }) => (
  <button
    type="button"
    className={`symptom-button ${isSelected ? 'symptom-button--selected' : ''}`}
    onClick={() => onClick(symptom)}
  >
    {symptom.name}
  </button>
);

export default SymptomButton;