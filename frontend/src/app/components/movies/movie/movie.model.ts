export interface Movie {
  id: string;
  title: string;
  genre?: string;
  country?: string;
  description: string;
  year_release?: string;
  image_url?: string;
  video_url?: string;
  created_at?: Date;
}
