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

	app.listen(3000, () => {
		console.log(`server running on port :: 3000`);
	});
})();
