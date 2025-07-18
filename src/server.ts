import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import RabbitMQServer from "./mq/rabbitmq-server.ts";
import { notificacoesRouter } from "./http/routes/router.ts";

const corsOptions = {
	origin: "http://localhost:4200",
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Servidor rodando!");
});

notificacoesRouter(app);

const consummer = async () => {
	const mqServer = new RabbitMQServer("amqp://admin:admin@localhost:5672");
	await mqServer.connect();
	await mqServer.assertQueue("fila.notificacao.entrada.GustavoBarbosa");
	console.log("Consumidor conectado e fila assertada.");
	await mqServer.close();
};

consummer();

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
