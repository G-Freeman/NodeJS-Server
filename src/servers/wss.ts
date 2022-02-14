import WebSocket from 'ws';

export default class WSS {

	static port = 9000;
	static servers;
	static count = 0;

	server = null;
	constructor() {
		this.server = new WebSocket.Server({port:(WSS.port+WSS.count)});
		console.log('Сервер запущен на '+WSS.port+++' порту');
		this.server.on('connection', this.onConnect);
	}
	onConnect(wsClient) {
		console.log('Новый пользователь');
		wsClient.send('Привет');
		wsClient.on('message', (message) => {
			try {
				// сообщение пришло текстом, нужно конвертировать в JSON-формат
				const jsonMessage = JSON.parse(message);
				switch (jsonMessage.action) {
					case 'ECHO':
						wsClient.send(jsonMessage.data);
						break;
					case 'PING':
						setTimeout(() => {
							wsClient.send('PONG');
						}, 2000);
						break;
					default:
						console.log('Неизвестная команда',jsonMessage.action,jsonMessage.data);
						break;
				}
			} catch (error) {
				console.log('Ошибка', error);
			}
		});
		wsClient.on('close', () => {
			console.log('Пользователь отключился');
		});
	}
}
