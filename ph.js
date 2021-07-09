console.time('FirstWay')
const { exec } = require("child_process") 
// fswebcam -r 640x360 --no-banner image3.jpg
    for(let i = 0; i < 100; i++) {
        exec("fswebcam -r 640x360 --no-banner image3.jpg", (error, stdout, stderr) => {
            if (error) {
                //console.log(`error: ${error.message}`);
                //console.log(i)
                return;
            }
             if (stderr) {
                 //console.log(`stderr: ${stderr}`);
                 //console.log(i)
                 return;
             }
            //console.log(`stdout: ${stdout}`);
            //console.log(i)
        })
    }
    console.timeEnd('FirstWay')