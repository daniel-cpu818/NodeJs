import { Router } from "express";
import { PetController } from "./controller";

import { CreatorPetPostService } from "./services/creator-pet-post.service";
import { EliminatorPetPostService } from "./services/eliminator-pet-post.service";
import { FinderPetPostService } from "./services/finder-pet-post.service";
import { FinderPetPostsService } from "./services/finder-pet-posts.service";
import { UpdatePetPostService } from "./services/update-pet-post.service";

export class PetPostsRoutes {
    static get routes(): Router {
        const router = Router();

        const creatorPetPostService = new CreatorPetPostService();
        const eliminatorPetPostService = new EliminatorPetPostService();
        const finderPetPostService = new FinderPetPostService();
        const finderPetPostsService = new FinderPetPostsService();
        const updatePetPostService = new UpdatePetPostService();


        const controller = new PetController(
            creatorPetPostService,
            eliminatorPetPostService,
            finderPetPostService,
            finderPetPostsService,
            updatePetPostService
        );

        router.post("/pet-posts/:id", controller.createPet.bind(controller));
        router.delete("/pet-posts/:id", controller.deletePet.bind(controller));
        router.get("/pet-posts/:id", controller.getPet.bind(controller));
        router.get("/pet-posts", controller.getAllPets.bind(controller));
        router.put("/pet-posts/:id", controller.updatePet.bind(controller));
        return router;
    }
}