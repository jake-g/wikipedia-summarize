#!/usr/bin/env node

var parser = require('../lib/summarize'),
    tr = require('../lib/textrank'),
    parser = new parser(),
    argv = require('minimist')(process.argv.slice(2));

if (!argv.file) { // No args err
    console.log('usage:\t summarize --file=[wikiparse.json] (optional) --section=[section from article]');
} else {
    var jsonObj = require(process.cwd() + '/' + argv.file);

    if (!argv.section) { // No section arg, use full article
        var content = parser.getFullText(jsonObj, argv.section);
    } else {
        var content = parser.getSectionText(jsonObj, argv.section);
    }

    // // Get top n keywords and sentences
    var keyWordResults = parser.keywords(content, 10);
    var sentenceResults = parser.summary(content, 5);
}
