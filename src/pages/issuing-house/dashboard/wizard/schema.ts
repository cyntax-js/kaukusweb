// Security Creation Wizard Schema
export interface VisibleWhen {
  field: string;
  in: (string | boolean | number)[];
}

export interface TableColumn {
  id: string;
  label: string;
  type: "string" | "number" | "date";
  formula?: string;
}

export interface FieldSchema {
  id: string;
  type:
    | "select"
    | "number"
    | "date"
    | "toggle"
    | "checkbox"
    | "file"
    | "textarea"
    | "multiSelect"
    | "repeatableCard"
    | "readOnly"
    | "table"
    | "string";
  label: string;
  options?: string[] | Record<string, string[]>;
  optionsSource?: string;
  required?: boolean;
  visibleWhen?: VisibleWhen;
  formula?: string;
  readOnly?: boolean;
  value?: unknown;
  valueSource?: string;
  allowManualOverride?: boolean;
  fields?: FieldSchema[];
  columns?: TableColumn[];
}

export interface StepSchema {
  id: string;
  title: string;
  fields: FieldSchema[];
}

export interface WizardSchema {
  version?: string;
  parValue: number;
  steps: StepSchema[];
}

export const securityCreationSchema: WizardSchema = {
  version: "1.0",
  parValue: 1000,
  steps: [
    {
      id: "issuerInfo",
      title: "Issuer Information",
      fields: [
        {
          id: "issuerLegalName",
          type: "string",
          label: "Legal Name",
          required: true,
        },
        {
          id: "issuerBrandName",
          type: "string",
          label: "Brand Name",
        },
        {
          id: "issuerCountry",
          type: "string",
          label: "Country of Incorporation",
          required: true,
        },
        {
          id: "issuerIncorporationDate",
          type: "date",
          label: "Date of Incorporation",
          required: true,
        },
        {
          id: "issuerRegistrationNumber",
          type: "string",
          label: "Registration Number",
          required: true,
        },
        {
          id: "issuerRegisteredAddress",
          type: "textarea",
          label: "Registered Address",
          required: true,
        },
        {
          id: "issuerSector",
          type: "string",
          label: "Sector",
          required: true,
        },
        {
          id: "issuerDescription",
          type: "textarea",
          label: "Brief Description",
        },
        {
          id: "issuerWebsite",
          type: "string",
          label: "Website",
        },
      ],
    },
    {
      id: "overview",
      title: "Security Overview",
      fields: [
        {
          id: "securityType",
          type: "select",
          label: "Security Type",
          options: ["DEBT", "EQUITY"],
          required: true,
        },
        {
          id: "issuerType",
          type: "select",
          label: "Issuer Type",
          options: ["GOVERNMENT", "CORPORATE"],
          required: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "issuerType",
          type: "select",
          label: "Issuer Type",
          options: ["CORPORATE"],
          required: true,
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "marketType",
          type: "select",
          label: "Market Type",
          options: ["PRIMARY", "SECONDARY", "BOTH"],
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "marketType",
          type: "select",
          label: "Market Type",
          options: ["PRIVATE", "PUBLIC"],
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
      ],
    },
    {
      id: "instrument",
      title: "Instrument Definition",
      fields: [
        {
          id: "instrumentType",
          type: "select",
          label: "Instrument Type",
          options: {
            GOVERNMENT: [
              "TREASURY_BILL",
              "COMMERCIAL_PAPER",
              "BOND",
              "PROMISSORY_NOTE",
            ],
            CORPORATE: ["COMMERCIAL_PAPER", "BOND"],
          },
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "couponType",
          type: "select",
          label: "Coupon Structure",
          options: {
            GOVERNMENT: ["ZERO", "FIXED", "FLOATING", "INFLATION_LINKED"],
            CORPORATE: ["ZERO", "FIXED", "FLOATING"],
          },
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "discountRate",
          type: "number",
          label: "Discount Rate (%)",
          visibleWhen: { field: "couponType", in: ["ZERO"] },
        },
        {
          id: "couponRate",
          type: "number",
          label: "Coupon Rate (%)",
          visibleWhen: { field: "couponType", in: ["FIXED"] },
        },
        {
          id: "couponFrequency",
          type: "select",
          label: "Coupon Frequency",
          options: ["ANNUAL", "SEMI_ANNUAL"],
          visibleWhen: { field: "couponType", in: ["FIXED"] },
        },
        {
          id: "cbnRate",
          type: "readOnly",
          label: "CBN Reference Rate",
          valueSource: "external",
          visibleWhen: { field: "couponType", in: ["FLOATING"] },
        },
        {
          id: "spread",
          type: "number",
          label: "Spread (%)",
          visibleWhen: { field: "couponType", in: ["FLOATING"] },
        },
        {
          id: "inflationIndex",
          type: "readOnly",
          label: "Inflation Index",
          valueSource: "external",
          visibleWhen: { field: "couponType", in: ["INFLATION_LINKED"] },
        },
        {
          id: "equityType",
          type: "select",
          label: "Equity Type",
          options: ["ORDINARY", "PREFERENCE", "OTHER"],
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "votingRights",
          type: "toggle",
          label: "Voting Rights",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "dividendRights",
          type: "toggle",
          label: "Dividend Rights",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "transferRestriction",
          type: "toggle",
          label: "Transfer Restriction (OTC Only)",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
      ],
    },
    {
      id: "economics",
      title: "Economics & Size",
      fields: [
        {
          id: "amountToRaise",
          type: "number",
          label: "Amount to Raise (₦)",
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "parValue",
          type: "number",
          label: "Par Value (₦)",
          value: 1000,
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "totalUnits",
          type: "number",
          label: "Total Units",
          formula: "amountToRaise / parValue",
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "maturityDate",
          type: "date",
          label: "Maturity Date",
          visibleWhen: { field: "securityType", in: ["DEBT"] },
        },
        {
          id: "callable",
          type: "toggle",
          label: "Callable",
        },
        {
          id: "convertible",
          type: "toggle",
          label: "Convertible",
          visibleWhen: { field: "issuerType", in: ["CORPORATE"] },
        },
        {
          id: "authorisedShares",
          type: "number",
          label: "Total Authorised Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "outstandingShares",
          type: "number",
          label: "Outstanding Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "issuedShares",
          type: "number",
          label: "Issued Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "sharesToList",
          type: "number",
          label: "Shares to be Listed",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "targetRaiseAmount",
          type: "number",
          label: "Target Raise Amount (₦)",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "pricePerShare",
          type: "number",
          label: "Price per Share (₦)",
          formula: "targetRaiseAmount / sharesToList",
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
        },
        {
          id: "minInvestment",
          type: "number",
          label: "Minimum Investment",
        },
        {
          id: "maxInvestment",
          type: "number",
          label: "Maximum Investment",
        },
        {
          id: "eligibleInvestors",
          type: "multiSelect",
          label: "Eligible Investors",
          options: ["INSTITUTIONAL", "QUALIFIED", "ACCREDITED", "OTHERS"],
        },
        {
          id: "useOfProceeds",
          type: "textarea",
          label: "Use of Proceeds",
        },
      ],
    },
    {
      id: "market",
      title: "Underwriting & Market Setup",
      fields: [
        {
          id: "underwritten",
          type: "toggle",
          label: "Underwritten Offering",
        },
        {
          id: "underwriters",
          type: "multiSelect",
          label: "Underwriters",
          optionsSource: "api/underwriters",
          visibleWhen: { field: "underwritten", in: [true] },
        },
        {
          id: "secondaryMarket",
          type: "toggle",
          label: "Secondary Market Eligible",
        },
        {
          id: "creditRating",
          type: "select",
          label: "Credit Rating",
          options: ["AAA", "AA", "A", "BBB", "BB", "B"],
          allowManualOverride: true,
        },
      ],
    },
    {
      id: "valuation",
      title: "Valuation & Capitalization",
      fields: [
        {
          id: "preMoneyValuation",
          type: "number",
          label: "Pre-money Valuation",
        },
        {
          id: "postMoneyValuation",
          type: "number",
          label: "Post-money Valuation",
        },
        {
          id: "valuationMethod",
          type: "select",
          label: "Valuation Method",
          options: ["DCF", "COMPARABLES", "OTHER"],
        },
        {
          id: "valuationDate",
          type: "date",
          label: "Valuation Date",
        },
        {
          id: "capTable",
          type: "table",
          label: "Capitalization Table",
          columns: [
            { id: "shareholder", label: "Shareholder", type: "string" },
            { id: "preShares", label: "Pre-fund Shares", type: "number" },
            { id: "prePercent", label: "Pre-fund %", type: "number" },
            { id: "postShares", label: "Post-fund Shares", type: "number" },
            { id: "postPercent", label: "Post-fund %", type: "number" },
          ],
        },
      ],
    },
    {
      id: "compliance",
      title: "Governance, Financials & Legal",
      fields: [
        {
          id: "auditedFinancials",
          type: "toggle",
          label: "Audited Financials Available",
        },
        {
          id: "auditYears",
          type: "number",
          label: "Years Covered",
          visibleWhen: { field: "auditedFinancials", in: [true] },
        },
        {
          id: "auditorName",
          type: "string",
          label: "Auditor Name",
          visibleWhen: { field: "auditedFinancials", in: [true] },
        },
        {
          id: "auditDocs",
          type: "file",
          label: "Audited Documents",
          visibleWhen: { field: "auditedFinancials", in: [true] },
        },
        {
          id: "boardMembers",
          type: "repeatableCard",
          label: "Board Members",
          fields: [
            { id: "name", type: "string", label: "Name" },
            { id: "role", type: "string", label: "Role" },
            { id: "nationality", type: "string", label: "Nationality" },
            { id: "appointmentDate", type: "date", label: "Appointment Date" },
            { id: "photo", type: "file", label: "Photo" },
          ],
        },
        {
          id: "seniorManagement",
          type: "repeatableCard",
          label: "Senior Management",
          fields: [
            { id: "name", type: "string", label: "Name" },
            { id: "position", type: "string", label: "Position" },
            { id: "experience", type: "textarea", label: "Experience" },
            { id: "photo", type: "file", label: "Photo" },
          ],
        },
        {
          id: "shareholdersAgreement",
          type: "file",
          label: "Shareholders Agreement",
        },
        {
          id: "pendingLitigation",
          type: "toggle",
          label: "Pending Litigation",
        },
        {
          id: "regulatorySanctions",
          type: "toggle",
          label: "Regulatory Sanctions",
        },
        {
          id: "kycCompleted",
          type: "toggle",
          label: "KYC Completed",
        },
      ],
    },
    {
      id: "documents",
      title: "Documentation Upload",
      fields: [
        {
          id: "coi",
          type: "file",
          label: "Certificate of Incorporation",
        },
        {
          id: "memart",
          type: "file",
          label: "Memorandum & Articles",
        },
        {
          id: "boardResolution",
          type: "file",
          label: "Board Resolution",
        },
        {
          id: "legalOpinion",
          type: "file",
          label: "Legal Opinion",
        },
        {
          id: "dueDiligence",
          type: "file",
          label: "Issuing House Due Diligence Report",
        },
      ],
    },
    {
      id: "review",
      title: "Review & Submit",
      fields: [
        {
          id: "declaration",
          type: "checkbox",
          label: "I declare all information is true and complete.",
        },
      ],
    },
    {
      id: "postApproval",
      title: "Post Approval",
      fields: [
        {
          id: "listingReference",
          type: "readOnly",
          label: "Listing Reference Number",
        },
        {
          id: "admissionDate",
          type: "readOnly",
          label: "Admission Date",
        },
        {
          id: "status",
          type: "readOnly",
          label: "Status",
        },
      ],
    },
  ],
};
