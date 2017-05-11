'use strict';
const expect = require('chai').expect;
const net = require('net');

const _server = require('../lib/_server.js');

_server.startServer();

describe('chat server', function() {
  it('should allow clients to message each other', function() {

    var client = net.connect({port: 3000, host: 'localhost'});

    client.on('data', function(data) {
        expect(data.toString()).to.eql('Welcome!!!');
    });
  });
});
