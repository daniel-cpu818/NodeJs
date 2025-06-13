import { Request, Response } from "express";
import { GetUserService } from "./service/getUser-user.service";


export class getUserController {
  constructor(private getUserService: GetUserService) {}

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.body.userId; 
      const user = await this.getUserService.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Error al obtener usuario" });
    }
  }
}