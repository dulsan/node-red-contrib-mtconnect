# node-red-contrib-mtconnect

A Node-RED package for MTconnect integration.

For some time now, when working with MTconnect, I have noticed using 'Ladder99' was not ideal for what I wanted. Ladder99 software stack can be frustrating to work with, so, I created this node package to deal with this problem. 

To allow maximum flexibility, the nodes were designed to allow the user to manually select the data they desire.

I have also provided an example flow for anyone who needs it. 


## Acknowledgements

|                 |                          |
| -------------   |-------------             |
| Abhik Banerjee  | Swinburne University     |
| Ashish Manchanda | Swinburne University     |

(NOTE: THE GITHUB VERSION IS NOT THE LATEST VERSION, USE NPM INSTEAD)
## Nodes

### MTconnect Receive

Fetches an XML document, via a HTTP request, and outputs a JSON formatted payload.

### MTconnect Rules

Allows the user to add 'move' rules to the msg.payload, for extracting the desired information.
