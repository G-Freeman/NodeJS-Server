import express from 'express';
import WSS from './servers/wss';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
	res.send('-> '+req +' '+ res);
});
app.listen(port, '',0, () => {
	console.log(`server is listening on ${port}`);
});

new WSS();
new WSS();
