/**
 * Classe refatorada para gerar relatórios.
 * Aplica técnicas de refatoração:
 * - Extract Method: métodos extraídos para reduzir complexidade
 * - Strategy Pattern: estratégias para diferentes tipos de relatório
 * - Guard Clauses: para simplificar condicionais
 */

// Constantes para evitar números mágicos
const USER_VALUE_LIMIT = 500;
const PRIORITY_THRESHOLD = 1000;

// Mensagens de erro
const NOT_IMPLEMENTED_ERROR = "Method not implemented";

/**
 * Estratégia base para formatação de relatórios
 */
class ReportStrategy {
  generateHeader() {
    throw new Error(NOT_IMPLEMENTED_ERROR);
  }

  generateRow() {
    throw new Error(NOT_IMPLEMENTED_ERROR);
  }

  generateFooter() {
    throw new Error(NOT_IMPLEMENTED_ERROR);
  }
}

/**
 * Estratégia para relatórios CSV
 */
class CSVReportStrategy extends ReportStrategy {
  generateHeader() {
    return "ID,NOME,VALOR,USUARIO\n";
  }

  generateRow(item, userName) {
    return `${item.id},${item.name},${item.value},${userName}\n`;
  }

  generateFooter(total) {
    return `\nTotal,,\n${total},,\n`;
  }
}

/**
 * Estratégia para relatórios HTML
 */
class HTMLReportStrategy extends ReportStrategy {
  generateHeader(userName) {
    return `<html><body>
<h1>Relatório</h1>
<h2>Usuário: ${userName}</h2>
<table>
<tr><th>ID</th><th>Nome</th><th>Valor</th></tr>
`;
  }

  generateRow(item, userName, isPriority = false) {
    const style = isPriority ? ' style="font-weight:bold;"' : "";
    return `<tr${style}><td>${item.id}</td><td>${item.name}</td><td>${item.value}</td></tr>\n`;
  }

  generateFooter(total) {
    return `</table>
<h3>Total: ${total}</h3>
</body></html>
`;
  }
}

/**
 * Gerador de relatórios refatorado
 */
export class ReportGenerator {
  constructor(database) {
    this.db = database;
    this.strategies = {
      CSV: new CSVReportStrategy(),
      HTML: new HTMLReportStrategy(),
    };
  }

  /**
   * Gera um relatório de itens baseado no tipo e no usuário.
   * - Admins veem tudo.
   * - Users comuns só veem itens com valor <= 500.
   */
  generateReport(reportType, user, items) {
    const strategy = this.getStrategy(reportType);
    const filteredItems = this.filterItemsByUserRole(user, items);

    return this.buildReport(strategy, user, filteredItems);
  }

  /**
   * Obtém a estratégia de formatação para o tipo de relatório
   */
  getStrategy(reportType) {
    return this.strategies[reportType];
  }

  /**
   * Filtra itens baseado na role do usuário
   */
  filterItemsByUserRole(user, items) {
    if (user.role === "ADMIN") {
      return this.processAdminItems(items);
    }

    if (user.role === "USER") {
      return this.processUserItems(items);
    }

    return [];
  }

  /**
   * Processa itens para usuários admin (veem tudo e marcam prioridades)
   */
  processAdminItems(items) {
    return items.map((item) => {
      const processedItem = { ...item };
      if (item.value > PRIORITY_THRESHOLD) {
        processedItem.priority = true;
      }
      return processedItem;
    });
  }

  /**
   * Processa itens para usuários comuns (filtro por valor)
   */
  processUserItems(items) {
    return items.filter((item) => item.value <= USER_VALUE_LIMIT);
  }

  /**
   * Constrói o relatório completo usando a estratégia fornecida
   */
  buildReport(strategy, user, items) {
    let report = strategy.generateHeader(user.name);
    let total = 0;

    for (const item of items) {
      report += strategy.generateRow(item, user.name, item.priority);
      total += item.value;
    }

    report += strategy.generateFooter(total);

    return report.trim();
  }
}
