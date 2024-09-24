export class UserInteraction {
  interaction_id: string;
  user_id: string;
  anchor_id: string;
  interaction_type: string;
  timestamp: Date;

  constructor(
    interaction_id: string,
    user_id: string,
    anchor_id: string,
    interaction_type: string,
    timestamp: Date
  ) {
    this.interaction_id = interaction_id;
    this.user_id = user_id;
    this.anchor_id = anchor_id;
    this.interaction_type = interaction_type;
    this.timestamp = timestamp;
  }
}
