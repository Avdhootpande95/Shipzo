Update and refine the **Cold-Chain Logistics Web Platform UI** with the following changes and improvements.

The platform has two main sections:

1. **Client Portal**
2. **Operations Control Center**

Ensure the interface remains **clean, professional, and enterprise-grade**, similar to a **global logistics command center**.

---

## Remove Admin Button

Remove the **Admin button or admin panel** entirely from the UI.
Users should only see the following primary sections:

* Client Portal
* Operations Section

No visible admin controls should appear anywhere in the navigation.

---

# Operations Section (Operations Control Center)

Design a dedicated **Operations Control Center** for the internal logistics team.

### Operations Navigation Menu

Include the following main sections in the sidebar:

* Dashboard
* Active Shipments
* Inventory
* Carrier Management
* Alerts & Risk Monitoring
* Route Planning
* Cost Monitoring
* Compliance & Documents
* Communications

---

## Operations Dashboard

Create a **real-time operational overview dashboard**.

Widgets should include:

* Total Active Shipments
* Shipments in Transit
* Temperature Alerts
* Delayed Shipments
* Inventory Levels
* Carrier Utilization
* Upcoming Deliveries

Include charts for:

* Shipment distribution by transport mode (Air / Rail / Sea / Road)
* Temperature compliance trends
* Delivery performance

---

## Central Operations Map

Add a **large central world map** on the operations dashboard.

Requirements:

Use a **clean world map with only country outlines (plain minimal map)** similar to a simple geographic outline.

Map Features:

* Display all active shipments in real time
* Show current shipment location
* Display travelled route
* Show future planned route

Each shipment marker should include:

* Shipment ID
* Current carrier
* Transport type icon (plane, ship, train, truck)
* Temperature status indicator

Clicking a shipment should open a **side panel with shipment details**.

---

## Active Shipments Page

Create a page displaying **all shipments currently managed by operations**.

Table columns:

* Shipment ID
* Client Name
* Origin
* Destination
* Transport Mode
* Temperature Requirement
* Current Status
* Risk Level
* ETA

Add quick action buttons:

* View Route
* Contact Carrier
* Reroute Shipment
* View Temperature Logs

---

## Inventory Management (Operations)

Add a full **inventory management system** for operations.

Features:

Operations can add materials to inventory.

Inventory fields:

* Material Name
* Batch Number
* Certification Type
* Storage Temperature
* Quantity Available
* Expiry Date
* Warehouse Location

Buttons:

Add Item
Update Inventory
Remove Item

Display inventory as **cards or table view**.

Example inventory card:

mRNA Lipid Nanoparticle
Certified GMP
Quantity: 250 units
Storage: −20°C
Expiry: 2027

---

## Carrier Management

Add a carrier management section.

Operations should be able to view:

* Rail carriers
* Airline cargo partners
* Shipping vessels
* Refrigerated trucking companies

Carrier details should include:

* Capacity
* Reliability score
* Average delay rate
* Temperature compliance history

---

## Alerts & Risk Monitoring

Create a dedicated **risk monitoring panel**.

Show alerts for:

* Temperature excursion risk
* Shipment delays
* Weather disruptions
* Customs clearance issues

Display alerts with priority indicators:

Green – Safe
Yellow – Warning
Red – Critical

---

## Cost Monitoring

Add a **cost monitoring panel** showing operational expenses.

Breakdown:

* Transport cost
* Refrigeration cost
* Handling cost
* Customs cost
* Emergency reroute cost
* Additional cold storage cost

Display with charts and expandable breakdown sections.

---

# Map Improvements (Both Client and Operations)

Fix the map design across the entire website.

Use a **clean, professional world map image with country outlines only (plain minimal geographic map)**.

The map should:

* Show shipment locations
* Display shipment routes
* Highlight origin and destination
* Support zoom and pan
* Look visually clean and modern

Avoid cluttered maps with terrain or excessive labels.

---

# Client Map Improvements

In the client dashboard map:

Show only **the client’s shipments**, not global operations shipments.

Include:

* Current location
* Route travelled
* Estimated remaining route
* Delivery ETA

Clicking a shipment marker should open a **shipment information panel**.

---

# General UI Improvements

Improve the entire interface to resemble a **professional logistics control platform**.

Enhance:

* Layout spacing
* Map visualization
* Shipment cards
* Route timelines
* Cost charts
* Risk indicators
* Notification alerts

Use clear status colors:

Green → Normal
Yellow → Warning
Red → Critical

The platform should feel like a **real-time pharmaceutical cold-chain logistics control tower** used by global supply chain teams.
