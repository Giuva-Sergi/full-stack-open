const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const typeDefs = `

    enum YesNo {
        YES
        NO
    }

    type Address {
        street: String!
        city: String!
}

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
}

    type Query {
        personCount: Int!
        allPersons(phone:YesNo): [Person!]!
        findPerson(name: String!): Person
}

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person 

        editNumber(
            name: String!
            phone: String!
        ): Person
}
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons;
      }
      if (args.phone === "YES") {
        return persons.filter((p) => p.phone);
      }
      if (args.phone === "NO") {
        return persons.filter((p) => !p.phone);
      }
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args, id: uuid() };
      persons = [...persons, person];
      return person;
    },
    editNumber: (root, args) => {
      if (!args.phone) {
        throw new GraphQLError("Missing phone number", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.phone,
          },
        });
      }
      const personIndex = persons.findIndex((p) => p.name === args.name);
      if (personIndex === -1) {
        throw new GraphQLError("Person not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const person = persons[personIndex];
      const updatedPerson = { ...person, phone: args.phone };
      return updatedPerson;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
