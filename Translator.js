/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
 

const DECODE = 'decode';
const ENCODE = 'encode';
const DEBUG = 'DEBUG ' + '[' + new Date().toUTCString() + ']: ';

const inputIterations = parseInt(readline());
const inputMessage = readline();
const inputAction = inputIterations > 0 ? DECODE : ENCODE;
 
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
            outputMessage = this.xcoder.parse(outputMessage,this.iterations);
        }
        return outputMessage;
    }
};

var MessageIteratorHelper = function () {
    this.parse = function (message, transform) {
        for (let start = 0, length = 1; start < message.length; start += length++) {
            let messagePart = message.substr(start, length);
            transform(length, messagePart);
        }
    },
    
    this.decodeAux = function (outputBuilder, message, iterations, addFromLeft) {
        if (iterations === 0) {
            return;
        }
        outputBuilder.transformed = addFromLeft
            ? message.substr(0, iterations) + outputBuilder.transformed
            : message.slice(-iterations) + outputBuilder.transformed;
        message = addFromLeft ? message.slice(iterations) : message.slice(0, -iterations);
        this.decodeAux(outputBuilder, message, iterations - 1, !addFromLeft);
    }
};

var Decoder = function() {
    this.parse = function(message, iterations) {
        
        let lastLength;
        let iterator = new MessageIteratorHelper();
        
        iterator.parse(message,(length, messagePart) => {
            iterations = length;
            lastLength = messagePart.length;
        });
    
        // Initiate transformed from with LastLength
        isLastAddedFromLeft = iterations % 2 === 0;
        let outputBuilder = {
            transformed : isLastAddedFromLeft
                ? message.substr(0, lastLength)
                : message.slice(-lastLength)
        };
        
        message = isLastAddedFromLeft
            ? message.slice(lastLength)
            : message.slice(0, -lastLength);
        iterator.decodeAux(outputBuilder, message, iterations - 1, !isLastAddedFromLeft);
        return outputBuilder.transformed;
    }
};

var Encoder = function() {
    this.parse = function(message) {
        let iterator = new MessageIteratorHelper();
        let transformed = '';
        iterator.parse(message,
            (length, messagePart) =>
                (transformed =
                    length % 2 === 0 ? messagePart + transformed : transformed + messagePart)
        );
        return transformed;
    }
};

var encoder = new Encoder();
var decoder = new Decoder();
var translator = new Translator();


console.error(DEBUG+inputIterations);
console.error(DEBUG+inputMessage);
console.error(DEBUG+inputAction);

translator.setIterations(Math.abs(inputIterations));

if (inputAction == DECODE) {
    translator.setDirection(decoder);
} else {
    translator.setDirection(encoder);
}

console.log(translator.parse(inputMessage));

