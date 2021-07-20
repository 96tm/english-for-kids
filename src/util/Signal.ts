export default class Signal<T, S = Promise<void>> {
  slots: Array<(data: T) => S> = [];

  add(slot: (data: T) => S): void {
    this.slots.push(slot);
  }

  remove(slot: (data: T) => S): void {
    this.slots = this.slots.filter((registeredSlot) => registeredSlot !== slot);
  }

  async emit(data: T): Promise<void> {
    const promises = [];
    for (let i = 0; i < this.slots.length; i += 1) {
      promises.push(this.slots[i](data));
    }
    await Promise.all(promises);
  }
}
