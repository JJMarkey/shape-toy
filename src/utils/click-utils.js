export function checkShiftClick(event, clickHandler) {
    if (event.shiftKey) {
      clickHandler(true)
    } else {
      clickHandler(false)
    }
  }