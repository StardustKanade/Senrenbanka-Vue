export interface CharacterConfig {
  id: string; // 角色id
  name: string; // 角色名称
  bodies: BodyType[]; // 角色身体信息
}

export interface BodyType {
  id: string; // 身体id
  image: string; // 身体图片
  faces: FaceType[];
}

export interface FaceType {
  id: string; // 脸型id
  image: string; // 脸型图片
  offsetX: number; // 脸型图片的偏移x
  offsetY: number; // 脸型图片的偏移y
}
