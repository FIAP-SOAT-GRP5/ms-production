@listProcessingOrders
Feature: List Processing Orders
  
  As a user
  I want to retrieve a list of processing orders
  So that I can see which orders are currently being processed

  Scenario: Retrieve a list of processing orders
    Given there are processing orders in the system
    When I request the list of processing orders
    Then I should receive a list of processing orders
  
  Scenario: No processing orders available
    Given there are no orders in processing
    When the user requests the list of processing orders
    Then the response should indicate an empty list


