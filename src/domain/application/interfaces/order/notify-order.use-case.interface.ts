export interface INotifyOrder {
  emitOrderIsProcessing(id: number): void;
  emitOrderIsReady(id: number): void;
}
