exports.handler = async (event) => {
    console.log("Hello from spaces lambda!");

    return {
        statusCode: 200,
        body: "Hello from spaces lambda!"
    };
};
