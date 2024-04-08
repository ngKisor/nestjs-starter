export class Lock {
    private lockedResources: { [resourceId: string]: boolean } = {};
    private waitingQueue: { [resourceId: string]: Function[] } = {};
  
    async lock(resourceId: string): Promise<void> {
      return new Promise<void>((resolve) => {
        if (!this.lockedResources[resourceId]) {
          this.lockedResources[resourceId] = true;
          resolve();
        } else {
          // If resource is already locked, enqueue the resolve function
          if (!this.waitingQueue[resourceId]) {
            this.waitingQueue[resourceId] = [];
          }
          this.waitingQueue[resourceId].push(resolve);
        }
      });
    }
  
    async unlock(resourceId: string): Promise<void> {
      if (this.waitingQueue[resourceId]?.length > 0) {
        const resolve = this.waitingQueue[resourceId].shift();
        resolve?.();
      } else {
        this.lockedResources[resourceId] = false;
      }
    }
  
    async waitUntilAvailable(resourceId: string): Promise<void> {
      return new Promise<void>(resolve => {
        const waitForLock = async () => {
          if (!this.lockedResources[resourceId]) {
            resolve();
          } else {
            console.log('resource id is locked',resourceId)
            // Resource is already locked, wait for a short interval before checking again
            setTimeout(waitForLock, 10);
          }
        };
        waitForLock();
      });
    }
  }
  