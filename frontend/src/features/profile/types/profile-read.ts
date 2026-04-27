/**
 * Profile Read Types - API response types for profile feature
 */
export namespace ProfileRead {
  export type UserProfile = {
    id: number
    name: string
    email: string
  }

  export type Index = UserProfile;
  export type Show = UserProfile;
}
