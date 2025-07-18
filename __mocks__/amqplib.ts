const mockChannel = {
	assertQueue: jest.fn(() =>
		Promise.resolve({ queue: "test_queue", messageCount: 0, consumerCount: 0 }),
	),
	sendToQueue: jest.fn(() => true),
	close: jest.fn(() => Promise.resolve()),
};

const mockConnection = {
	createChannel: jest.fn(() => Promise.resolve(mockChannel)),
	close: jest.fn(() => Promise.resolve()),
};

const amqp = {
	connect: jest.fn(() => Promise.resolve(mockConnection)),
};

export default amqp;
