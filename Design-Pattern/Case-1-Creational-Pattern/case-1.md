# Cretional Pattern Case

Case 1: Builder Pattern (Creational)

The Problem (Case Scenario):

A Travel Agency application needs to create complex Vacation Packages for its customers. A package might include a hotel, a flight, a tour guide, and travel insurance.

However, not every customer wants all these options. Some just want a hotel and flight (Luxury Trip), while others might just want a flight and a hostel (Backpacker Trip).

Challenge: Creating a VacationPackage object using a giant constructor with many null or false parameters is messy and hard to read.

Task: Implement the Builder Pattern to construct different types of vacation packages step-by-step, allowing for a clean and flexible creation process.