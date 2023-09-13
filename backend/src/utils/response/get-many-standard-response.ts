export type ManyStandardResponse<TEntities> = {
  entities: TEntities[];
  count: number;
};

// === Author note ===
// It should be standard response for pagination but due to time limitation, pagination is out of scope
export const getManyStandardResponse = <TEntities>(entities: TEntities[]): ManyStandardResponse<TEntities> => {
  return {
    entities: entities,
    count: entities.length,
  };
};
