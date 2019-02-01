function bookConcert(aCustomer, isPremium) {
  if (isPremium) {
    // logic for premium booking
  } else {
    // logic for regular booking
  }
}

// ex clients
bookConcert(aCustomer, true);
bookConcert(aCustomer, CustomerType.PREMIUM);
bookConcert(aCustomer, "premium");

// I dislike flag arguments because they complicate the process of understanding what function calls are available and how to call them.
// My first route into an API is usually the list of available functions, and flag arguments hide the differences in the function calls that are available.
// Once I select a function, I have to figure out what values are available for the flag arguments.
// Boolean flags are even worse since they don’t convey their meaning to the reader—in a function call, I can’t figure out what true means.
// It’s clearer to provide an explicit function for the task I want to do:
premiumBookConcert(aCustomer);

// Not all arguments like this are flag arguments.
  // To be a flag argument, the callers must be setting the boolean value to a literal value, not data that’s flowing through the program.
  // Also, the implementation function must be using the argument to influence its control flow, not as data that it passes to further functions.
