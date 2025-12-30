import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const legalDocs = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "December 1, 2024",
    content: [
      {
        heading: "1. Acceptance of Terms",
        text: "By accessing or using ContisX services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.",
      },
      {
        heading: "2. Use License",
        text: "Permission is granted to temporarily access the materials on ContisX for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      },
      {
        heading: "3. Broker Responsibilities",
        text: "Brokers using our platform are responsible for maintaining all required licenses and regulatory approvals in their operating jurisdictions. Brokers must ensure compliance with all applicable financial regulations.",
      },
      {
        heading: "4. Dealer Obligations",
        text: "Dealers providing liquidity through our platform must maintain adequate capital reserves and comply with all market-making regulations. Dealers are responsible for their own risk management.",
      },
      {
        heading: "5. Service Availability",
        text: "While we strive for 99.9% uptime, ContisX does not guarantee uninterrupted access to our services. Scheduled maintenance will be communicated in advance.",
      },
      {
        heading: "6. Fees and Payments",
        text: "All fees are due in advance and non-refundable unless otherwise specified. Transaction fees are calculated based on trading volume and settled monthly.",
      },
      {
        heading: "7. Limitation of Liability",
        text: "ContisX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "December 1, 2024",
    content: [
      {
        heading: "1. Information We Collect",
        text: "We collect information you provide directly, including account details, business information, and documentation required for regulatory compliance.",
      },
      {
        heading: "2. How We Use Information",
        text: "We use collected information to provide our services, process transactions, comply with regulations, and improve our platform.",
      },
      {
        heading: "3. Data Sharing",
        text: "We do not sell your personal information. We may share data with regulatory authorities as required by law and with service providers who assist in our operations.",
      },
      {
        heading: "4. Data Security",
        text: "We implement bank-grade security measures including encryption, access controls, and regular security audits to protect your information.",
      },
      {
        heading: "5. Data Retention",
        text: "We retain your information for as long as your account is active and as required by applicable financial regulations.",
      },
      {
        heading: "6. Your Rights",
        text: "You have the right to access, correct, or delete your personal information. Contact our privacy team to exercise these rights.",
      },
    ],
  },
  compliance: {
    title: "Regulatory Compliance",
    lastUpdated: "December 1, 2024",
    content: [
      {
        heading: "1. Regulatory Status",
        text: "ContisX operates under regulatory oversight in multiple jurisdictions including SEC (US), FCA (UK), ASIC (Australia), and other regulatory bodies.",
      },
      {
        heading: "2. AML/KYC Requirements",
        text: "All brokers and dealers must complete our Know Your Customer (KYC) process and comply with Anti-Money Laundering (AML) requirements.",
      },
      {
        heading: "3. Transaction Monitoring",
        text: "All transactions are monitored for suspicious activity in compliance with financial crime regulations.",
      },
      {
        heading: "4. Reporting Obligations",
        text: "We maintain comprehensive records and provide required reports to regulatory authorities as mandated by law.",
      },
      {
        heading: "5. Broker/Dealer Requirements",
        text: "Partners must maintain valid licenses in their operating jurisdictions and provide proof of regulatory compliance.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    lastUpdated: "December 1, 2024",
    content: [
      {
        heading: "1. What Are Cookies",
        text: "Cookies are small text files stored on your device that help us provide and improve our services.",
      },
      {
        heading: "2. Essential Cookies",
        text: "These cookies are necessary for the website to function and cannot be disabled. They include authentication and security cookies.",
      },
      {
        heading: "3. Analytics Cookies",
        text: "We use analytics cookies to understand how visitors interact with our website, helping us improve our services.",
      },
      {
        heading: "4. Managing Cookies",
        text: "You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.",
      },
    ],
  },
};

export default function Legal() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Legal</h1>
          <p className="text-muted-foreground opacity-0 animate-fade-in stagger-1">
            Important legal documents and policies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="cookies">Cookies</TabsTrigger>
            </TabsList>

            {Object.entries(legalDocs).map(([key, doc]) => (
              <TabsContent key={key} value={key}>
                <Card className="p-8">
                  <div className="mb-6 pb-6 border-b border-border">
                    <h2 className="text-2xl font-bold mb-2">{doc.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {doc.lastUpdated}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {doc.content.map((section, i) => (
                      <div key={i}>
                        <h3 className="text-lg font-semibold mb-2">
                          {section.heading}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {section.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
