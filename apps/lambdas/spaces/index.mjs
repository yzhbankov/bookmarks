exports.handler = async (event) => {
    console.log("Hello from spaces lambda!");

    return {
        statusCode: 200,
        body: JSON.stringify("Hello from spaces lambda!")
    };
};
