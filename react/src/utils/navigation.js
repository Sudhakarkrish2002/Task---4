/**
 * Navigation utilities for centralized routing logic
 */

export const getPreviousView = (currentView, previousViewRef) => {
  const editorViews = ['Code Lab'];
  if (!editorViews.includes(currentView)) {
    return currentView;
  }
  return previousViewRef || 'Home';
};

export const canNavigateTo = (view, availableViews) => {
  return availableViews.includes(view);
};

