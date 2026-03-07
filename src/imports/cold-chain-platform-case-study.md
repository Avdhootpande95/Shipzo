Problem 1: Multitenant Cold-Chain Supply & Logistics System
Context
Mysha is the CTO of a pharmaceutical logistics company that specializes in transporting temperature-sensitive drugs, biologics, vaccines, and clinical materials across global markets. While her company does not manufacture finished products, it maintains access to certified raw materials required by major pharmaceutical companies. In addition to multimodal cold-chain transport, her organization enables clients to procure approved raw materials and request fully managed delivery through air, sea, rail, and refrigerated road networks.

Her clients operate in high-risk, highly regulated environments where temperature deviations, customs delays, or poor coordination can result in product spoilage and financial loss. Currently, procurement, shipment tracking, and compliance validation are handled through disconnected systems and manual workflows. There is no unified platform that connects raw material sourcing, route planning, live temperature monitoring, and client visibility into a single operational layer.

Problem Statement
You are tasked with helping her design a web-based, multitenant platform that functions as an intelligent cold-chain supply and logistics control tower. The system must support multiple pharmaceutical companies within one secure environment, ensuring strict data isolation and role-based access.

Pharmaceutical clients should be able to request certified raw materials, initiate logistics orders, define temperature ranges (2–8°C, -20°C, -70°C), specify delivery timelines, and track fulfillment from origin to destination. When a request is submitted, the system must evaluate inventory availability, assess multimodal routing options, allocate capacity across carriers, and generate delivery estimates, cost projections, and risk scores. It should compare air, sea, rail, and refrigerated road options and recommend optimal and backup routes based on urgency, geography, and compliance requirements.

Internally, Mysha's operations team must access a centralized control dashboard displaying global shipments, raw material inventory status, carrier capacity, temperature telemetry, and predictive risk alerts. The platform should detect potential temperature excursions, forecast delays, validate compliance documentation, and maintain audit-ready records.

Externally, each client organization must have its own tenant dashboard providing real-time shipment visibility, temperature logs, estimated arrival times, procurement status, compliance downloads, and alert notifications without exposure to other tenants' data.

The experience must balance operational depth with clarity. It should enable fast decision-making, proactive risk management, and transparent client communication within a single, intelligent cold-chain supply and logistics platform.

Expected Outcome
This challenge focuses entirely on the web application experience — from login through multitenant dashboards, procurement workflows, logistics orchestration, and compliance monitoring. Your final output should be a cohesive UI/UX case study demonstrating how this system enables secure, efficient coordination of pharmaceutical material sourcing and global temperature-controlled transport.