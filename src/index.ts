import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
  translateFrom,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { registerWorkspace } from "@openmrs/esm-patient-common-lib";

import { createLeftPanelLink } from "./left-panel-link";
import worklistRadiologyTile from "./metrics-tiles/worklist-tile.component";
import referredRadiologyTile from "./metrics-tiles/referred-tile.component";
import orderedRadiologyTile from "./metrics-tiles/procedure-ordered-tile.component";
import reviewRadiologyTile from "./metrics-tiles/review-tile.component";
import approveRadiologyTile from "./metrics-tiles/approved-tile.component";
import notDoneRadiologyTile from "./metrics-tiles/rejected-tile.component";
import addRadiologyToWorklistDialog from "./radiology-tabs/test-ordered/pick-radiology-order/add-to-worklist-dialog.component";
import rejectOrderDialogComponent from "./radiology-tabs/test-ordered/reject-order-dialog/reject-order-dialog.component";
import radiologyInstructionsModal from "./radiology-tabs/test-ordered/radiology-instructions/radiology-instructions.component";
import ReviewOrderDialog from "./radiology-tabs/review-ordered/review-radiology-report-dialog/review-radiology-report-dialog.component";
import RadiologyOrderBasketPanelExtension from "./form/radiology-orders/radiology-order-basket-panel/radiology-order-basket-panel.extension";
import radiologyRejectReasonModal from "./radiology-tabs/test-ordered/reject-order-dialog/radiology-reject-reason.component";
const moduleName = "@openmrs/esm-radiology-app";

const options = {
  featureName: "openmrs/esm-radiology-app",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,

  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const radiologyDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "radiology",
    title: "Radiology",
  }),
  options
);

// Tiles
export const worklistRadiologyTileComponent = getSyncLifecycle(
  worklistRadiologyTile,
  options
);
export const referredRadiologyTileComponent = getSyncLifecycle(
  referredRadiologyTile,
  options
);
export const orderedRadiologyTileComponent = getSyncLifecycle(
  orderedRadiologyTile,
  options
);
export const reviewRadiologyTileComponent = getSyncLifecycle(
  reviewRadiologyTile,
  options
);
export const approveRadiologyTileComponent = getSyncLifecycle(
  approveRadiologyTile,
  options
);
export const notDoneRadiologyTileComponent = getSyncLifecycle(
  notDoneRadiologyTile,
  options
);
export const addRadiologyToWorklistDialogComponent = getSyncLifecycle(
  addRadiologyToWorklistDialog,
  options
);

// Modals
export const rejectOrderDialog = getSyncLifecycle(
  rejectOrderDialogComponent,
  options
);
export const radiologyInstructionsModalComponent = getSyncLifecycle(
  radiologyInstructionsModal,
  options
);
export const reviewRadiologyReportDialog = getSyncLifecycle(
  ReviewOrderDialog,
  options
);

export const radiologyOrderPanel = getSyncLifecycle(
  RadiologyOrderBasketPanelExtension,
  options
);
export const radiologyRejectReasonModalComponent = getSyncLifecycle(
  radiologyRejectReasonModal,
  options
);

// t('addRadiologyOrderWorkspaceTitle', 'Add Radiology order')
registerWorkspace({
  name: "add-radiology-order",
  type: "order",
  title: translateFrom(
    moduleName,
    "addRadiologyOrderWorkspaceTitle",
    "Add radiology order"
  ),
  load: getAsyncLifecycle(
    () =>
      import(
        "./form/radiology-orders/add-radiology-order/add-radiology-order.workspace"
      ),
    options
  ),
});
