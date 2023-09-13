export type SingleStandardResponse<TEntity> = {
  entity: TEntity;
};

export const getSingleStandardResponse = <TEntity>(entity: TEntity): SingleStandardResponse<TEntity> => {
  return {
    entity: entity,
  };
};
