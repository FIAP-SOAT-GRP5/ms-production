@getOrderById
Feature: Get order by id

  @getOrderById
  Scenario: Find order by id
    Given I have a registered order
    When I inform the order id
    Then the order is returned

  @getOrderByIdNotFound
  Scenario: Do not find order by id
    Given I have some registered order
    When I do not inform the order id
    Then the order is not returned
