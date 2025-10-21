function compareNumericValues(
  value1: number,
  operator: string,
  value2: number
) {
  switch (operator) {
    case "equals":
      return value1 == value2;
    case "greater than":
      return value1 > value2;
    case "less than":
      return value1 < value2;
    case "greater_or_equals":
      return value1 >= value2;
    case "less_or_equals":
      return value1 <= value2;
    default:
      throw new Error(`Unsupported numeric operator: ${operator}`);
  }
}

function compareStringValues(
  value: string,
  operator: string,
  compareTo: string
) {
  switch (operator) {
    case "equals":
      return value === compareTo;
    case "not equals":
      return value !== compareTo;
    default:
      throw new Error(`Unsupported string operator: ${operator}`);
  }
}

export function evaluateConditions(
  conditions: any[],
  data: Record<string, any>
): boolean {
  if (!conditions || conditions.length === 0) return true;

  const logicalOperator =
    conditions.find((c) => c.logicalOperator)?.logicalOperator || "AND";

  // Filter out the logical operator condition from the actual conditions
  const actualConditions = conditions.filter((c) => !c.logicalOperator);

  for (const condition of actualConditions) {
    let value = null;

    switch (condition.type) {
      case "partner_id":
        value = data.partner_id;
        break;
      case "product_id":
        value = data.product_id;
        break;
      case "interval":
        value = data.interval;
        break;
      case "billing_type":
        value = data.billing_type;
        break;
    }

    const result = compareStringValues(
      String(value),
      condition.operator,
      condition.value
    );
    if (logicalOperator === "AND" && !result) return false;
    if (logicalOperator === "OR" && result) return true;
  }

  return logicalOperator === "AND" ? true : false;
}
