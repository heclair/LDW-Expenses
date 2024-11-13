import { Router, Request, Response } from "express";
import Expense from "./Expense"


const router = Router();

router.use("/despesa", Expense)

router.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
