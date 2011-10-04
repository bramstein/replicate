#!/usr/bin/env node

var Replicator = require("./main");

function replicate (from, to, cb) {
  if (typeof from === 'object') var options = from
  else {
    var options = {from:from, to:to}
  }
  var rep = new Replicator(options)
  rep.push(cb)
  return rep
}

var args = process.argv.slice(0);

// shift off node and script name
args.shift(); args.shift();

if(args.length < 2) throw "syntax: replicate http://admin:pass@somecouch/sourcedb http://admin:pass@somecouch/destinationdb"

replicate(args[0], args[1], function(results) {console.log('replication complete')});

