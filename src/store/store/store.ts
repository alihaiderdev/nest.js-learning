import { UserDTO } from 'src/dto/user.dto';

export class Store {
  private store = new Map<number, UserDTO>();
  constructor() {
    console.log('Store init!');
  }

  addUser(user: UserDTO) {
    this.store.set(user.id, user);
  }

  getUser(id: number) {
    return this.store.get(id);
  }

  getUsers() {
    return Array.from(this.store).map((_, user) => user);
  }

  updateUser(id: number, user: UserDTO) {
    this.store.set(id, user);
  }

  deleteUser(id: number) {
    this.store.delete(id);
  }
}
