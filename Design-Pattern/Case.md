# Design Pattern Case

Case 1: Builder Pattern (Creational)

The Problem (Case Scenario):

A Travel Agency application needs to create complex Vacation Packages for its customers. A package might include a hotel, a flight, a tour guide, and travel insurance.

However, not every customer wants all these options. Some just want a hotel and flight (Luxury Trip), while others might just want a flight and a hostel (Backpacker Trip).

Challenge: Creating a VacationPackage object using a giant constructor with many null or false parameters is messy and hard to read.

Task: Implement the Builder Pattern to construct different types of vacation packages step-by-step, allowing for a clean and flexible creation process.

---

Case 2: Adapter Pattern (Structural)

The Problem (Case Scenario):

You are developing software for a modern laptop system that only supports USB-C connections. However, users still possess old Memory Cards (SD Cards) that contain important photos.

The new system interface (USBCPort) expects a connectUSBC() method, but the old memory card class (OldMemoryCard) only has an insertIntoSlot() method. They are incompatible.

Task: Implement the Adapter Pattern to create a wrapper class (CardToUSBCAdapter) that allows the old Memory Card to be read by the new Laptop system without changing the code of the memory card itself.

---

Case 3: Observer Pattern (Behavioral)

The Problem (Case Scenario):

In the volatile Cryptocurrency market, prices change rapidly. Different types of investors (Observers) need to react immediately to these price changes.

'Whale' Investors want to buy when the price drops low.

'Panic' Sellers want to sell everything immediately if the price goes too high.

Challenge: The Market system (BitcoinTracker) needs to broadcast price updates to all interested investors instantly. It should not need to know the specific trading strategy of each investor, nor should investors have to manually check the price every second.

Task: Implement the Observer Pattern. The BitcoinTracker acts as the 'Subject' that automatically notifies all subscribed Investors whenever the Bitcoin price changes, allowing them to execute their specific buying or selling logic.