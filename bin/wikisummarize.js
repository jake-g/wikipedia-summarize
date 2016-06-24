#!/usr/bin/env node

var Summarize = require('../lib/summarize'),
    WikiParse = require('../lib/wikiparser').WikiParse,
    tr = require('../lib/textrank'),
    parser = new Summarize(),
    argv = require('minimist')(process.argv.slice(2));

if (!argv.article && !argv.url) { // No args err
    console.log('Required Arguments:');
    console.log('--article=[article name]\nOR\n--url=[full article url]');
    console.log('\nOptional Arguments:');
    console.log('--section=[article section]\n-n=[number of top results]');

} else {
    // Wiki parse
    if (argv.article) { // create url from article name
        var url = 'http://en.wikipedia.org/wiki/' + argv.article;
        var article = argv.article;
    } else { // parse title from url
        var url = argv.url;
        var i = url.lastIndexOf('/');
        var article = url.substring(i + 1);
    }

    console.log('\nFetching article ' + article + '...');
    var articleObj = (new WikiParse()).fetch(url, function(err, articleObj) {
        if (err) {
            console.log('Could not fetch article: ' + err);
        } else {
            // Summarize article
            var n, content;
            if (!argv.n) { // No 'n' arg
                n = 10; //default
            } else {
                n = argv.n;
            }
            if (argv.section == 'all') { // No section arg, use full article
                console.log('Summarizing full article ' + article + '...');
                content = parser.getFullText(articleObj);
            } else if (!argv.section) { // No section arg, use first section
                content = parser.getFirstSection(articleObj);
            } else {
                console.log('Summarizing section ' + argv.section + ' from article ' + article + '...');
                content = parser.getSectionText(articleObj, argv.section);
            }

            // Get top n keywords and sentences
            console.log('Analyzing keywords...');
            var keyWordResults = parser.keywords(content, n);
            console.log('Building summary...');
            var sentenceResults = parser.summary(content, n);
            console.log('Done!');

            // Print results
            console.log('\n----Top ' + n + ' keywords----');
            console.log('Score\tKeyword');
            for (var i in keyWordResults) {
                console.log('(' + keyWordResults[i].score + ')\t' + keyWordResults[i].keyword);
            }
            console.log('\n----Article Summary----');
            var summary = '';
            for (var j in sentenceResults) {
                summary += sentenceResults[j].sentence;
            }
            console.log(summary);
        }
    });
}
