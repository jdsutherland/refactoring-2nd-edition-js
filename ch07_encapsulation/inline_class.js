class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany} : ${this.trackingNumber}`;
  }
  get trackingInformation() { return this._trackingInformation; }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }

  get trackingNumber() { return this._trackingNumber; }
  set trackingNumber(arg) { this._trackingNumber = arg; }

  get shippingCompany() { return this._shippingCompany; }
  set shippingCompany(arg) { this._shippingCompany = arg; }
}

// ex client
aShipment.shippingCompany = request.vendor;
