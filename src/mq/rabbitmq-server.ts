import { type Connection, connect, type Channel, type Message } from "amqplib";

export default class RabbitMQServer {
	private connection: Connection | null = null;
	private channel: Channel | null = null;
	private uri: string;

	constructor(uri: string) {
		this.uri = uri;
	}

	async connect(): Promise<void> {
		this.connection = await connect(this.uri);
		this.channel = await this.connection.createChannel();
	}

	async assertQueue(queue: string): Promise<void> {
		if (!this.channel) {
			throw new Error("Channel is not initialized");
		}
		await this.channel.assertQueue(queue, { durable: true });
	}

	async sendToQueue(queue: string, message: string): Promise<void> {
		if (!this.channel) {
			throw new Error("Channel is not initialized");
		}
		await this.channel.assertQueue(queue, { durable: true });
		this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async consumeFromQueue(
		queue: string,
		callback: (msg: Message | null) => void,
	): Promise<void> {
		if (!this.channel) {
			throw new Error("Channel is not initialized");
		}
		await this.channel.assertQueue(queue, { durable: true });
		this.channel.consume(queue, callback, { noAck: false });
	}

	async close(): Promise<void> {
		if (this.channel) {
			await this.channel.close();
		}
		if (this.connection) {
			await this.connection.close();
		}
	}
}
