var schedule = require('node-schedule'),
    tessel = require('tessel'),
    audio = require('audio-vs1053b').use(tessel.port['A']),
    nipple = require('nipple'),
    rule = new schedule.RecurrenceRule();

var url = 'http://ratatatmusic.com/mp3/02%20Party%20and%20Bullshit%20(Ratatat%20remix).mp3';

rule.dayOfWeek = [0, new schedule.Range(0,6)];
rule.hour = 13;
rule.minute = 20;

audio.on('ready', function () {
    schedule.scheduleJob(rule, function(){
        nipple.get(url, function(err, res){
            res.pipe(audio.createPlayStream());
        });
    });
});
