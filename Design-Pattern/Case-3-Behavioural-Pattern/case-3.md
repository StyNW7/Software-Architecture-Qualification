# Behavioural Pattern Case

Case 3: Observer Pattern (Behavioral)

The Problem (Case Scenario):

In the volatile Cryptocurrency market, prices change rapidly. Different types of investors (Observers) need to react immediately to these price changes.

'Whale' Investors want to buy when the price drops low.

'Panic' Sellers want to sell everything immediately if the price goes too high.

Challenge: The Market system (BitcoinTracker) needs to broadcast price updates to all interested investors instantly. It should not need to know the specific trading strategy of each investor, nor should investors have to manually check the price every second.

Task: Implement the Observer Pattern. The BitcoinTracker acts as the 'Subject' that automatically notifies all subscribed Investors whenever the Bitcoin price changes, allowing them to execute their specific buying or selling logic.