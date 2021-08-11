import { Todo } from "../model/todo/todo.d";
import api from "../service/api";
import { BaseRepository } from "./base.repository";

// api

class TodoRepository implements BaseRepository<Todo> {
  create(item: Todo): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(id: string, item: Todo): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Todo[]> {
    throw new Error("Method not implemented.");
  }
}
