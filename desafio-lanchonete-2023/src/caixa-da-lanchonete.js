class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const menu = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5
    }

    let result = 0;

    const dependencias = {
      chantily: 'cafe',
      queijo: 'sanduiche'
    }
    let cafeCount = false;
    let sanduCount = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');
      if (menu.hasOwnProperty(codigo)) {
        if (parseInt(quantidade) == 0) {
          result = 'Quantidade inválida!';
        } else {
          if (menu[codigo] === 3.0) {
            cafeCount = true;
          } else if (menu[codigo] === 6.5) {
            sanduCount = true;
          }
          if (metodoDePagamento == `dinheiro`) {
            result += menu[codigo] * 0.95 * parseInt(quantidade);
          } else if (metodoDePagamento == `credito`) {
            result += menu[codigo] * 1.03 * parseInt(quantidade);
          } else if (metodoDePagamento == `debito`) {
            result += menu[codigo] * parseInt(quantidade);
          } else {
            result = `Forma de pagamento inválida!`;
            break;
          }
          if (dependencias[codigo] == `cafe`) {
            if (!cafeCount) {
              result = `Item extra não pode ser pedido sem o principal`;
              break;
            }
          } else if (dependencias[codigo] == `sanduiche`) {
            if (!sanduCount) {
              result = `Item extra não pode ser pedido sem o principal`;
              break;
            }
          }
        }
      } else {
        result = `Item inválido!`;
        break;
      }
    }

    function isNumber(value) {
      return typeof value === 'number' && Number.isFinite(value);
    }

    if (isNumber(result)) {
      result = Math.round(result * 1000)/1000;
      const change = result.toFixed(2);

      if (result == 0.0) {
        return 'Não há itens no carrinho de compra!';
      } else {
        result = change.toString().replace('.', ',');
        return `R$ ${result}`;
      }
    } else {
      return result;
    }
  }
}

export { CaixaDaLanchonete }
