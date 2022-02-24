const url="https://github.com/topics"
const cheerio=require("cheerio")
const request=require("request")
const fs=require("fs")
const PDFDocument = require('pdfkit');

//const xlsx=require("xlsx")

request(url,function (err,res,html){
    if(err){
        console.log(err);
    }
    else{
        dp(html);
    }
})

function dp(html){
    let $=cheerio.load(html);
    let t=$(".container-lg.p-responsive.mt-6 p");

    // for(let i=0;i<6;i+=2){
    //     let txt=$(t[i]);
    //     console.log(txt.text());
    // }

    var links = [];
    $('.container-lg.p-responsive.mt-6 a').each( (index, value) => {
        var link = $(value).attr('href');
        links.push(link);
     });

     //console.log(links)
     dp2(links);
}

function dp2(links){
    for(let i=0;i<3;i++){
        let base='https://github.com'+links[i];
        getissues(base);
    }
}
function getissues(base){
    request(base,function (err,res,html){
    if(err){
        console.log(err);
    }
    else{
        b(html);}
    })
    function b(html){
        let $=cheerio.load(html);
        //let t=$(".col-md-8.col-lg-9")
        var issues = [];
        $('.col-md-8.col-lg-9 a').each( (index, value) => {
            var link = $(value).attr('href');
            issues.push(link);
        });
        console.log(issues)
        finalcheck(issues);
    }
}

function finalcheck(issues){
    var final=[];
    for(let i=0;i<issues.length;i++){
        let p=issues[i].search("issues");
        if(p>0){
            final.push(issues[i]);
        }
    }
    console.log(final);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc
    .fontSize(25)
    .text(final);

    doc.end();
}