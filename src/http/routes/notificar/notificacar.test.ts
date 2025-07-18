import { notificar } from "./notificacar.ts";
import type { Request, Response } from "express";
// import amqp from "../../../../__mocks__/amqplib.ts";

// const mockConnect = amqp.connect as jest.MockedFunction<typeof amqp.connect>;
// const mockCreateChannel = (mockConnect.mock.results[0]?.value as any)?.createChannel as jest.MockedFunction<any>;
// const mockAssertQueue = (mockCreateChannel.mock.results[0]?.value as any)?.assertQueue as jest.MockedFunction<any>;
// const mockSendToQueue = (mockCreateChannel.mock.results[0]?.value as any)?.sendToQueue as jest.MockedFunction<any>;
// const mockCloseChannel = (mockCreateChannel.mock.results[0]?.value as any)?.close as jest.MockedFunction<any>;
// const mockCloseConnection = (mockConnect.mock.results[0]?.value as any)?.close as jest.MockedFunction<any>;

describe("Rota para Notificar", () => {
	// beforeEach(() => {
	//   jest.clearAllMocks();
	// });

	test("Deve enviar uma notificação com sucesso", async () => {
		const req = {
			body: { mensagem: "Teste de notificação" },
		} as unknown as Request;
		const res = {
			send: jest.fn(),
		} as unknown as Response;

		await notificar(req, res);

		expect(res.send).toHaveBeenCalledWith("Notificação enviada!");
	});
});
