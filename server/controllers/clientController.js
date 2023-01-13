const Client = require("../models/Client");
const { formatDate } = require("../helpers/formatDate");

module.exports.getAllClients = async (user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    const clients = await Client.find({ userId: user._id }).sort({
      updatedAt: "desc",
    });
    return clients;
  } catch (e) {
    console.log(e);
    throw new Error("Cannot get the registerd clients by the user");
  }
};

module.exports.getClientById = async (id, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  let client = [];
  try {
    client = await Client.findOne({
      _id: id,
      userId: user._id,
    }).sort({ updatedAt: "desc" });
  } catch (e) {
    console.log(e);
  }
  return client;
};

module.exports.postClient = async (input, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    input.userId = user._id;
    const client = new Client(input);
    await client.save();
    return "Client record created succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot create the client record");
  }
};

module.exports.patchClient = async (id, input, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  input.updatedAt = formatDate(Date.now());
  try {
    await Client.findOneAndUpdate({ _id: id, userId: user._id }, input, {
      new: true,
    });
    return "Client record updated succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot update the client record");
  }
};

module.exports.deleteClient = async (id, user) => {
  if (!user) {
    throw new Error("Session Expired");
  }
  try {
    await Client.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    return "Client record deleted succesfully";
  } catch (e) {
    console.log(e);
    throw new Error("Cannot delete the client record");
  }
};
