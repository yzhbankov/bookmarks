export default () => ({
  server: {
    port: parseInt(process.env.BOOKMARKS_SERVER_PORT, 10),
  },
  database: {
    user: process.env.BOOKMARKS_DB_USER,
    password: process.env.BOOKMARKS_DB_PWD,
    host: process.env.BOOKMARKS_DB_HOST,
    schema: process.env.BOOKMARKS_DB_SCHEMA,
    port: parseInt(process.env.BOOKMARKS_DB_PORT, 10),
  },
});
