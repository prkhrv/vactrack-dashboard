import { observable, action, makeObservable } from 'mobx';

class PermissionStore {
    permissions = [];
  
    constructor() {
      makeObservable(this, {
        permissions: observable,
        setPermissions: action,
        getPermissions: action,
      });
    }
  
    setPermissions(permissions) {
      this.permissions = permissions;
    }

    getPermissions() {
      return this.permissions;
    }
}
  
  const permissionStore = new PermissionStore();
  export default permissionStore;