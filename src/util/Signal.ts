export default class Signal<T, S> {
  slots: Array<(data: T) => S> = [];

  add(slot: (data: T) => S): void {
    this.slots.push(slot);
  }

  remove(slot: (data: T) => S): void {
    this.slots = this.slots.filter((registeredSlot) => registeredSlot === slot);
  }

  emit(data: T): void {
    this.slots.forEach((slot) => {
      slot(data);
    });
  }
}
