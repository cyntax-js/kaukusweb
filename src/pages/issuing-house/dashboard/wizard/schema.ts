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
// console.log("jgjg");

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
  helpText?: string;
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
          helpText:
            "The full registered legal name of the issuing entity as it appears on official documents.",
        },
        {
          id: "issuerBrandName",
          type: "string",
          label: "Brand Name",
          helpText:
            "Trading name or brand name if different from the legal name.",
        },
        {
          id: "issuerCountry",
          type: "string",
          label: "Country of Incorporation",
          required: true,
          helpText:
            "The country where the company was legally incorporated or registered.",
        },
        {
          id: "issuerIncorporationDate",
          type: "date",
          label: "Date of Incorporation",
          required: true,
          helpText:
            "The date when the company was officially registered with the corporate registry.",
        },
        {
          id: "issuerRegistrationNumber",
          type: "string",
          label: "Registration Number",
          required: true,
          helpText:
            "The official company registration number issued by the corporate affairs commission.",
        },
        {
          id: "issuerRegisteredAddress",
          type: "textarea",
          label: "Registered Address",
          required: true,
          helpText: "The official registered office address of the company.",
        },
        {
          id: "issuerSector",
          type: "string",
          label: "Sector",
          required: true,
          helpText:
            "The primary industry sector in which the company operates (e.g., Financial Services, Technology, Manufacturing).",
        },
        {
          id: "issuerDescription",
          type: "textarea",
          label: "Brief Description",
          helpText:
            "A short summary of the company's business activities and operations.",
        },
        {
          id: "issuerWebsite",
          type: "string",
          label: "Website",
          helpText:
            "The company's official website URL for investor reference.",
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
          helpText:
            "Choose DEBT for bonds, notes, or other fixed-income instruments. Choose EQUITY for shares or stock offerings.",
        },
        {
          id: "issuerType",
          type: "select",
          label: "Issuer Type",
          options: ["GOVERNMENT", "CORPORATE"],
          required: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
          helpText:
            "Government issuers include federal, state, or local government entities. Corporate issuers are private or public companies.",
        },
        {
          id: "issuerType",
          type: "select",
          label: "Issuer Type",
          options: ["CORPORATE"],
          required: true,
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText: "Equity offerings are issued by corporate entities only.",
        },
        {
          id: "marketType",
          type: "select",
          label: "Market Type",
          options: ["PRIMARY", "SECONDARY", "BOTH"],
          visibleWhen: { field: "securityType", in: ["DEBT"] },
          helpText:
            "Primary market is for new issuances. Secondary market allows trading of existing securities. Both enables both markets.",
        },
        {
          id: "marketType",
          type: "select",
          label: "Market Type",
          options: ["PRIVATE", "PUBLIC"],
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Private offerings are restricted to qualified investors. Public offerings are open to the general public.",
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
          helpText:
            "Treasury Bills are short-term government securities. Bonds are long-term debt instruments. Commercial Papers are unsecured short-term debt.",
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
          helpText:
            "Zero coupon pays no periodic interest. Fixed coupon pays a set rate. Floating coupon adjusts with market rates. Inflation-linked adjusts for inflation.",
        },
        {
          id: "discountRate",
          type: "number",
          label: "Discount Rate (%)",
          visibleWhen: { field: "couponType", in: ["ZERO"] },
          helpText:
            "The discount rate at which zero-coupon instruments are issued below par value.",
        },
        {
          id: "couponRate",
          type: "number",
          label: "Coupon Rate (%)",
          visibleWhen: { field: "couponType", in: ["FIXED"] },
          helpText:
            "The annual interest rate paid to bondholders, expressed as a percentage of par value.",
        },
        {
          id: "couponFrequency",
          type: "select",
          label: "Coupon Frequency",
          options: ["ANNUAL", "SEMI_ANNUAL"],
          visibleWhen: { field: "couponType", in: ["FIXED"] },
          helpText:
            "How often interest payments are made to investors. Semi-annual is most common for bonds.",
        },
        {
          id: "cbnRate",
          type: "readOnly",
          label: "CBN Reference Rate",
          valueSource: "external",
          visibleWhen: { field: "couponType", in: ["FLOATING"] },
          helpText:
            "The Central Bank of Nigeria's monetary policy rate used as the base for floating rate calculations.",
        },
        {
          id: "spread",
          type: "number",
          label: "Spread (%)",
          visibleWhen: { field: "couponType", in: ["FLOATING"] },
          helpText:
            "The additional percentage added to the reference rate to determine the total coupon payment.",
        },
        {
          id: "inflationIndex",
          type: "readOnly",
          label: "Inflation Index",
          valueSource: "external",
          visibleWhen: { field: "couponType", in: ["INFLATION_LINKED"] },
          helpText:
            "The current inflation index value used for adjusting principal and interest payments.",
        },
        {
          id: "equityType",
          type: "select",
          label: "Equity Type",
          options: ["ORDINARY", "PREFERENCE", "OTHER"],
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Ordinary shares have voting rights. Preference shares have priority for dividends but typically no voting rights.",
        },
        {
          id: "votingRights",
          type: "toggle",
          label: "Voting Rights",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Enable if shareholders can vote on company matters at general meetings.",
        },
        {
          id: "dividendRights",
          type: "toggle",
          label: "Dividend Rights",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Enable if shareholders are entitled to receive dividend distributions when declared.",
        },
        {
          id: "transferRestriction",
          type: "toggle",
          label: "Transfer Restriction (OTC Only)",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Enable if shares can only be traded over-the-counter and not on public exchanges.",
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
          helpText:
            "The total capital amount you intend to raise through this debt issuance.",
        },
        {
          id: "parValue",
          type: "number",
          label: "Par Value (₦)",
          value: 1000,
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
          helpText:
            "The face value of each unit. Standard par value is ₦1,000 for Nigerian debt instruments.",
        },
        {
          id: "totalUnits",
          type: "number",
          label: "Total Units",
          formula: "amountToRaise / parValue",
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["DEBT"] },
          helpText:
            "Automatically calculated as Amount to Raise divided by Par Value.",
        },
        {
          id: "maturityDate",
          type: "date",
          label: "Maturity Date",
          visibleWhen: { field: "securityType", in: ["DEBT"] },
          helpText:
            "The date when the principal amount becomes due and payable to investors.",
        },
        {
          id: "callable",
          type: "toggle",
          label: "Callable",
          helpText:
            "Enable if the issuer can redeem the security before maturity at a specified price.",
        },
        {
          id: "convertible",
          type: "toggle",
          label: "Convertible",
          visibleWhen: { field: "issuerType", in: ["CORPORATE"] },
          helpText:
            "Enable if the debt can be converted to equity shares under certain conditions.",
        },
        {
          id: "authorisedShares",
          type: "number",
          label: "Total Authorised Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "The maximum number of shares the company is authorized to issue as per its articles.",
        },
        {
          id: "outstandingShares",
          type: "number",
          label: "Outstanding Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "The number of shares currently held by all shareholders including institutional and retail.",
        },
        {
          id: "issuedShares",
          type: "number",
          label: "Issued Shares",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "The total number of shares that have been issued by the company to date.",
        },
        {
          id: "sharesToList",
          type: "number",
          label: "Shares to be Listed",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "The number of shares being offered in this listing for trading on the exchange.",
        },
        {
          id: "targetRaiseAmount",
          type: "number",
          label: "Target Raise Amount (₦)",
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "The total capital amount you intend to raise through this equity offering.",
        },
        {
          id: "pricePerShare",
          type: "number",
          label: "Price per Share (₦)",
          formula: "targetRaiseAmount / sharesToList",
          readOnly: true,
          visibleWhen: { field: "securityType", in: ["EQUITY"] },
          helpText:
            "Automatically calculated as Target Raise Amount divided by Shares to List.",
        },
        {
          id: "minInvestment",
          type: "number",
          label: "Minimum Investment",
          helpText:
            "The minimum amount or units an investor must subscribe to participate in this offering.",
        },
        {
          id: "maxInvestment",
          type: "number",
          label: "Maximum Investment",
          helpText:
            "The maximum amount or units a single investor can subscribe to in this offering.",
        },
        {
          id: "eligibleInvestors",
          type: "multiSelect",
          label: "Eligible Investors",
          options: ["INSTITUTIONAL", "QUALIFIED", "ACCREDITED", "OTHERS"],
          helpText:
            "Select all investor categories that are permitted to participate in this offering.",
        },
        {
          id: "useOfProceeds",
          type: "textarea",
          label: "Use of Proceeds",
          helpText:
            "Describe how the funds raised will be used (e.g., expansion, debt refinancing, working capital).",
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
          helpText:
            "Enable if investment banks or dealers will guarantee the sale of the securities.",
        },
        {
          id: "underwriters",
          type: "multiSelect",
          label: "Underwriters",
          optionsSource: "api/underwriters",
          visibleWhen: { field: "underwritten", in: [true] },
          helpText:
            "Select the financial institutions that will underwrite this offering.",
        },
        {
          id: "secondaryMarket",
          type: "toggle",
          label: "Secondary Market Eligible",
          helpText:
            "Enable if the security can be traded on secondary markets after the initial offering.",
        },
        {
          id: "creditRating",
          type: "select",
          label: "Credit Rating",
          options: ["AAA", "AA", "A", "BBB", "BB", "B"],
          allowManualOverride: true,
          helpText:
            "The credit rating assigned by a recognized rating agency. AAA is highest quality, B is speculative.",
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
          helpText:
            "The company's valuation before the new investment from this offering.",
        },
        {
          id: "postMoneyValuation",
          type: "number",
          label: "Post-money Valuation",
          helpText:
            "The company's valuation after including the new investment from this offering.",
        },
        {
          id: "valuationMethod",
          type: "select",
          label: "Valuation Method",
          options: ["DCF", "COMPARABLES", "OTHER"],
          helpText:
            "DCF uses discounted cash flows. Comparables uses peer company multiples. Select the methodology used.",
        },
        {
          id: "valuationDate",
          type: "date",
          label: "Valuation Date",
          helpText:
            "The date on which the valuation was performed by an independent valuator.",
        },
        {
          id: "capTable",
          type: "table",
          label: "Capitalization Table",
          helpText:
            "Enter the ownership structure showing each shareholder's stake before and after this offering.",
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
          helpText:
            "Enable if the company has audited financial statements available for review.",
        },
        {
          id: "auditYears",
          type: "number",
          label: "Years Covered",
          visibleWhen: { field: "auditedFinancials", in: [true] },
          helpText:
            "The number of years of audited financial history available (typically 3-5 years required).",
        },
        {
          id: "auditorName",
          type: "string",
          label: "Auditor Name",
          visibleWhen: { field: "auditedFinancials", in: [true] },
          helpText:
            "The name of the external audit firm that conducted the financial audit.",
        },
        {
          id: "auditDocs",
          type: "file",
          label: "Audited Documents",
          visibleWhen: { field: "auditedFinancials", in: [true] },
          helpText:
            "Upload the audited financial statements including auditor's report.",
        },
        {
          id: "boardMembers",
          type: "repeatableCard",
          label: "Board Members",
          helpText: "Add details for each member of the board of directors.",
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
          helpText:
            "Add details for key executives and senior management team members.",
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
          helpText:
            "Upload the shareholders agreement outlining rights, obligations, and governance.",
        },
        {
          id: "pendingLitigation",
          type: "toggle",
          label: "Pending Litigation",
          helpText:
            "Enable if there are any ongoing legal proceedings involving the company.",
        },
        {
          id: "regulatorySanctions",
          type: "toggle",
          label: "Regulatory Sanctions",
          helpText:
            "Enable if the company has faced any regulatory penalties or sanctions.",
        },
        {
          id: "kycCompleted",
          type: "toggle",
          label: "KYC Completed",
          helpText:
            "Enable if all Know Your Customer requirements have been fulfilled.",
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
          helpText:
            "The official certificate proving the company's legal incorporation.",
        },
        {
          id: "memart",
          type: "file",
          label: "Memorandum & Articles",
          helpText: "The company's memorandum and articles of association.",
        },
        {
          id: "boardResolution",
          type: "file",
          label: "Board Resolution",
          helpText: "Board resolution authorizing this securities offering.",
        },
        {
          id: "legalOpinion",
          type: "file",
          label: "Legal Opinion",
          helpText:
            "Legal opinion from external counsel on the offering's compliance.",
        },
        {
          id: "dueDiligence",
          type: "file",
          label: "Issuing House Due Diligence Report",
          helpText: "The due diligence report prepared by the issuing house.",
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
          helpText:
            "By checking this box, you confirm the accuracy and completeness of all submitted information.",
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
          helpText: "Your unique reference number for tracking this offering.",
        },
        {
          id: "admissionDate",
          type: "readOnly",
          label: "Admission Date",
          helpText: "The date when the security will be admitted for trading.",
        },
        {
          id: "status",
          type: "readOnly",
          label: "Status",
          helpText: "Current status of your offering in the approval process.",
        },
      ],
    },
  ],
};
