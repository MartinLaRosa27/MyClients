const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  input usuarioInput {
    email: String!
    password: String!
    passwordAux: String
  }

  input clientInput {
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  type Client {
    _id: String
    name: String
    address: String
    email: String
    phone: String
    updatedAt: String
  }

  type Token {
    token: String
  }

  type Query {
    getAllClients: [Client]
    getClientById(id: String!): Client
    userValidation: Boolean
  }

  type Mutation {
    postUser(input: usuarioInput): Token
    authenticateUser(input: usuarioInput): Token
    postClient(input: clientInput): String
    patchClient(id: String!, input: clientInput): String
    deleteClient(id: String!): String
  }
`;
