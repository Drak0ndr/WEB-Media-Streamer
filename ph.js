console.time('FirstWay')
const { exec } = require("child_process") 
// fswebcam -r 640x360 --no-banner image3.jp
    for(let i = 0; i < 100; i++) {
        exec("fswebcam -r 640x360 --no-banner image3.jp", (error, stdout, stderr) => {
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
    }
    console.timeEnd('FirstWay')