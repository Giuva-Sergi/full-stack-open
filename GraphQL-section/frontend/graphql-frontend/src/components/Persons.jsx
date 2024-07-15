import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Person from "./Person";

const FIND_PERSON_BY_NAME = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

function Persons({ persons }) {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON_BY_NAME, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });
  //   const [loadPerson, { data }] = useLazyQuery(FIND_PERSON_BY_NAME, {
  //     variables: {
  //       nameToSearch: nameToSearch,
  //     },
  //   });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }
  //   if (nameToSearch && data) {
  //     return (
  //       <Person person={data.findPerson} onClose={() => setNameToSearch(null)} />
  //     );
  //   }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
          {/* <button
            onClick={() => {
              setNameToSearch(p.name);
              loadPerson();
            }}
          >
            show address
          </button> */}
        </div>
      ))}
    </div>
  );
}

export default Persons;
