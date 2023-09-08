import { behaviorActionsEnum } from "./behavior.action";

export function behaviorReducer(state, action) {
  switch (action.type) {
    case behaviorActionsEnum.focusField:
      return {
        ...state,
        currentField: {
          id: action.payload.id,
          name: action.payload.name,
          startTime: Date.now(),
        },
      };
    case behaviorActionsEnum.focusOutField:
      const startTime = state.currentField.startTime;
      const fieldId = action.payload.id;
      const updatedFields = {
        ...state.fields,
        [fieldId]: {
          ...state.fields[fieldId],
          totalTime: state.fields[fieldId].totalTime + (Date.now() - startTime),
        },
      };
      return {
        ...state,
        fields: updatedFields,
        currentField: { id: null, name: null, startTime: null },
      };
    case behaviorActionsEnum.execute:
      const activeTime = state.activeTime + (Date.now() - state.startTime);
      return {
        ...state,
        activeTime,
        startTime: Date.now(),
      };
    case behaviorActionsEnum.windowFocus:
      const activeTimeWindow =
        state.activeTime + (Date.now() - state.startTime);
      return {
        ...state,
        activeTime: activeTimeWindow,
        startTime: Date.now(),
      };
    case behaviorActionsEnum.windowFocusOut:
      const inactiveTime = state.inactiveTime + (Date.now() - state.startTime);
      return {
        ...state,
        inactiveTime,
        startTime: Date.now(),
      };
    case behaviorActionsEnum.reset:
      return {
        ...state,
        activeTime: 0,
        inactiveTime: 0,
        startTime: Date.now(),
        currentField: { id: null, name: null, startTime: null },
        fields: action.payload.fields,
      };
    default:
      return state;
  }
}
