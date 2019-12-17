/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 *  	Goal
Given some bitstring b, you may change one bit from a 0 to a 1 in order to create the longest possible sequence of consecutive 1s. Output the length of the resulting longest sequence.

Example: 11011101111
Flipping the second 0 results in 11011111111, where the longest sequence of 1s is 8 long.
Input
Line 1: The bitstring b
Output
Line 1: The length of the longest possible sequence of 1s after flipping one bit
Constraints
0 < number of bits in b < 1000
b contains at least one 0
 **/
 
const ZERO = '0'; 
const ONE = '1';
const DISTANCE = 1;
const NODISTANCE = 0;

var Sequence = function() {
    
    this.originalSequence = '';    
    this.arrayedSequence = new Array();
    this.maxLength = 0;
    this.currentMaxLength = 0;
};

Sequence.prototype = {
    
    loadInput: function(originalSequence) {
        
        this.arrayedSequence = originalSequence.split(ZERO);
        this.originalSequence = originalSequence;
    },
    
    compareAndUpdateLengths: function(item, index) {
        
        var distance = (index + DISTANCE) > (this.arrayedSequence.length - DISTANCE) ? NODISTANCE : DISTANCE;
        if(distance === NODISTANCE) return;
        
        this.currentMaxLength = item.length + this.arrayedSequence[index + distance].length + DISTANCE;
        
        if(this.currentMaxLength > this.maxLength) {
            this.maxLength = this.currentMaxLength;
        }
    },
    
    findLongest1Sequence: function() {
        
        if (!this.originalSequence.includes(ONE)) {
            this.maxLength = DISTANCE;
            return;
        }
        if (!this.originalSequence.includes(ZERO)) {
            this.maxLength = this.originalSequence.length;
            return;
        }
        
        for(let i = 0; i < this.arrayedSequence.length; i++) {
            this.compareAndUpdateLengths(this.arrayedSequence[i],i)
        }
        
    },
    
    getLongestSequence: function() {
        
        return this.maxLength;
    }
    
};

var Game = function() {
    
    this.sequence = new Sequence();
    this.inputSequence = '';
};

Game.prototype = {
    
    initialize: function() {
        
        this.inputSequence = readline();
        console.error(this.inputSequence);
    },
    
    run: function() {
        
        this.sequence.loadInput(this.inputSequence);
        this.sequence.findLongest1Sequence();
        
    },
    
    printResult: function() {
        
      console.log(this.sequence.getLongestSequence());  
    }
};

var game = new Game();

game.initialize();
game.run();
game.printResult();


