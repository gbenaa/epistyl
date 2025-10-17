Feature: PBI-05 Parameter Form

  Background:
    Given an image upload has completed

  Scenario: Defaults shown when form is displayed
    When the parameter form is displayed
    Then the prompt field shows the default prompt
    And the strength field shows the default strength
    And the steps field shows the default steps
