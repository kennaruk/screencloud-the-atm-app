// that class only can be extended
export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
}

export interface IRead<T> {
  findAll(): Promise<T[]>;
}

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  async create(item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}
