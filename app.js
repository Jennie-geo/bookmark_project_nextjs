const express = require("express");
const fs = require("fs");

const app = express();

// Define the HTTP route for streaming video
app.get("/video", (req, res) => {

    // The path to the video file we will stream
    const path = "Mailtrap - A Fake SMTP Server For Pre-Production Email Testing.mp4";
    fs.stat(path, (err, stats) => {
        // Handle errors
        if (err) {
            console.error("An error occurred: ", err);
            res.sendStatus(500);
            return;
        }
        // Send response to web browser
        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        // Stream the video to the web browser 
        fs.createReadStream(path).pipe(res);
    });
});

// Start HTTP server on Port 3000
app.listen(3000, () => {
    console.log(`Sample app listening on port 3000, point your browser to http://localhost:3000/video`);
});
