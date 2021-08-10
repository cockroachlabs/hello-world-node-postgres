const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");

(async () => {

  prompt.start()
  const URI = await prompt.get("connectionString");
  const connectionString = await URI.connectionString.replace('$HOME', process.env.HOME);
  var config = parse(connectionString);
  config.port = 26257;
  config.database = 'defaultdb';
  const client = new Client(config);

  // Connect to database
  try {
    await client.connect();
    console.log("Hey! You successfully connected to your CockroachDB cluster.")
  } catch (err) {
    console.log(`error connecting: ${err}`)
  }

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));
