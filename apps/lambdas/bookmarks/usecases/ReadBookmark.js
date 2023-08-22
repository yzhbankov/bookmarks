export class ReadBookmark {
    async execute(params) {
        console.log("Hello from ReadBookmark use case");
        console.log("params ", params);
        return {
            data: []
        }
    }
}
