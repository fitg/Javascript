/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
 
const NAME = 'Name: ';
const KILLED = 'Killed: ';
const KILLER = 'Killer: ';
const FIGHTERSEPARATOR = 'killed';
const NOUPDATE = '';
const NOKILLS = 'None';
const NEWLINE = '\n';
const WINNER = 'Winner';
 
var Tribute = function() {
    this.name = '';
    this.killedBy = '';
    this.victims = '';
};
 
Tribute.prototype = {
    setName: function(name) {
      this.name = name;  
    },
    
    setKilledBy: function(killedBy) {
        if(killedBy !== '')
        this.killedBy = killedBy;  
    },
    
    addVictim: function(victim) {
        if(this.victims === '') this.victims = new Array();
        if(victim !== '')
        this.victims.push(victim);
    },
    
    getName: function() {
        return this.name;
    },
    
    getKilledBy: function() {
        if(this.killedBy === '') return WINNER;
        return this.killedBy;
    },
    
    getVictims: function() {
        if(this.victims.length == 0) return NOKILLS;
        return this.victims.sort().join(', ');
    }
};

var HungerGamesResult = function() {
    this.tributes = new Array();
};

HungerGamesResult.prototype = {
    
    addTribute: function(name){
        var tribute = new Tribute();
        tribute.setName(name);
        this.tributes.push(tribute);
    },
    
    getTribute: function(name){
         return this.tributes.find(tribute => tribute.getName() == winner);
    },
    
    updateTribute: function(name, killedByName, victimNames){
        var tributesLength = this.tributes.length;
        var victims = victimNames.split(',').sort();
        var victimsLength = victims.length;
        console.error(name);
        console.error(killedByName);
        console.error(victimNames);
        for (let i = 0; i < tributesLength; i++) {
            if(this.tributes[i].getName() == name){
                
                this.tributes[i].setKilledBy(killedByName);
                
                for(let j = 0; j < victimsLength; j++)
                this.tributes[i].addVictim(victims[j]);
            }
        }
    },
    
    processRound: function(roundResult) {
        const figthers = roundResult.split(FIGHTERSEPARATOR);
        const winner = figthers[0].trim();
        const killed = figthers[1].trim();
        this.updateTribute(winner,NOUPDATE,killed);
        this.updateTribute(killed,winner,NOUPDATE);
    },
    
    resultsInText: function() {
        this.tributes.sort(function (tribuneA,tribuneB) {
                var nameA = tribuneA.getName().toUpperCase(); // ignore upper and lowercase
                var nameB = tribuneB.getName().toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                return -1;
                }
                if (nameA > nameB) {
                return 1;
                }
                
                // names must be equal
                return 0;
        });
        var tributesLength = this.tributes.length;
        output = '';
        for (let i = 0; i < tributesLength; i++) {
            output += NAME + this.tributes[i].getName() + NEWLINE;
            output += KILLED + this.tributes[i].getVictims() + NEWLINE;
            output += KILLER + this.tributes[i].getKilledBy() + ((i != tributesLength-1) ? NEWLINE : '');
            if(i != tributesLength-1)
            output += NEWLINE;
        }
        return output;
    }
};

const tributesNumber = parseInt(readline());
var hungerGames = new HungerGamesResult();

for (let i = 0; i < tributesNumber; i++) {
    const playerName = readline();
    hungerGames.addTribute(playerName);
}
const numberOfTurns = parseInt(readline());

for (let i = 0; i < numberOfTurns; i++) {
    const info = readline();
    hungerGames.processRound(info);
    console.error(info);
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log(hungerGames.resultsInText());
