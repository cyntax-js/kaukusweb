import { WizardProvider } from "./WizardContext";
import { FormRenderer } from "./components";
import { securityCreationSchema } from "./schema";

export function SecurityCreationWizard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Security</h1>
        <p className="text-muted-foreground mt-1">
          Launch a new securities offering on the capital markets platform
        </p>
      </div>

      <WizardProvider schema={securityCreationSchema}>
        <FormRenderer />
      </WizardProvider>
    </div>
  );
}

export default SecurityCreationWizard;
