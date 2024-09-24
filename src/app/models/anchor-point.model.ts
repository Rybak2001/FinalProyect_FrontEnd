export class AnchorPoint {
  id: string;
  spatial_data: object;
  metadata: object;
  user_data: object;
  animal_model_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: string,
    spatial_data: object,
    metadata: object,
    user_data: object,
    animal_model_url: string,
    description: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.spatial_data = spatial_data;
    this.metadata = metadata;
    this.user_data = user_data;
    this.animal_model_url = animal_model_url;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
