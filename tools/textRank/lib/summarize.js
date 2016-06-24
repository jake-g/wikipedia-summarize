var fs = require('fs');
var pos = require('pos');
var tr = require('./textrank');

module.exports = function() {
    this.getSectionText = function(jsonObj, section) {
        return jsonObj.sections[section].text;
    };
    this.getFullText = function(jsonObj) {
        var article = "";
        for (var i in jsonObj.sections) {
            article += jsonObj.sections[i].text;
        }
        return article;
    };
    this.splitToParagraphs = function(content) {
        return content.split('\n\n');
    };
    this.splitSentences = function(content) {
        var sentenceArr = [];
        var sentences = content.match(/[^\.!\?]+[\.!\?]+/g);
        for (var s in sentences) {
            var wordList = this.splitWords(sentences[s]);
            sentenceArr.push(wordList);
        }
        return sentenceArr;
    };
    this.splitWords = function(content) {
        return new pos.Lexer().lex(content);
    };
    this.tagWords = function(words) {
        var wordArr = [];
        var taggedWords = new pos.Tagger().tag(words);
        for (var i in taggedWords) {
            var wordObj = {};
            wordObj.term = taggedWords[i][0];
            wordObj.pos = taggedWords[i][1];
            wordArr.push(wordObj);
        }
        return wordArr;
    };
    // Uses textrank to extract keywords
    this.keywords = function(content, n) {
        var taggedWords = this.tagWords(this.splitWords(content));
        var graph = tr.keyExGraph(taggedWords); //keyword graph like in the paper
        var results = tr.textRank(graph);
        var topKeywordList = [];
        results = results.slice(0, Math.min(results.length, n));
        console.log('\nTop rated keywords');
        results.forEach(function(item) {
            topKeywordList.push({
                'keyword': item.name,
                'score': item.score
            });
            console.log(item.name + ' --> ' + item.score);
        });
        return topKeywordList;
    };
    this.summary = function(content, n) {
        var sentences = this.splitSentences(content);
        var graph = tr.sentExGraph(sentences); //sentence graph like in the paper
        var results = tr.textRank(graph, 40); //run 40 iterations
        var topSentenceList = [];
        results = results.slice(0, Math.min(results.length, n));
        results.sort(function(a, b) {
            return a.vertex - b.vertex;
        }); // original order
        console.log('\nSummery based off top rated sentences');
        results.forEach(function(item) {
            topSentenceList.push({
                'sentence': item.name,
                'score': item.score
            });
            console.log(item.name.join(' ') + ' ');
        });
        return topSentenceList;
    };
};
