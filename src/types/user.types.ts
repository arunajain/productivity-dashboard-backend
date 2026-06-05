export interface UserPublic {
  id: number;
  name: string;
  email: string;
}

export interface UserDataRow extends UserPublic {
  password_hash: string;
  is_verified: boolean;
}
