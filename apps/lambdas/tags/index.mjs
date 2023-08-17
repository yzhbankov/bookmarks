exports.handler = async (event) => {
    console.log("Hello from tags lambda!");

    return {
        statusCode: 200,
        body: JSON.stringify("Hello from tags lambda!")
    };
};
