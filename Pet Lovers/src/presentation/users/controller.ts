import { Request, Response } from "express";
import { RegisterUserService } from "./services/register-user.service";
import { FindUserService } from "./services/finder-user.service";
import { FindUsersService } from "./services/finder-users.service";
import { DeleteUserService } from "./services/eliminator-user.service";
import { UpdateUserService } from "./services/upadater-user.service";
import { LoginUserService } from "./services/login-user.service";
import { UpdateUserDTO } from "../../domain/dtos/users/update-user.dto";
import { ApprovePetPostService } from "./services/approve-user.service";
import { RejectPetPostService } from "./services/reject-user.service";


export class UserController {
  constructor(
    private registerService: RegisterUserService,
    private findUserService: FindUserService,
    private findUsersService: FindUsersService,
    private deleteUserService: DeleteUserService,
    private updateUserService: UpdateUserService,
    private loginService: LoginUserService,
    private ApproveUserService: ApprovePetPostService,
    private rejectUserService: RejectPetPostService
  ) {}

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const dto: UpdateUserDTO = req.body;
      const updatedUser = await this.updateUserService.update(id, dto);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario", error });
    }
  }

    async registerUser(req: Request, res: Response) {
        try {
        const dta = req.body;
        const user = await this.registerService.register(dta, res);
        res.status(201).json(user);
        } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
        }
    }
    async findUserById(req: Request, res: Response) {
        try {
        const id = req.params.id;
        const user = await this.findUserService.findById(id, res);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
        } catch (error) {
        res.status(500).json({ message: "Error al buscar el usuario", error });
        }
    }
    async findAllUsers(req: Request, res: Response) {
        try {
        const users = await this.findUsersService.findAll();
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ message: "Error al buscar usuarios", error });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
        const id = req.params.id;
        await this.deleteUserService.deleteById(id, res);
        res.status(200).json({ message: "Usuario eliminado" });
        } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
        }
    }
    async loginUser(req: Request, res: Response) {
        try {
        const dto = req.body;
        const user = await this.loginService.login(dto, res);
        res.status(200).json(user);
        } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
        }
    }
    async approveUser(req: Request, res: Response) {
  const postId = req.query.postId as string;
  const adminId = req.query.adminId as string;

  if (!postId || !adminId) {
    return res.status(400).json({ message: "Faltan parámetros" });
  }

  try {
    const result = await this.ApproveUserService.approve(postId, adminId);
    return res.status(200).json({ message: "Publicación aprobada", result });
  } catch (error: any) {
    console.error("Error al aprobar publicación:", error);
    return res.status(500).json({
      message: "Error al aprobar publicación",
      error: error.message || "Error desconocido"
    });
  }
}
    async rejectUser(req: Request, res: Response) {
    const postId = req.query.postId as string;
  const adminId = req.query.adminId as string;

  if (!postId || !adminId) {
    return res.status(400).json({ message: "Faltan parámetros" });
  }

  try {
    const result = await this.rejectUserService.reject(postId, adminId);
    return res.status(200).json({ message: "Publicación aprobada", result });
  } catch (error: any) {
    console.error("Error al aprobar publicación:", error);
    return res.status(500).json({
      message: "Error al aprobar publicación",
      error: error.message || "Error desconocido"
    });
  }
    }

}
