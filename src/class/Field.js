export default class Field {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.totalTime = 0;
  }
  addTime(time) {
    this.totalTime += time;
  }
}
