export const UI_TOGGLE_DRAWER = 'UI_TOGGLE_DRAWER';
export const UI_CLOSE_DRAWER = 'UI_CLOSE_DRAWER';
export const UI_OPEN_DRAWER = 'UI_OPEN_DRAWER';

export function toggleDrawer() {
  return {
    type: UI_TOGGLE_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: UI_CLOSE_DRAWER,
  };
}

export function openDrawer() {
  return {
    type: UI_OPEN_DRAWER,
  };
}
