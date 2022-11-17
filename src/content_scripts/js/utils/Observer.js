class Observer {
  static ForRemovedNodes(ItemForWait, instructions) {
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.removedNodes.length) {
          this.instructions();
        }
      });
    });
    // Opcions para el observer
    const observerOptions = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: false,
      attributeOldValue: false,
      characterDataOldValue: false,
    };
    observer.observe(ItemForWait, observerOptions);
  }
  static ForAddedNodes(ItemForWait, instructions) {
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          this.instructions();
        }
      });
    });
    // Opcions para el observer
    const observerOptions = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: false,
      attributeOldValue: false,
      characterDataOldValue: false,
    };
    observer.observe(ItemForWait, observerOptions);
  }
}
