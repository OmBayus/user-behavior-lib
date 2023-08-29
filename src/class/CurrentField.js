export default class CurrentField {
    constructor(id, name, startTime) {
      this.id = id;
      this.name = name;
      this.startTime = startTime;
    }
    reset() {
      this.id = null;
      this.name = null;
      this.startTime = null;
    }
  }
  