# Structural Pattern Case

Case 2: Adapter Pattern (Structural)

The Problem (Case Scenario):

You are developing software for a modern laptop system that only supports USB-C connections. However, users still possess old Memory Cards (SD Cards) that contain important photos.

The new system interface (USBCPort) expects a connectUSBC() method, but the old memory card class (OldMemoryCard) only has an insertIntoSlot() method. They are incompatible.

Task: Implement the Adapter Pattern to create a wrapper class (CardToUSBCAdapter) that allows the old Memory Card to be read by the new Laptop system without changing the code of the memory card itself.