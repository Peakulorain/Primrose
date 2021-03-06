import { Object3D } from "three";

pliny.method({
  parent: "THREE.Object3D",
  name: "appendChild",
  description: "An alias for `Object3D::add`, to mirror DOM.",
  parameters: [ {
    name: "child",
    type: "THREE.Object3D",
    description: "The object to add."
  }]
});
Object3D.prototype.appendChild = function(child) {
  return this.add(child);
};

Object.defineProperty(Object3D.prototype, "pickable", {
  get: function() {
    return this._listeners && (
         (this._listeners.enter && this._listeners.enter.length > 0)
      || (this._listeners.exit && this._listeners.exit.length > 0)
      || (this._listeners.select && this._listeners.select.length > 0)
      || (this._listeners.useraction && this._listeners.useraction.length > 0)
      || (this._listeners.pointerstart && this._listeners.pointerstart.length > 0)
      || (this._listeners.pointerend && this._listeners.pointerend.length > 0)
      || (this._listeners.pointermove && this._listeners.pointermove.length > 0)
      || (this._listeners.gazestart && this._listeners.gazestart.length > 0)
      || (this._listeners.gazecancel && this._listeners.gazecancel.length > 0)
      || (this._listeners.gazemove && this._listeners.gazemove.length > 0)
      || (this._listeners.gazecomplete && this._listeners.gazecomplete.length > 0));
  }
});

Object3D.prototype.latLng = function(lat, lon, r) {
  lat = -Math.PI * (lat || 0) / 180;
  lon = Math.PI * (lon || 0) / 180;
  r = r || 1.5;
  this.rotation.set(lat, lon, 0, "XYZ");
  this.position.set(0, 0, -r);
  this.position.applyQuaternion(this.quaternion);
  return this;
};

Object3D.prototype.named = function(name){
  this.name = name;
  return this;
};

Object3D.prototype.addTo = function(obj) {
  obj.add(this);
  return this;
};

Object3D.prototype.at = function(x, y, z) {
  this.position.set(x, y, z);
  return this;
};

Object3D.prototype.rot = function(x, y, z) {
  this.rotation.set(x, y, z);
  return this;
};

Object3D.prototype.scl = function(x, y, z) {
  this.scale.set(x, y, z);
  return this;
};

Object.defineProperty(Object3D.prototype, "visible", {
  get: function() {
    return this._visible;
  },
  set: function(v) {
    var oldV = this._visible;
    this._visible = v;
    if(oldV !== v){
      this.emit("visiblechanged");
    }
  }
});
