const testFolder = './catalog/';
const fs = require('fs');
const crypto = require("crypto");
const NodeID3 = require('node-id3');
const mm = require('musicmetadata');
var express = require('express');
var app = express();
const cors=require('cors');

app.use(cors());

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
let masFile = getFiles(testFolder);
var arr=[];
title(0);
function title(i)
{
    mm(fs.createReadStream(masFile[i]),{ duration: true },function (err, metadata) {
        arr.push(metadata);
        console.log(metadata);
        if(i==1)
        {
            app.get('/',function(req,res)
            {
                res.json(arr);
            });
        }
    });
    if (i < masFile.length-1) {
        i++;
        title(i);
    }
}
let arrhash = [];
for (let index = 0; index < masFile.length; index++) {
    arrhash[index]={};
    arrhash[index].path=masFile[index];
}
console.log(arrhash);
makeHash(0);
function makeHash(i) {
    const fd = fs.createReadStream(masFile[i]);
    const hash = crypto.createHash("md5");
    hash.setEncoding("hex");
    fd.on("end", () => {
        hash.end();
        arrhash[i].hash=hash.read();
        if( i == 3 )
        {
            app.get('/sum/',function(req,res)
            {
                res.json(arrhash);
            });
        }
        if (i < masFile.length-1) {
            i++;
            makeHash(i);
        }
    });
    fd.pipe(hash);
}
app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
app.get("/ind",(req,res)=>{
    res.sendFile('G:/miniproject2/index.html');
});
app.get("/hash",(req,res)=>{
    res.sendFile('G:/miniproject2/hash.html');
});









// async function()
// {
//     let a= await mm(fs.createReadStream(masFile[i]),{ duration: true });
// console.log(a.title);
// }
// function (err, metadata) {
    //         getDate(metadata);     
    //     });

// function getDate(date)
// {
//     title_s.push(date.duration);
//     // app.get('/f', function (req, res) {
//     //     res.json(date);
//     // });
// }
// console.log(title_s);
// mongoose.connect('mongodb://localhost:27017/',{ useNewUrlParser: true });

// app.listen(3001, function () {
//     console.log('Example app listening on port 3000!');
//   });

// var readableStream = fs.createReadStream('Reflex_-_Dym_i_Tantsy_[].mp3');
// var parser = mm(readableStream, function (err, metadata) {
//   if (err) throw err;
//   console.log(metadata);
//   readableStream.close();
// });
// let tags = NodeID3.read(masFile[0]);
// NodeID3.read(masFile[2], function(err, tags) {
//     console.log(tags);
// });



// console.log(masFile.reduce((p, c) => {
//         if (fs.statSync(c).isFile()) {
//             p.push(c);
//         }
//         return p;
//     }, []))


// try {
//     const stats = fs.statSync ('./catalog//filv-edmofo_-_clandestina.mp3');
//     console.log(stats);
// }
// catch (err) {
//     console.error(err);
// }

// id3.name("./catalog//filv-edmofo_-_clandestina.mp3", function() {
//     var tags = ID3.getAllTags("./catalog//filv-edmofo_-_clandestina.mp3");
//     console.log(tags.artist + " - " + tags.title + ", " + tags.album);
// });

// const fs = require("fs");

// const files = fs.readdirSync("./catalog/").reduce((p, c) => {
//     if (fs.statSync(c).isFile()) {
//         p.push(c);
//     }
//     return p;
// }, []);
// console.log(files);