export interface AnimalModelDTO {
  model_name: string;
  model_url: string;
  thumbnail_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class AnimalModel {
  model_id: string;
  model_name: string;
  model_url: string;
  thumbnail_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    model_name: string,
    model_url: string,
    thumbnail_url: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    model_id?: string // Haciendo que model_id sea opcional
  ) {
    this.model_id = model_id ?? ''; // Si no se proporciona, inicializa con una cadena vacía
    this.model_name = model_name;
    this.model_url = model_url;
    this.thumbnail_url = thumbnail_url;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
