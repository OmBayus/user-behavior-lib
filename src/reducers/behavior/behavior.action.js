import { BehaviorTypes } from "./constants"

export const trackElementUsage = ({id,...rest}) => {
  return {
    type: BehaviorTypes.TRACK_ELEMENT_USAGE,
    payload: {id,...rest},
  };
}

export const stopTrackingElementUsage = ({id,...rest}) => {
  return {
    type: BehaviorTypes.STOP_TRACKING_ELEMENT_USAGE,
    payload: {id,...rest},
  };
}

export const execute = () => {
  return {
    type: BehaviorTypes.EXECUTE,
  };
}

export const windowFocus = () => {
  return {
    type: BehaviorTypes.WINDOW_FOCUS,
  };
}

export const windowFocusOut = () => {
  return {
    type: BehaviorTypes.WINDOW_FOCUS_OUT,
  };
}

export const reset = (fields) => {
  return {
    type: BehaviorTypes.RESET,
    payload: fields,
  };
}