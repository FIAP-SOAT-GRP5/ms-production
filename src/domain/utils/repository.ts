type FindOptionsWhereProperty<
  PropertyToBeNarrowed,
  Property = PropertyToBeNarrowed,
> = PropertyToBeNarrowed extends Promise<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends Array<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends (...args: any[]) => any
  ? never
  : PropertyToBeNarrowed extends Buffer | Date | string | number | boolean
  ? Property
  : PropertyToBeNarrowed extends Record<string, unknown>
  ? FindOptionsWhere<Property> | FindOptionsWhere<Property>[] | boolean
  : Property;

type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};

export type FindOptionsWhereValue<Entity> =
  | FindOptionsWhere<Entity>[]
  | FindOptionsWhere<Entity>;

export type EntityPartial<T> =
  | T
  | (T extends Array<infer U>
      ? EntityPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<EntityPartial<K>, EntityPartial<V>>
      : T extends Set<infer M>
      ? Set<EntityPartial<M>>
      : T extends Record<string, unknown>
      ? Record<string, unknown>
      : T);
