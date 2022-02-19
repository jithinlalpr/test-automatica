const cors = require('cors');
const express = require('express');

const app = express();

(async () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());

	app.get('/', (req, res) => {
		res.send('You are here');
	});

	app.listen(3001, () => {
		console.log(process.env.sample);
		console.log(process.env.another);
		console.log('Oh yes');
		console.log(`server running on port :: 3000`);
	});
})();
