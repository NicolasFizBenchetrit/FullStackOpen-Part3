const ShowPhones = ({ person, handleDelete}) => (
        <li>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button></li>
)

export default ShowPhones;