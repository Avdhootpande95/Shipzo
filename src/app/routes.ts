import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { OperationsLayout } from "./layouts/OperationsLayout";
import { ClientDashboard } from "./pages/ClientDashboard";
import { CreateOrder } from "./pages/CreateOrder";
import { RouteComparison } from "./pages/RouteComparison";
import { CarrierHistory } from "./pages/CarrierHistory";
import { TemperatureChange } from "./pages/TemperatureChange";
import { OperationsMap } from "./pages/OperationsMap";
import { CostBreakdown } from "./pages/CostBreakdown";
import { ContactCarrier } from "./pages/ContactCarrier";
import { LastMileDelivery } from "./pages/LastMileDelivery";
import { OperationsDashboard } from "./pages/operations/OperationsDashboard";
import { ActiveShipmentsEnhanced } from "./pages/operations/ActiveShipmentsEnhanced";
import { InventoryEnhanced } from "./pages/operations/InventoryEnhanced";
import { CarrierManagementEnhanced } from "./pages/operations/CarrierManagementEnhanced";
import { AlertsEnhanced } from "./pages/operations/AlertsEnhanced";
import { RoutePlanningEnhanced, CostMonitoringEnhanced, ComplianceEnhanced, CommunicationsEnhanced } from "./pages/operations/RemainingPagesEnhanced";
import { LastMileOperations } from "./pages/operations/LastMileOperations";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: ClientDashboard },
      { path: "create-order", Component: CreateOrder },
      { path: "route-comparison", Component: RouteComparison },
      { path: "carrier-history", Component: CarrierHistory },
      { path: "temperature-change", Component: TemperatureChange },
      { path: "operations-map", Component: OperationsMap },
      { path: "cost-breakdown", Component: CostBreakdown },
      { path: "contact-carrier", Component: ContactCarrier },
      { path: "last-mile-delivery", Component: LastMileDelivery },
    ],
  },
  {
    path: "/operations",
    Component: OperationsLayout,
    children: [
      { index: true, Component: OperationsDashboard },
      { path: "active-shipments", Component: ActiveShipmentsEnhanced },
      { path: "inventory", Component: InventoryEnhanced },
      { path: "carrier-management", Component: CarrierManagementEnhanced },
      { path: "alerts", Component: AlertsEnhanced },
      { path: "route-planning", Component: RoutePlanningEnhanced },
      { path: "cost-monitoring", Component: CostMonitoringEnhanced },
      { path: "compliance", Component: ComplianceEnhanced },
      { path: "communications", Component: CommunicationsEnhanced },
      { path: "last-mile-delivery", Component: LastMileOperations },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);