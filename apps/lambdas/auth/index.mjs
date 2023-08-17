exports.handler = async (event) => {
    console.log("Hello from auth lambda!");

    return {
        statusCode: 200,
        body: JSON.stringify("Hello from auth lambda!")
    };
};
