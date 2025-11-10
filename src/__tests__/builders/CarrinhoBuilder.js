import { Carrinho } from "../../domain/Carrinho";
import { Item } from "../../domain/Item";
import UserMother from "./UserMother";


class CarrinhoBuilder {
  constructor() {
    this.user = UserMother.umUsuarioPadrao();
    this.itens = [
      new Item("Item 1", 10),
    ];
  }

  comUser(user) {
    this.user = user;
    return this;
  }

  comItens(itens) {
    this.itens = itens;
    return this;
  }

  vazio() {
    this.itens = [];
    return this;
  }

  build() {
    return new Carrinho(this.user, this.itens);
  }
}

export { CarrinhoBuilder };