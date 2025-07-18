import { type Express, Router } from "express";
import { notificar } from "./notificar/notificacar.ts";

const router = Router();

router.post("/notificar", notificar);

export const notificacoesRouter = (app: Express) => {
	app.use("/api", router);
};
