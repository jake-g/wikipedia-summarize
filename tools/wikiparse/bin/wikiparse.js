#!/usr/bin/env node

var WikiParse = require('../lib/wikiparser').WikiParse,
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs');

if (!argv.article && !argv.url) { // No args err
    console.log('usage:\t wikiparse --article=[article_name]\n or:\t wikiparse --url=[full_article_url]');

} else {
    if (argv.article) { // create url from article name
        var url = 'http://en.wikipedia.org/wiki/' + argv.article;
        var article = argv.article;
    } else { // parse title from url
        var url = argv.url;
        var i = url.lastIndexOf('/');
        var article = url.substring(i + 1);
    }

    console.log('Fetching article ' + article + '...');
    var articleObject = (new WikiParse()).fetch(url, function(err, articleObject) {
        if (err) {
            console.log('Could not fetch article: ' + err);
        } else { // make json
            fs.writeFileSync(article + '.json', JSON.stringify(articleObject));
        }
    });
}
