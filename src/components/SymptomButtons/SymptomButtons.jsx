import './SymptomButtons.scss';

const SymptomButton = ({ symptom, isSelected, onClick }) => (
  <button
    type="button"
    className={`symptom-button ${isSelected ? 'selected' : ''}`}
    onClick={() => onClick(symptom)}
  >
    {symptom.name}
  </button>
);

export default SymptomButton;