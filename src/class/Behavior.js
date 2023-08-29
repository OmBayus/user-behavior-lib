import CurrentField from "./CurrentField";
import Field from "./Field";
import Action from "./Action";
import ActionTypes from "../enums/action.types";

export default class Behavior {
  constructor(form) {
    this.activeTime = 0;
    this.inactiveTime = 0;
    this.startTime = Date.now();
    this.currentField = new CurrentField(null, null, null);
    this.actions = [];
    this.fields = {};
    for (let field of form.fields) {
      this.fields[field.id] = new Field(field.id, field.name, field.type);
    }
  }

  focusField(field) {
    this.currentField = new CurrentField(field.id, field.name, Date.now());
    this.actions.push(
      new Action(field.id, field.name, ActionTypes.FOCUS_FIELD, Date.now())
    );
  }

  focusOutField(field) {
    this.fields[field.id].addTime(Date.now() - this.currentField.startTime);
    this.currentField.reset();
    this.actions.push(
      new Action(field.id, field.name, ActionTypes.FOCUS_OUT_FIELD, Date.now())
    );
  }

  execute() {
    this.activeTime += Date.now() - this.startTime;
    this.startTime = Date.now();
    this.actions.push(new Action(null, null, ActionTypes.EXECUTE, Date.now()));
    return this;
  }

  windowFocus() {
    this.activeTime += Date.now() - this.startTime;
    this.startTime = Date.now();
    this.actions.push(new Action(null, null, ActionTypes.WINDOW_FOCUS, Date.now()));
  }

  windowFocusOut() {
    this.inactiveTime += Date.now() - this.startTime;
    this.startTime = Date.now();
    this.actions.push(new Action(null, null, ActionTypes.WINDOW_FOCUS_OUT, Date.now()));
  }
}
