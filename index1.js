const http = require('http');
// Create server
http.createServer((req, res) => {
    console.log("Server running"); // corrected string syntax

    res.write("Hello Kits"); // writing response to client
    res.end(); // ending the response
}).listen(3000, () => {
    console.log("Server is listening on port 3000");
});
node