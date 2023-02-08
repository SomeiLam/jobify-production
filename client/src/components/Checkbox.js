const Checkbox = ({ label, value, onChange }) => {
  return (
    <div className='checkbox'>
      <label>{label}
        <input
          type='checkbox'
          checked={value}
          onChange={onChange}
        />
        <span className='checkmark'></span>
      </label>
    </div>
  );
};

export default Checkbox;
