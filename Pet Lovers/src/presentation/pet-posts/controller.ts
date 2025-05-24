import { Request, Response } from "express";
import { CreatorPetPostService } from "./services/creator-pet-post.service";
import { EliminatorPetPostService } from "./services/eliminator-pet-post.service";
import { FinderPetPostService } from "./services/finder-pet-post.service";
import { FinderPetPostsService } from "./services/finder-pet-posts.service";
import { UpdatePetPostService } from "./services/update-pet-post.service";
import { CreatePetPostDTO } from "../../domain/dtos/pos-pet/create-post.dto";
import { UpdatePetPostDTO } from "../../domain/dtos/pos-pet/update-post.dto";


export class PetController {
  constructor(
    private creatorService: CreatorPetPostService,
    private eliminatorService: EliminatorPetPostService,
    private finderService: FinderPetPostService,
    private finderAllService: FinderPetPostsService,
    private updateService: UpdatePetPostService
  ) {}

  async createPet(req: Request, res: Response) {
    try {
      const dto: CreatePetPostDTO = req.body;
      const userId = req.params.id;
      const petPost = await this.creatorService.createPet(dto, userId);
      res.status(201).json(petPost);
    } catch (error) {
      res.status(500).json({ message: "Error al crear publicación", error });
    }
  }

  async deletePet(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.eliminatorService.deleteById(id);
      res.status(200).json({ message: "Publicación eliminada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar publicación", error });
    }
  }

  async getPet(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const petPost = await this.finderService.findById(id);
      res.status(200).json(petPost);
    } catch (error) {
      res.status(404).json({ message: "Publicación no encontrada", error });
    }
  }

  async getAllPets(req: Request, res: Response) {
    try {
      const petPosts = await this.finderAllService.findAll();
      res.status(200).json(petPosts);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener publicaciones", error });
    }
  }

  async updatePet(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const dto: UpdatePetPostDTO = req.body;
      const updatedPetPost = await this.updateService.update(id, dto);
      if (!updatedPetPost) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
      res.status(200).json(updatedPetPost);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar publicación", error });
    }
  }
}
