Design a **modern enterprise web application interface for a pharmaceutical cold-chain logistics platform**.
The system is used by pharmaceutical companies and logistics operations teams to manage **temperature-controlled shipments, raw material procurement, and multimodal logistics (rail, air, sea, refrigerated road)**.

The interface should feel like a **global logistics control tower**, with clear dashboards, real-time maps, shipment tracking, risk indicators, and procurement workflows.

Use a **clean enterprise UI style with maps, data cards, timelines, charts, and alert indicators**.

---

### Login Page

Create a secure login interface.

Fields:

* Email / Username
* Password

Buttons:

* Login
* Forgot Password
* Contact Support

Example login note (display in small brackets under fields):

*(Write anything with @ as email, and any random password works for demo login)*

Example message:

“Welcome to the Global Cold-Chain Logistics Platform.
Manage pharmaceutical procurement, temperature-controlled shipments, and global delivery tracking from one unified system.”

Show security badges such as **GMP / GDP compliance**.

---

### Client Dashboard

After login, show a **Client Dashboard**.

Widgets:

* Active Shipments
* Pending Deliveries
* Temperature Alerts
* Procurement Requests
* Completed Orders

Include a **mini shipment map showing active shipments**.

Provide quick buttons:

* Create New Order
* Request Raw Material
* Track Shipment

---

### Create Order Interface

Allow clients to create a logistics order.

Fields:

* Pickup Location
* Destination
* Temperature Requirement

  * 2–8°C
  * −20°C
  * −70°C
* Delivery Deadline
* Shipment Weight / Volume
* Preferred Route Type
* Risk Level Indicator

Clients can also **select preferred route options** and see risk estimates.

---

### Add Items for Delivery

Inside the order creation page, include a **material catalog selection interface**.

UI Components:

Searchable catalog
Certification badges
Inventory availability indicator

Example item card:

mRNA Lipid Nanoparticle
Certified GMP
Available: 250 units
Expiry: 2027

Buttons:

Request Material
Add to Shipment

Allow users to add **multiple items to the order**.

---

### Route Comparison Interface

When the system generates route options, display **side-by-side comparison cards**.

Example:

Route A
Air + Truck
ETA: 36 hrs
Cost: $18k
Risk: Low

Route B
Rail + Truck
ETA: 72 hrs
Cost: $9k
Risk: Medium

UI components:

* Comparison cards
* Cost bar charts
* Risk indicators
* “Select Route” button

---

### Carrier History

Show the full multimodal transport history of a shipment.

Display as a **timeline or step flow**.

Example:

Rail Transport → Air Cargo → Refrigerated Truck

For each stage show:

* Carrier name
* Transport mode
* Departure location
* Arrival location
* Time duration
* Temperature compliance status

Provide views for both:

* Client shipment history
* Operations detailed carrier data

---

### Temperature Change Request

Allow clients to request a **temperature range change during shipment**.

Fields:

* Current temperature requirement
* Requested new temperature range
* Reason for change
* Approval status

Display warning alerts regarding **compliance or risk impacts**.

---

### Operations Control Map

Create a **central control map for operations teams**.

Features:

* Global map showing all active shipments
* Real-time shipment locations
* Travelled route path
* Planned future route
* Transport mode icons (rail, ship, plane, truck)

Clicking a shipment should open a **side panel with shipment details**.

---

### Extra Cost & Re-Route Cost Section

Create a section showing additional logistics costs.

Breakdown example:

* Base shipping cost
* Cold storage cost
* Handling cost
* Customs fees
* Re-route cost
* Emergency refrigeration cost

Display using **stacked charts or expandable cost panels**.

---

### Contact Current Shipping Vessel / Carrier

Provide a contact interface allowing users to **contact the active transport operator**.

Display:

* Vessel / carrier name
* Current location
* Captain or logistics contact
* Communication options

Buttons:

Call Carrier
Send Message
Request Status Update

---

### Alerts & Risk Indicators

Include real-time alerts for:

* Temperature deviations
* Shipment delays
* Route disruptions
* Customs delays

Display using **color indicators**:

Green – Safe
Yellow – Warning
Red – Critical

---

### Design Style

The interface should look like a **real-time logistics command center**.

Include:

* Clean dashboards
* Interactive maps
* Shipment timelines
* Comparison cards
* Cost charts
* Risk indicators
* Status badges
* Alert notifications

The design should emphasize **clarity, real-time visibility, and operational decision-making for pharmaceutical cold-chain logistics**.
