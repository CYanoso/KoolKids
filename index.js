const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const prefix = "!";

let upcomingMovie = "";

let days;
let hours;
let mins;
var curday;
let moviePoster = "";
const queue = new Map();


client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    switch(command){
        case "hello": 
            message.reply('Hi, this is the Kool Kid bot, how can I help you?');
            break;
            deleteMessage(message);
        case "fuck":
            if (message.author.id == ('544693767874019329')){
            message.channel.send("Yeah, Fuck " + args);
            }
            break;
        case "set":
            if (message.author.id == ('544693767874019329')){
            upcomingMovie = args.join(" ");
            } else {
                message.reply("You are not authorized to set the next Movie, message Muffins for more info!");
                break;
            }
            deleteMessage(message);
            break;
        case "movie":
            getTimeTillMovie();
            message.channel.send("**The next Movie night will feature " + upcomingMovie + "**");
            message.channel.send(moviePoster);
            if ( days > 0 ){
                message.channel.send("Next Movie night is in : " + days + " days " + hours + " hours " + mins + " mins!");
            } else if ( hours > 0) {
                message.channel.send("Next Movie night is in : " + hours + " hours " + mins + " mins!");
            } else {
                message.channel.send("Next Movie night is in : " + mins + " mins!");
            }
            deleteMessage(message);
            break;
        case "poster":
            if (message.author.id == ('544693767874019329')){
            moviePoster = args;
            }
            deleteMessage(message);
            break;
        default:
            message.reply("I'm sorry I don't know what you are saying \n" +
                            "My commands are:\n" +
                            "hello\n"+
                            "movie");
            deleteMessage(message);
            break;
    }
});

function getTimeTillMovie() {
    var nowDate = new Date();
    var dy = 1;
    var countertime = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),23,0,0);

    var curtime = nowDate.getTime();
    var atime = countertime.getTime();
    var diff = parseInt((atime -curtime/1000));
    if (diff > 0) { curday = dy - nowDate.getDay() }
    else { curday = dy - nowDate.getDay() -1 }
    if ( curday < 0 ) { curday += 7; }
    if (diff <= 0) { diff += (86400 * 7)}
    
    var currentHour = nowDate.getHours();

    var secs = parseInt(diff);
    days = curday;
    secs %= 86400;
    secs %= 3600;
    mins = Math.floor(secs/60);
    secs %= 60;
    hours = 23 - currentHour - 1;
}

function deleteMessage(message){
    message.delete();
}

client.login(config.BOT_TOKEN);