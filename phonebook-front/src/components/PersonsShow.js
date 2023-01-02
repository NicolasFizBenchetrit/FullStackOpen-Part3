import ShowPhones from "./ShowPhones"

const PersonsShow = ({personsToShow, handleDelete}) => (
    <ul>
      {personsToShow.map(person => <ShowPhones key={person.id} person={person} handleDelete={handleDelete}/>)}
    </ul>
)

  export default PersonsShow