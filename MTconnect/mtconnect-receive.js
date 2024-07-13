module.exports = function(RED) {
    function MTconnectReceiveNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        node.url = config.url;
        node.injectTime = config.injectTime;
        
        var https = require('https');
        var http = require('http');
        var xml2js = require('xml2js');
        
        function isValidUrl(string) {
            try {
                let url = new URL(string);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch (_) {
                return false;  
            }
        }
        
        function makeRequest() {
            if (!isValidUrl(node.url)) {
                node.warn("Invalid or unsupported URL: " + node.url);
                return;
            }

            const protocol = new URL(node.url).protocol === 'https:' ? https : http;

            protocol.get(node.url, (resp) => {
                let data = '';
                
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                
                resp.on('end', () => {
                    xml2js.parseString(data, (err, result) => {
                        if (err) {
                            node.warn("Error parsing XML: " + err);
                        } else {
                            node.send({payload: result});
                        }
                    });
                });
            }).on("error", (err) => {
                node.warn("Error making request: " + err.message);
            });
        }
        
        if (node.injectTime > 0) {
            node.interval = setInterval(makeRequest, node.injectTime * 1000);
        } else {
            node.injectTime = 5; // Default inject time if not specified
            node.interval = setInterval(makeRequest, node.injectTime * 1000);
        }
        
        node.on('close', function() {
            if (node.interval) {
                clearInterval(node.interval);
            }
        });

        // Trigger initial request on node creation
        makeRequest();
    }
    
    RED.nodes.registerType("mtconnect-receive", MTconnectReceiveNode);
}