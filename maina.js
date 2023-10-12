const fs = require('fs');
const process = require('process');
const axios = require('axios');

const SearchTerm = process.argv[2];
if (!SearchTerm){
    console.log('enter a SearchTerm')
}else{
 axios.get(`https://icanhazdadjoke.com/search?term=${SearchTerm}`,{
    headers: {'Accept':'application/json'}
})
.then((response)=> {
    const jokes = response.data.results;
    // console.log(jokes);
if (jokes.length === 0) {
    console.log(`no jokes found for SearchTerm:"${SearchTerm}".`);
}else{
    const randomJoke = jokes[Math.floor(Math.random()*jokes.length)].joke;
   console.log(randomJoke);
    fs.appendFile('jokes.txt',`${randomJoke}\n`,(err) =>{
        if (err) throw err;
        console.log('joke saved to jokes.txt!');
    });
}
})
.catch((error) =>{
    console.log(`an error occured:${error}`);
})
}
