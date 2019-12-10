/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
 

const DECODE = 'decode';
const ENCODE = 'encode';
const DEBUG = 'DEBUG ' + '[' + new Date().toUTCString() + ']: ';

const iterations = parseInt(readline());
const MESSAGE = readline();
const action = iterations > 0 ? DECODE : ENCODE;
 
var Translator = function() {
    this.xcoder = "";
    this.iterations = 0;
};
 
Translator.prototype = {
    setDirection: function(xcoder) {
        this.xcoder = xcoder;
    },
    
    setIterations: function(number) {
        this.iterations = number;
    },
 
    parse: function(message) {
        var outputMessage = message;
        while (this.iterations--) {
            outputMessage = this.xcoder.parse(outputMessage);
        }
        return outputMessage;
    }
};

var MessageIterator = function () {
    this.parse = function (message, action) {
        for (let start = 0, length = 1; start < message.length; start += length++) {
            let substr = message.substr(start, length);
            action(length, substr);
        }
    }
};

var Decoder = function() {
    this.parse = function(message) {
        return message;
    }
};

var Encoder = function() {
    this.parse = function(message) {
        let iterator = new MessageIterator();
        let transformed = '';
        iterator.parse(message,
            (length, substr) =>
                (transformed =
                    length % 2 === 0 ? substr + transformed : transformed + substr)
        );
        return transformed;
    }
};

var encoder = new Encoder();
var decoder = new Decoder();
var translator = new Translator();


console.error(DEBUG+iterations);
console.error(DEBUG+MESSAGE);
console.error(DEBUG+action);

translator.setIterations(Math.abs(iterations));

if (action == DECODE) {
    translator.setDirection(decoder);
} else {
    translator.setDirection(encoder);
}

console.log(translator.parse(MESSAGE));

