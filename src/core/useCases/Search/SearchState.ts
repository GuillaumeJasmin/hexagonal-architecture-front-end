export interface SearchState {
  searching: boolean;
  results: {
    firstName: string;
    lastName: string;
    profilePictureURL: string;
    language: 'fr' | 'en'
  }[]
}
