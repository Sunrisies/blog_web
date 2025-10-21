export interface IRoomInfo {
  id: number;
  uuid: string;
  name: string;
  description: string;
  max_users: number;
  created_at: string;
  updated_at: string;
}

export interface IRoomMessage {
  id: number;
  room_id: number;
  message_type: string;
  content: string;
  file_url: string;
  file_name: string;
  file_size: string;
  retention_hours: number;
  created_at: string;
  expires_at: string;
}
