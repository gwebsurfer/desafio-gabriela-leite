class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
  }

  // Valida se o método de pagamento é válido
  validarMetododePagamento(metodoDePagamento) {
    const metodosValidos = ['dinheiro', 'debito', 'credito'];
    return metodosValidos.includes(metodoDePagamento);
  }

  // Calcula o valor total da compra com base nos itens
  calcularTotal(itens) {
    let total = 0;
    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      if (quantidade <= 0) {
        throw new Error('Quantidade inválida!');
      }

      const valor = this.cardapio[codigo];
      if (!valor) {
        throw new Error('Item inválido!');
      }

      total += valor * quantidade;
    }
    return total;
  }

  calcularDesconto(total, metodoDePagamento) {
    if (metodoDePagamento === 'dinheiro') return total * 0.95;
    if (metodoDePagamento === 'credito') return total * 1.03;
    return total;
  }

  verificarItensPrincipais(itens) {
    const hasCafe = itens.some((item) => item.includes('cafe'));
    const hasSanduiche = itens.some((item) => item.includes('sanduiche'));

    if (!hasCafe && itens.some((item) => item.includes('chantily'))) {
      throw new Error('Item extra não pode ser pedido sem o principal');
    }

    if (!hasSanduiche && itens.some((item) => item.includes('queijo'))) {
      throw new Error('Item extra não pode ser pedido sem o principal');
    }
  }

  // Calcula o valor final da compra, incluindo desconto ou taxa
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if (!this.validarMetododePagamento(metodoDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    try {
      // Verifica itens principais antes de realizar cálculos
      this.verificarItensPrincipais(itens);

      // Calcula o valor total dos itens
      const total = this.calcularTotal(itens);

      // Aplica desconto ou taxa, conforme o método de pagamento
      const totalComDesconto = this.calcularDesconto(total, metodoDePagamento);

      return `R$ ${totalComDesconto.toFixed(2).replace('.', ',')}`;
    } catch (error) {
      return error.message;
    }
  }
}

export { CaixaDaLanchonete };
