exports.handler = async (event) => {
    console.log("Hello from tags lambda!");

    return {
        statusCode: 200,
        body: "Hello from tags lambda!"
    };
};
