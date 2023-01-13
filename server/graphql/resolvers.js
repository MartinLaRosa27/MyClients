const {
  postUser,
  authenticateUser,
  userValidation,
} = require("../controllers/userController");
const {
  postClient,
  patchClient,
  getAllClients,
  getClientById,
  deleteClient,
} = require("../controllers/clientController");

module.exports.resolvers = {
  Query: {
    // Client:
    getAllClients: (root, {}, context) => {
      return getAllClients(context.user);
    },

    getClientById: (root, { id }, context) => {
      return getClientById(id, context.user);
    },
    // User:
    userValidation: (root, {}, context) => {
      console.log(context.user);
      return userValidation(context.user);
    },
  },

  Mutation: {
    // User:
    postUser: (root, { input }, context) => {
      return postUser(input);
    },

    authenticateUser: (root, { input }, context) => {
      return authenticateUser(input);
    },

    // Client:
    postClient: (root, { input }, context) => {
      return postClient(input, context.user);
    },

    patchClient: (root, { id, input }, context) => {
      return patchClient(id, input, context.user);
    },

    deleteClient: (root, { id }, context) => {
      return deleteClient(id, context.user);
    },
  },
};
