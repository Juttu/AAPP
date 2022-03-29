export type CreateSerializableParam<Type> = {
  [Property in keyof Type]: Type[Property];
};