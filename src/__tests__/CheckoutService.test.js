import { CarrinhoBuilder } from './builders/CarrinhoBuilder';
import { CheckoutService } from '../services/CheckoutService';
import { Item } from '../domain/Item';
import UserMother from './builders/UserMother';

describe('CheckoutService', () => {
  describe('quando o pagamento falha', () => {
    it('deve retornar null quando o pagamento não é aprovado', async () => {
      // Arrange
      const carrinho = new CarrinhoBuilder().build();
      
      const gatewayStub = {
        cobrar: jest.fn().mockResolvedValue({ success: false })
      };
      
      const repositoryDummy = {};
      const emailServiceDummy = {};
      
      const checkoutService = new CheckoutService(
        gatewayStub,
        repositoryDummy,
        emailServiceDummy
      );

      // Act
      const pedido = await checkoutService.processarPedido(carrinho);

      // Assert
      expect(pedido).toBeNull();
    });
  });

  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar desconto e enviar email de confirmação', async () => {
      // Arrange
      const userPremium = UserMother.umUsuarioPremium();
      const itens = [
        new Item('Item 1', 100),
        new Item('Item 2', 100)
      ];
      const carrinho = new CarrinhoBuilder()
        .comUser(userPremium)
        .comItens(itens)
        .build();

      const gatewayStub = {
        cobrar: jest.fn().mockResolvedValue({ success: true })
      };

      const pedidoSalvo = { id: 1, user: userPremium, items: itens };
      const repositoryStub = {
        salvar: jest.fn().mockResolvedValue(pedidoSalvo)
      };

      const emailMock = {
        enviarEmail: jest.fn().mockResolvedValue(undefined)
      };

      const checkoutService = new CheckoutService(
        gatewayStub,
        repositoryStub,
        emailMock
      );

      // Act
      const pedido = await checkoutService.processarPedido(carrinho);

      // Assert
      expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, undefined);
      expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1);
      expect(emailMock.enviarEmail).toHaveBeenCalledWith(
        'lauramoreira@gmail.com',
        'Seu Pedido foi Aprovado!',
        expect.any(String)
      );
    });
  });
});
