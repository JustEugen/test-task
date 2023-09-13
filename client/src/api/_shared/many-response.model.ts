export type ManyResponse<TEntity> = {
  entities: TEntity[];
  count: number;
};