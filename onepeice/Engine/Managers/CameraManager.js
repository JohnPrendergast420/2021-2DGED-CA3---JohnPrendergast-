
class CameraManager {

  get activeCamera() {
    return this._cameras[this.activeCameraIndex];
  }
  get cameras() {
    return this._cameras;
  }
  get activeCameraIndex() {
    return this._activeCameraIndex;
  }

  set activeCamera(activeCamera) {
    this._activeCamera = activeCamera;
  }
  set cameras(cameras) {
    this._cameras = cameras;
  }
  set activeCameraIndex(index) {
    this._activeCameraIndex = index >= 0 ? index : 0;
  }

  constructor(id) {
    this.id = id;
    this.cameras = [];

    this.activeCameraIndex = -1;
  }

  add(camera) {

    if (camera instanceof Camera2D) {

  
      this.cameras.push(camera);


      if (this.activeCameraIndex == -1) {

        this.activeCameraIndex = this.cameras.length - 1;
      }
    }

    else {
      throw camera + " is not an instance of Camera2D!";
    }
  }

  remove(predicate) {
    this.cameras.splice(this.findIndex(predicate), 1);
  }

  removeAll() {
    this.cameras.splice(0, this.cameras.length);
    this.activeCameraIndex = -1;
  }

  findIndex(predicate) {
    return this.cameras.findIndex(predicate);
  }

  findAllIndices(predicate) {

    let j = 0;
    let foundIndices = [];

    for (let i = 0; i < this.cameras.length; i++) {

      if (predicate(this.cameras[i])) {

        foundIndices[j] = i;
      }

      j++;
    }


    return foundIndices.length != 0 ? foundIndices : null;
  }

  sort(compareFunction) {
    this.cameras.sort(compareFunction);
  }



  update(gameTime) {


    if ((this.activeCamera.statusType & StatusType.Updated) != 0) {

      this.activeCamera.update(gameTime);
    }
  }
}