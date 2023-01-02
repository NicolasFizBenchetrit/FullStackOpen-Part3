const PersonForm = ({toSave, handleChanges, dto}) => (
    <form onSubmit={toSave}>
      <div>
        name: <input name="name" value={dto.name} onChange={handleChanges} />
      </div>
      <div>
        number: <input name="number" value={dto.number} onChange={handleChanges} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)

export default PersonForm