exports.handler = async (event) => {
    console.log("Hello from bookmarks lambda!");

    return {
        statusCode: 200,
        body: JSON.stringify("Hello from bookmarks lambda!")
    };
};
