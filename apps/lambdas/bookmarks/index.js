exports.handler = async (event) => {
    console.log("Hello from bookmarks lambda!");

    return {
        statusCode: 200,
        body: "Hello from bookmarks lambda!"
    };
};
