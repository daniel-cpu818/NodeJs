export interface UpdatePetPostDTO {
  pet_name?: string;
  description?: string;
  image_url?: string;
  status?: "pending" | "approved" | "rejected";
  hasFounded?: boolean;
}