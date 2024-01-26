export class OrderWithoutItemsError extends Error {
  constructor() {
    super('Order must have at least one item');
  }
}
