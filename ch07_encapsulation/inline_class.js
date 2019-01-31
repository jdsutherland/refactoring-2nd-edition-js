class TrackingInformation {
  get shippingCompany() { return this._shippingCompany; }
  set shippingCompany(arg) { this._shippingCompany = arg; }
  get trackingNumber() { return this._trackingNumber; }
  set trackingNumber(arg) { this._trackingNumber = arg; }
  get display() {
    return `${this.shippingCompany} : $ { this.trackingNumber }
    `;
  }
}

// TrackingInfo seems better inlined into Shipment

class Shipment {
  get trackingInfo() { return this._trackingInformation.display; }
  get trackingInformation() { return this._trackingInformation; }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }

  set shippingCompany(arg) { this._trackingInformation.shippingCompany = arg; }
}

// ex client
aShipment.shippingCompany = request.vendor;
