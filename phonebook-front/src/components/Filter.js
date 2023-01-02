const Filter = ({ value, onChange }) => (
    <div>
      <h2>Filter shown with</h2>
      <input value={value} onChange={onChange} />
    </div>
)

export default Filter