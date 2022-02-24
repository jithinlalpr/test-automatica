const cors = require('cors');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
var pinoms = require('pino-multi-stream');
const Jabber = require('jabber');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

var prettyStream = pinoms.prettyStream({
	prettyPrint: {
		colorize: true,
		translateTime: 'SYS:standard',
		ignore: 'hostname,pid',
	},
});

(async () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	const logFn = (fileName, i) => {
		const streams = [
			{
				stream: fs.createWriteStream(`${fileName}.log`, {
					flags: 'a',
				}),
			},
			{
				stream: prettyStream,
			},
		];

		const logger = pinoms(pinoms.multistream(streams));
		const jabber = new Jabber();

		// shell script -> [stderr, stdout]

		const chunk = `${i} <[::]> ${jabber.createWord(10)}`;

		logger.info(chunk);

		socketVar.emit('logs', chunk);
	};

	let socketVar;

	io.on('connection', (socket) => {
		console.log({ id: socket.id });

		socket.on('disconnect', () => {
			console.log('Disconnected');
		});

		socketVar = socket;
	});

	app.get('/', (req, res) => {
		const { fileName } = req.query;

		for (let i = 0; i < 10000; i++) {
			logFn(fileName, i);
		}

		res.send('Done!');
	});

	httpServer.listen(3001, () => {
		console.log(`server running on port :: 3001`);
	});
})();
