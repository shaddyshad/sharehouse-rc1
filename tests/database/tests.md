## Documentation of tests

*Use cases*
- *Listing warehouses*

As a Warehouse operator
I want to list my warehouses
So that I can manage them from a central dashboard

*Scenarios*

A warehouse operator has no registered warehouses
A warehouse operator has a few registered warehouses

*BDD Tests*

+ Scenario 1: A warehouse operator has no registered warehouses
  - Given the operator is signed in
  - And has no registered warehouses
  - When the operator requests a listing of the warehouses
  - Then ensure he's notified about non existent warehouse
  - And call to registering a warehouse

+ Scenario 2: A warehouse has a few registered warehouses
  - Given the operator is signed in
  - And the operator has registered warehouses
  - When the operator requests for a listing of the warehouses
  - Then ensure that the warehouse data is sent
  
