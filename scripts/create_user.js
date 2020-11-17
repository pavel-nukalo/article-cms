const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const readline = require('readline');
const validator = require('email-validator');

const insertUser = async user => {
  const client = await MongoClient.connect(config.mongodb.url, { useUnifiedTopology: true });
  const db = client.db();
  await db.collection('users').insertOne(user);
  client.close();
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (str) => new Promise(resolve => rl.question(str, resolve));

const steps = {
  start: async () => {
    return steps.askFirstName({});
  },
  askFirstName: async user => {
    user.firstName = await question('Enter user first name: ');
    return steps.askLastName(user);
  },
  askLastName: async user => {
    user.lastName = await question('Enter user last name: ');
    return steps.askEmail(user);
  },
  askEmail: async user => {
    let email;

    do {
      email = await question('Enter user email: ');

      if (!validator.validate(email)) {
        console.log('Invalid email specified');
      }
    } while (!validator.validate(email));

    user.email = email;
    return steps.askPassword(user);
  },
  askPassword: async user => {
    user.password = await question('Enter user password: ');
    return steps.end(user);
  },
  end: async user => {
    try {
      await insertUser(user);
      console.log('User created successfully!');
    } catch (e) {
      console.error(`User document inserted unsuccessfully...`);
      console.error(e.message);
    }

    rl.close();
  },
};

steps.start();