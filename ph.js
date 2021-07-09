const { exec } = require("child_process") 
var time = setInterval(function() {
    // fswebcam -r 640x360 --no-banner image3.jpg
    exec("fswebcam -r 640x360 --no-banner Test.jpg", (error, stdout, stderr) => {
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
},40)