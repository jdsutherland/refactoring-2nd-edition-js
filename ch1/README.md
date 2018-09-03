## Description
Image a company of theatrical players who go out to various events performing plays. Typically, a customer will request a few plays and the company charges them based on the size of the audience and the kind of play they perform.

There are currently two kinds of plays that company performs: tragedies and comedies.

As well as providing a bill for the performance, the company gives its customers “volume credits” which they can use for discounts on future performances—think of it as a customer loyalty mechanism.

## Potential changes
* statement() in HTML
  - One solution is to duplicate the method with one printing html - this is a trap as future changes will require both methods to change, duplicating knowledge.
* perform more kinds of plays: history, pastoral, pastoral-comical, historical-pastoral, tragical-historical, tragical-comical-historical-pastoral, scene individable, and poem unlimited
  - This will affect the way their plays are charged for and the way volume credits are calculated

## First draft comments
* `switch` statement clearly sticks out as seperate behavior
