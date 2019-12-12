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
    this.victims = new Array();
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
        if(victim !== '')
        this.victims.push(victim);
    },
    
    getName: function() {
        return this.name;
    },
    
    getKilledBy: function() {
        return this.killedBy;
    },
    
    getVictims: function() {
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
    
    updateTribute: function(name, killedByName, victimName){
        var tributesLength = this.tributes.length;
        
        for (let i = 0; i < tributesLength; i++) {
            if(this.tributes[i].getName() == name){
                
                this.tributes[i].setKilledBy(killedByName);
                this.tributes[i].addVictim(victimName);
            }
        }
    },
    
    triggerWinner: function() {
        var tributesLength = this.tributes.length;
        for (let i = 0; i < tributesLength; i++) {
            if(this.tributes[i].getKilledBy() === NOUPDATE)
            this.tributes[i].setKilledBy(WINNER);
        }
        
    },
    
    triggerWhoKilledNobody: function() {
        var tributesLength = this.tributes.length;
        for (let i = 0; i < tributesLength; i++) {
            if(this.tributes[i].getVictims().length === 0)
            this.tributes[i].addVictim(NOKILLS);
        }
    },
    
    processRound: function(roundResult) {
        const figthers = roundResult.split(FIGHTERSEPARATOR);
        const winner = figthers[0].trim();
        const killed = figthers[1].trim();
        var victims = killed.split(',').sort();
        var victimsLength = victims.length;
        
        for(let i = 0; i < victimsLength; i++) {
            this.updateTribute(winner,NOUPDATE,victims[i].trim());
            this.updateTribute(victims[i].trim(),winner,NOUPDATE);
        }
    },
    
    getTribute: function(){
         return this.tributes.find(tribute => tribute.getName() == winner);
    },
    
    resultsInText: function() {
        this.sortTributes();
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
    },
    
    sortTributes: function() {
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

hungerGames.triggerWinner();
hungerGames.triggerWhoKilledNobody();

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log(hungerGames.resultsInText());
