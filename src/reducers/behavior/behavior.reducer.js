import { BehaviorTypes } from "./constants";

export function behaviorReducer(state, action) {
  switch (action.type) {
    case BehaviorTypes.TRACK_ELEMENT_USAGE:
      const field = state.fields[action.payload.id];
      const updatedField = {
        id: action.payload.id,
        rest: action.payload.rest,
        startTime: Date.now(),
        totalTime: field ? field.totalTime : 0,
      };
      const updatedFields = {
        ...state.fields,
        [action.payload.id]: updatedField,
      };
      return {
        ...state,
        fields: updatedFields,
      };
    case BehaviorTypes.STOP_TRACKING_ELEMENT_USAGE:
      const _field = state.fields[action.payload.id];
      if (!_field) {
        return state;
      }
      const usageTime = Date.now() - _field.startTime;
      const _updatedField = {
        ..._field,
        totalTime: _field.totalTime + usageTime,
      };

      const _updatedFields = {
        ...state.fields,
        [action.payload.id]: _updatedField,
      };
      return {
        ...state,
        fields: _updatedFields,
      };
    case BehaviorTypes.WINDOW_FOCUS:
      const inactiveTimeWindow = state.inactiveTime + (Date.now() - state.startTime);
      return {
        ...state,
        inactiveTime:inactiveTimeWindow,
        startTime: Date.now(),
      };
    case BehaviorTypes.WINDOW_FOCUS_OUT:
      
      const activeTimeWindow =
        state.activeTime + (Date.now() - state.startTime);
      return {
        ...state,
        activeTime: activeTimeWindow,
        startTime: Date.now(),
      };
    case BehaviorTypes.RESET:
      return {
        ...state,
        activeTime: 0,
        inactiveTime: 0,
        startTime: Date.now(),
        fields: action.payload.fields,
      };
    default:
      return state;
  }
}
