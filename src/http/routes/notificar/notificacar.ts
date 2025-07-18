import type { Request, Response } from "express";
import RabbitMQServer from "../../../mq/rabbitmq-server.ts";

const mqServer = new RabbitMQServer("amqp://admin:admin@localhost:5672");

export const notificar = async (req: Request, res: Response): Promise<void> => {
	await mqServer.connect();
	const { mensagem } = req.body;
	await mqServer.sendToQueue(
		"fila.notificacao.entrada.GustavoBarbosa",
		mensagem,
	);
	await mqServer.close();
	res.send("Notificação enviada!");
};
