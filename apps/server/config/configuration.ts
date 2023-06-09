export default () => ({
  server: {
    port: parseInt(process.env.BOOKMARKS_SERVER_PORT, 10),
  },
  domain: process.env.BOOKMARKS_DOMAIN,
  google: {
    clientID: process.env.BOOKMARKS_GOOGLE_CLIENT_ID,
    clientSecret: process.env.BOOKMARKS_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BOOKMARKS_GOOGLE_CALLBACK_URL,
  },
  jwt: {
    secret: process.env.BOOKMARKS_JWT_SECRET,
  },
  database: {
    user: process.env.BOOKMARKS_DB_USER,
    password: process.env.BOOKMARKS_DB_PWD,
    host: process.env.BOOKMARKS_DB_HOST,
    schema: process.env.BOOKMARKS_DB_SCHEMA,
    port: parseInt(process.env.BOOKMARKS_DB_PORT, 10),
  },
});
