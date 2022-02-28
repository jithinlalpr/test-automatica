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

	app.listen(process.env.PORT, () => {
		console.log('This is re-deployed!');
		console.log(`server running on port :: ${process.env.PORT}`);
	});
})();
