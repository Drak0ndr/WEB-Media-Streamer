const { exec } = require("child_process") 
var time = setInterval(function() {
    // fswebcam -r 640x360 --no-banner image3.jpg
    exec("sudo -a -G -r 640x360 -t 200 --no-banner video.webm", (error, stdout, stderr) => {
        if (error) {
            //console.log(`error: ${error.message}`);
            return;
        }
         if (stderr) {
             //console.log(`stderr: ${stderr}`);
             return;
         }
        //console.log(`stdout: ${stdout}`);
    })
},200)