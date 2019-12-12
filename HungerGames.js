/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
  	Goal
You are a programmer for The Capitol of Panem in the Hunger Games. You are assigned with the task of displaying information on boards for each of the tributes. You are given information regarding the entire match and its results, your job is to display who killed who.

All information is expected to be in alphabetical order
Input
Line 1: A number N for the amount of tributes.
Next N lines: Each tribute's name.
Next Line: A number T for the amount of turns in the game
Next T lines: Information of who killed who. Player killed Victim

If a tribute kills more than one person in a single turn, then it will be formatted like so.

TributeName killed VictimName1, VictimName2, VictimName3...

It is also possible that the same killer appears in multiple lines. Eg:

John killed Steve
John killed Marcus
Output
Print each tribute's name, who they killed (if anyone), and who killed them.

Separate each Tribute's information with a blank line

Example (Tribute's name is John, they killed Sebastian and Denny, and Marcus won) :

Name: John
Killed: Denny, Sebastian
Killer: Marcus

Name: Marcus
Killed: John
Killer: Winner

Name: Sebastian
Killed: None
Killer: John


If the player was not killed (is the winner), then print "Winner" in place for the killer.
If the player did not kill anyone, then print "None" in place for who they've killed.
Constraints
1 < N
Tribute Names will always be unique, and will only contain alphabetical characters. (No accent marks or special characters).

There will only be one tribute left alive.
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
    this.name = NOUPDATE;
    this.killedBy = NOUPDATE;
    this.victims = new Array();
};
 
Tribute.prototype = {
    setName: function(name) {
      this.name = name;  
    },
    
    setKilledBy: function(killedBy) {
        if(killedBy !== NOUPDATE)
        this.killedBy = killedBy;  
    },
    
    addVictim: function(victim) {
        if(victim !== NOUPDATE)
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
        this.tributes
            .find(tribute => tribute.getName() === name)
            .setKilledBy(killedByName);
            
        this.tributes
            .find(tribute => tribute.getName() === name)             
            .addVictim(victimName);
        
    },
    
    triggerWinner: function() {
        this.tributes
            .find(tribute => tribute.getKilledBy() === NOUPDATE)
            .setKilledBy(WINNER);
        
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
    
    toText: function() {
        var tributesLength = this.tributes.length;
        output = NOUPDATE;
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

var HungerGame = function () {
    this.tributesNumber = 0;
    this.numberOfTurns = 0;
    this.result = new HungerGamesResult();
    this.rounds = new Array();
}

HungerGame.prototype = {
    
    initializeGame: function() {
        this.tributesNumber = parseInt(readline());

        for (let i = 0; i < this.tributesNumber; i++) {
            const playerName = readline();
            this.result.addTribute(playerName);
        }
        this.numberOfTurns = parseInt(readline());
        
        for (let i = 0; i < this.numberOfTurns; i++) {
            const info = readline();
            this.rounds.push(info);
            console.error(info);
        }
    },
    
    runGame: function() {
        const roundNumbers = this.rounds.length;
        for (let i = 0; i < roundNumbers; i++) {
            this.result.processRound(this.rounds[i]);
        }
    }
    
}

var hungerGame = new HungerGame();

hungerGame.initializeGame();
hungerGame.runGame();

hungerGame.result.triggerWinner();
hungerGame.result.triggerWhoKilledNobody();
hungerGame.result.sortTributes();

// Write an action using console.log()
// To debug: console.error('Debug messages...');

console.log(hungerGame.result.toText());
