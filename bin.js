#!/usr/bin/env node

var Replicator = require("./main"),
    optimist = require('optimist'),
    argv = optimist
        .usage('usage: $0 to from [options]')
        .demand(2)
        .wrap(80)
        .options('c', {
            alias: 'continuous',
            boolean: true,
            description: 'Trigger continuous replication.'
        })
        .options('s', {
            alias: 'seq',
            number: true,
            description: 'Replication seq identifier to start replicating at.'
        })
        .options('h', {
            alias: 'help',
            boolean: true
        })
        .argv;

if (argv.help) {
    optimist.showHelp();
} else {
    var from = argv._[0],
        to = argv._[1],
        options = {
            from: argv._[0],
            to: argv._[1]
        },
        replicator;

    if (argv.seq) {
        options.seq = argv.seq;
    }

    replicator = new Replicator(options);
    replicator.on('failed', function (obj) {
        console.warn('Failed to replicate "' + obj.id + '" at rev: "' + obj.rev + '".');
    });
    replicator.on('pushed', function (obj) {
        console.log('Replicated "' + obj.id + '" at rev: "' + obj.rev + '".');
    });

    replicator.push(function (results) {
        console.log('Database "' + from + '" replicated to "' + to + '".');
    });

    if (argv.continuous) {
        replicator.continuous();
    }
}

