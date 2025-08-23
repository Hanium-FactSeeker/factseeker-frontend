export interface Politician {
  id: number;
  name: string;
  birthDate: string;
  party: string;
  facebookUrl: string;
  instagramUrl: string;
  xUrl: string;
  youtubeUrl: string;
  profileImageUrl: string;
}
export interface PoliticianByNameRequest {
  name: string;
}
export interface Top12NamesResponse {
  names: string[];
}