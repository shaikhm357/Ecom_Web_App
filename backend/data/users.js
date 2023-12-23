import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Uer",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "Sara William",
    email: "sara@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  }
];

export default users;
