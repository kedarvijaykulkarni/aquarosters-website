import { ProductDashboardMockup } from "./ProductDashboardMockup";
import { LiveAgendaMockup } from "./LiveAgendaMockup";
import { TripManifestMockup } from "./TripManifestMockup";
import { ReschedulingWorkflowMockup } from "./ReschedulingWorkflowMockup";
import { POSPaymentMockup } from "./POSPaymentMockup";
import { GearAvailabilityMockup } from "./GearAvailabilityMockup";
import { AuditLogMockup } from "./AuditLogMockup";

export const mockupRegistry: Record<string, React.ComponentType> = {
  ProductDashboardMockup,
  LiveAgendaMockup,
  TripManifestMockup,
  ReschedulingWorkflowMockup,
  POSPaymentMockup,
  GearAvailabilityMockup,
  AuditLogMockup,
};
