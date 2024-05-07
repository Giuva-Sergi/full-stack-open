function AddPersonForm({
  onAddPerson,
  newName,
  onSetNewName,
  newNumber,
  onSetNewNumber,
}) {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name: <input value={newName} onChange={onSetNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onSetNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default AddPersonForm;
