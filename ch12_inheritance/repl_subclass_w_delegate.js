class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }
  get hasTalkback() {
    return (this._premiumDelegate)
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
  get basePrice() {
    return (this._premiumDelegate)
      ? this._premiumDelegate.basePrice
      : this._privateBasePrice;
  }
  get _privateBasePrice() {
    let result = this._show.price;
    if (this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }
  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }
  // not in super
  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}

class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
  get hasTalkback() {
    return this._host._show.hasOwnProperty('talkback');
  }
  get basePrice() {
    return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
  }
}

function createBooking(show, date) {
  return new Booking(show, date);
}
function createPremiumBooking(show, date, extras) {
  const result = new PremiumBooking (show, date, extras);
  result._bePremium(extras);
  return result;
}

aBooking1 = createBooking(show,date);
aBooking2 = createPremiumBooking(show, date, extras);

// There are quite a few changes that the premium booking makes to what it inherits from the superclass.
// As is typical with this kind of programming-by-difference, in some cases the subclass overrides methods on the superclass, in others it adds new methods that are only relevant for the subclass.
  // I won’t go into all of them, but I will pick out a few interesting cases.

// So why would I want to change such a happy situation by using Replace Subclass with Delegate?
  // Inheritance is a tool that can only be used once—so if I have another reason to use inheritance, and I think it will benefit me more than the premium booking subclass, I’ll need to handle premium bookings a different way.

// Also, I may need to change from the default booking to the premium booking dynamically—i.e., support a method like aBooking.bePremium(). In some cases, I can avoid this by creating a whole new object (a common example is where an HTTP request loads new data from the server).
  // But sometimes, I need to modify a data structure and not rebuild it from scratch, and it is difficult to just replace a single booking that’s referred to from many different places. In such situations, it can be useful to allow a booking to switch from default to premium and back again.
