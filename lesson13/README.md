# Lesson 13

How to create a WebSocket API using Amazon API Gateway and AWS Lambda

### What is Websocket?
WebSocket is bidirectional, a full-duplex protocol that is used in the same scenario of client-server communication, unlike HTTP it  starts from **ws://** or **wss://**. It is a stateful protocol, which means the connection between client and server will keep alive until it is terminated by either party (client or server).

![](https://media.geeksforgeeks.org/wp-content/uploads/20191203183429/HTTP-Connection.png)

Example of client-server communication, there is the client which is a web browser and a server, whenever we initiate the connection between client and server, the client-server made the handshaking and decide to create a new connection and this connection will keep alive until terminated by any of them. When the connection is established and alive the communication takes place using the same connection until it is terminated.

### When can be a web socket be used:

* **Real-time web application**: It uses a web socket to show the data at the client end, which is contiuously being sent by the backend server. For example, in a trading website or bitcoin trading, for displaying the price fluctuation and movement data is continously pushed by the backend server to the client end by using a WebSocket channel.

* **Gaming Application**: In a gaming application, you might focus on that, data is continuously received by the server, and without refreshing the UI. 

* **Chat Application**: Chat application use WebSockets to establish the connection only once for exchange, publishing, and broadcasting the messgae among the subscribers. It reuses the same WebSocket connection, for sending and receiving the message and for one-to-one message transfer.

### When not to use WebSocket: 

It can be used if we want any real-time updated or continuous streams of data that are being transmitter over the network. Old data which is not required very frequently or fetched only once can be queried by the simple HTTP request, so in this scenario, it's better not use WebSocket.

