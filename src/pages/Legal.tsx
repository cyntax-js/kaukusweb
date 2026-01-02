import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const legalDocs = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "December 1, 2024",
    content: [
      {
        heading: "1. Acceptance of Terms",
        text: "By accessing or using ContiSX services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.",
      },
      {
        heading: "2. Use License",
        text: "Permission is granted to temporarily access the materials on ContiSX for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
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
        text: "While we strive for 99.9% uptime, ContiSX does not guarantee uninterrupted access to our services. Scheduled maintenance will be communicated in advance.",
      },
      {
        heading: "6. Fees and Payments",
        text: "All fees are due in advance and non-refundable unless otherwise specified. Transaction fees are calculated based on trading volume and settled monthly.",
      },
      {
        heading: "7. Limitation of Liability",
        text: "ContiSX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.",
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
        text: "ContiSX operates under regulatory oversight in multiple jurisdictions including SEC (US), FCA (UK), ASIC (Australia), and other regulatory bodies.",
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <small className="font-semibold text-[#1570EF]">Privacy Policy</small>
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            We care about your privacy
          </h1>
          <p className="text-muted-foreground opacity-0 animate-fade-in stagger-1">
            Your privacy is important to us at Kaukus. We respect your privacy
            regarding any information we may collect from you across our
            website.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="terms" className="w-fit">
            <TabsList className="grid grid-cols-2 max-w-lg mx-auto mb-8">
              <TabsTrigger value="legal-version">Legal version</TabsTrigger>
              <TabsTrigger value="simple-version">Simple version</TabsTrigger>
            </TabsList>

            <TabsContent
              key="legal-version"
              value="legal-version"
              className="text-gray-600"
            >
              <p className="mb-10">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
                <br />
                <br />
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  What information do we collect?
                </h3>

                <p className="">
                  Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                  nulla odio nisl vitae. In aliquet pellentesque aenean hac
                  vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                  vitae malesuada fringilla.
                  <br />
                  <br />
                  Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                  imperdiet commodo consectetur convallis risus. Sed condimentum
                  enim dignissim adipiscing faucibus consequat, urna. Viverra
                  purus et erat auctor aliquam. Risus, volutpat vulputate
                  posuere purus sit congue convallis aliquet. Arcu id augue ut
                  feugiat donec porttitor neque. Mauris, neque ultricies eu
                  vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc
                  lectus in tellus, pharetra, porttitor.
                  <br />
                  <br />
                  Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                  mauris id. Non pellentesque congue eget consectetur turpis.
                  Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                  aenean tempus. Quis velit eget ut tortor tellus. Sed vel,
                  congue felis elit erat nam nibh orci.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  How do we use your information?
                </h3>

                <p className="">
                  Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                  nulla odio nisl vitae. In aliquet pellentesque aenean hac
                  vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                  vitae malesuada fringilla.
                  <br />
                  <br />
                  Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                  imperdiet commodo consectetur convallis risus. Sed condimentum
                  enim dignissim adipiscing faucibus consequat, urna. Viverra
                  purus et erat auctor aliquam. Risus, volutpat vulputate
                  posuere purus sit congue convallis aliquet. Arcu id augue ut
                  feugiat donec porttitor neque. Mauris, neque ultricies eu
                  vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc
                  lectus in tellus, pharetra, porttitor.
                  <br />
                  <br />
                  Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                  mauris id. Non pellentesque congue eget consectetur turpis.
                  Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                  aenean tempus. Quis velit eget ut tortor tellus. Sed vel,
                  congue felis elit erat nam nibh orci.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  Do we use cookies and other tracking technologies?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How long do we keep your information?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How do we keep your information safe?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  What are your privacy rights?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How can you contact us about this policy?
                </h3>

                <p className="">
                  Sagittis et eu at elementum, quis in. Proin praesent volutpat
                  egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                  ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                  consectetur ac ultrices at diam dui eget fringilla tincidunt.
                  Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                  quis auctor vulputate hac elementum gravida cursus
                  dis.Sagittis et eu at elementum, quis in. Proin praesent
                  volutpat egestas sociis sit lorem nunc nunc sit. Eget diam
                  curabitur mi ac. Auctor rutrum lacus malesuada massa ornare
                  et. Vulputate consectetur ac ultrices at diam dui eget
                  fringilla tincidunt. Arcu sit dignissim massa erat cursus
                  vulputate gravida id. Sed quis auctor vulputate hac elementum
                  gravida cursus dis.
                </p>
                <br />
                <ol className="list-decimal list-inside">
                  <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                  <li>
                    Eu turpis posuere semper feugiat volutpat elit, ultrices
                    suspendisse. Auctor vel in vitae placerat.
                  </li>
                  <li>
                    Suspendisse maecenas ac donec scelerisque diam sed est duis
                    purus.
                  </li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent
              key="simple-version"
              value="simple-version"
              className="text-gray-600"
            >
              <p className="mb-10">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo
                lacinia pharetra, semper. Eget in volutpat mollis at volutpat
                lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
                enim. Quis at habitant diam at. Suscipit tristique risus, at
                donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet
                sodales id est ac volutpat.{" "}
              </p>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  What information do we collect?
                </h3>

                <p className="">
                  Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                  nulla odio nisl vitae. In aliquet pellentesque aenean hac
                  vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                  vitae malesuada fringilla.
                  <br />
                  <br />
                  Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                  imperdiet commodo consectetur convallis risus. Sed condimentum
                  enim dignissim adipiscing faucibus consequat, urna. Viverra
                  purus et erat auctor aliquam. Risus, volutpat vulputate
                  posuere purus sit congue convallis aliquet. Arcu id augue ut
                  feugiat donec porttitor neque. Mauris, neque ultricies eu
                  vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc
                  lectus in tellus, pharetra, porttitor.
                  <br />
                  <br />
                  Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                  mauris id. Non pellentesque congue eget consectetur turpis.
                  Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                  aenean tempus. Quis velit eget ut tortor tellus. Sed vel,
                  congue felis elit erat nam nibh orci.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  How do we use your information?
                </h3>

                <p className="">
                  Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                  nulla odio nisl vitae. In aliquet pellentesque aenean hac
                  vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                  vitae malesuada fringilla.
                  <br />
                  <br />
                  Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                  imperdiet commodo consectetur convallis risus. Sed condimentum
                  enim dignissim adipiscing faucibus consequat, urna. Viverra
                  purus et erat auctor aliquam. Risus, volutpat vulputate
                  posuere purus sit congue convallis aliquet. Arcu id augue ut
                  feugiat donec porttitor neque. Mauris, neque ultricies eu
                  vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc
                  lectus in tellus, pharetra, porttitor.
                  <br />
                  <br />
                  Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                  mauris id. Non pellentesque congue eget consectetur turpis.
                  Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                  aenean tempus. Quis velit eget ut tortor tellus. Sed vel,
                  congue felis elit erat nam nibh orci.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  Do we use cookies and other tracking technologies?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How long do we keep your information?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How do we keep your information safe?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-5 font-semibold text-3xl text-black">
                  What are your privacy rights?
                </h3>

                <p className="">
                  Pharetra morbi libero id aliquam elit massa integer tellus.
                  Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper
                  sit dictumst ut eget a, elementum eu. Maecenas est morbi
                  mattis id in ac pellentesque ac.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="mb-4 font-semibold text-2xl text-black">
                  How can you contact us about this policy?
                </h3>

                <p className="">
                  Sagittis et eu at elementum, quis in. Proin praesent volutpat
                  egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                  ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                  consectetur ac ultrices at diam dui eget fringilla tincidunt.
                  Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                  quis auctor vulputate hac elementum gravida cursus
                  dis.Sagittis et eu at elementum, quis in. Proin praesent
                  volutpat egestas sociis sit lorem nunc nunc sit. Eget diam
                  curabitur mi ac. Auctor rutrum lacus malesuada massa ornare
                  et. Vulputate consectetur ac ultrices at diam dui eget
                  fringilla tincidunt. Arcu sit dignissim massa erat cursus
                  vulputate gravida id. Sed quis auctor vulputate hac elementum
                  gravida cursus dis.
                </p>
                <br />
                <ol className="list-decimal list-inside">
                  <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                  <li>
                    Eu turpis posuere semper feugiat volutpat elit, ultrices
                    suspendisse. Auctor vel in vitae placerat.
                  </li>
                  <li>
                    Suspendisse maecenas ac donec scelerisque diam sed est duis
                    purus.
                  </li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
