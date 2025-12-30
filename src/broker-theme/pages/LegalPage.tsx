/**
 * ============================================================
 * BROKER LEGAL PAGE - Premium Stock Broker Aesthetic
 * ============================================================
 */

import { useTheme } from '@/broker-theme/config';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  FileText, 
  Lock, 
  Scale, 
  AlertTriangle,
  CheckCircle2,
  Building2,
  Globe
} from 'lucide-react';

const LegalPage = () => {
  const { config } = useTheme();
  const { brokerName } = config;

  const sections = {
    terms: {
      icon: FileText,
      title: 'Terms of Service',
      content: [
        {
          heading: 'Acceptance of Terms',
          text: `By accessing and using ${brokerName || 'this platform'}, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all users, including traders, investors, and visitors.`,
        },
        {
          heading: 'Eligibility',
          text: 'You must be at least 18 years old and have the legal capacity to enter into binding contracts to use our services. You represent that you are not located in any jurisdiction where trading is prohibited.',
        },
        {
          heading: 'Account Registration',
          text: 'You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.',
        },
        {
          heading: 'Trading Risks',
          text: 'Trading financial instruments involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. You should not invest money you cannot afford to lose.',
        },
        {
          heading: 'Prohibited Activities',
          text: 'You agree not to engage in market manipulation, wash trading, front-running, or any other prohibited trading practices. Violation may result in immediate account termination.',
        },
        {
          heading: 'Limitation of Liability',
          text: `${brokerName || 'The platform'} shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service, including loss of profits or trading losses.`,
        },
      ],
    },
    privacy: {
      icon: Lock,
      title: 'Privacy Policy',
      content: [
        {
          heading: 'Information Collection',
          text: 'We collect personal identification information (name, email, phone), financial information (bank details, trading history), and technical data (IP address, device information) to provide and improve our services.',
        },
        {
          heading: 'Data Usage',
          text: 'Your information is used to process transactions, verify identity, prevent fraud, comply with regulations, improve our platform, and communicate important updates about your account.',
        },
        {
          heading: 'Data Sharing',
          text: 'We do not sell your personal data. We may share information with regulatory authorities, service providers, and partners only as necessary to operate our platform and comply with legal obligations.',
        },
        {
          heading: 'Security Measures',
          text: 'We implement industry-standard security measures including encryption, secure servers, regular security audits, and access controls to protect your personal and financial information.',
        },
        {
          heading: 'Data Retention',
          text: 'We retain your data for as long as your account is active or as required by law. You may request deletion of your data subject to regulatory retention requirements.',
        },
        {
          heading: 'Your Rights',
          text: 'You have the right to access, correct, delete, or export your personal data. You may also opt-out of marketing communications at any time. Contact our privacy team to exercise these rights.',
        },
      ],
    },
    risk: {
      icon: Shield,
      title: 'Risk Disclosure',
      content: [
        {
          heading: 'General Risk Warning',
          text: 'Trading financial instruments carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. You could lose some or all of your invested capital.',
          isWarning: true,
        },
        {
          heading: 'Market Risk',
          text: 'The value of investments can go down as well as up. Market conditions, economic factors, and geopolitical events can significantly impact asset prices. Prices can be volatile and change rapidly.',
        },
        {
          heading: 'Leverage Risk',
          text: 'Trading with leverage magnifies both potential profits and losses. Leveraged positions may result in losses exceeding your initial investment. Margin calls may require additional funds on short notice.',
        },
        {
          heading: 'Liquidity Risk',
          text: 'Some markets may have limited liquidity, making it difficult to buy or sell assets at desired prices. During volatile market conditions, liquidity may decrease significantly.',
        },
        {
          heading: 'Technology Risk',
          text: 'Online trading is subject to internet connectivity issues, system failures, and cyber security threats. You should have backup plans for executing urgent trades.',
        },
        {
          heading: 'Regulatory Risk',
          text: 'Regulatory changes in various jurisdictions may affect the availability of certain trading products or services. Tax treatment of trading profits may vary by jurisdiction.',
        },
      ],
    },
    compliance: {
      icon: Scale,
      title: 'Regulatory Compliance',
      content: [
        {
          heading: 'Licensing & Registration',
          text: `${brokerName || 'This platform'} operates under applicable regulatory frameworks and maintains necessary licenses for financial services in all jurisdictions where we operate.`,
        },
        {
          heading: 'KYC/AML Policy',
          text: 'We comply with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations. Identity verification is mandatory for all users before trading. We reserve the right to request additional documentation.',
        },
        {
          heading: 'Fund Segregation',
          text: 'Client funds are held in segregated accounts with tier-1 banks, completely separate from company operating funds, in compliance with regulatory requirements.',
        },
        {
          heading: 'Insurance Protection',
          text: 'Client assets are protected by comprehensive insurance coverage. Cold storage assets are insured against theft, loss, and cybersecurity breaches.',
        },
        {
          heading: 'Regulatory Reporting',
          text: 'We maintain transparent reporting practices and cooperate fully with regulatory authorities. We file all required reports and undergo regular audits.',
        },
        {
          heading: 'Complaint Handling',
          text: 'We have established procedures for handling client complaints in accordance with regulatory requirements. Complaints are reviewed within 24 hours and resolved within regulatory timeframes.',
        },
      ],
    },
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ 
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Scale className="h-4 w-4" />
              <span>Legal & Compliance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in stagger-1">
              Legal Information
            </h1>
            
            <p className="text-xl text-muted-foreground animate-fade-in stagger-2">
              Transparency and compliance are fundamental to how we operate. 
              Review our legal documents and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            {[
              { icon: Shield, text: 'Bank-Grade Security' },
              { icon: Building2, text: 'Fully Licensed' },
              { icon: Globe, text: 'Global Compliance' },
              { icon: CheckCircle2, text: 'Regularly Audited' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="terms" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 h-auto p-1.5 bg-muted/50 rounded-xl">
                {Object.entries(sections).map(([key, section]) => (
                  <TabsTrigger 
                    key={key}
                    value={key} 
                    className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(sections).map(([key, section]) => (
                <TabsContent key={key} value={key} className="animate-fade-in">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    {/* Section Header */}
                    <div className="p-6 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <section.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="p-6 space-y-8">
                      {section.content.map((item, index) => (
                        <div key={item.heading}>
                          {item.isWarning && (
                            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-destructive mb-1">Important Risk Warning</p>
                                  <p className="text-sm text-destructive/80">{item.text}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {!item.isWarning && (
                            <div className="group">
                              <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 text-sm font-semibold text-primary group-hover:bg-primary/10 transition-colors">
                                  {index + 1}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {item.heading}
                                  </h3>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {item.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Contact Section */}
            <div className="mt-12 p-8 bg-muted/30 rounded-2xl border border-border text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Questions About Our Policies?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our legal and compliance team is available to answer any questions.
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at{' '}
                <span className="text-primary font-medium">
                  legal@{brokerName?.toLowerCase().replace(/\s/g, '') || 'broker'}.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {brokerName}. All rights reserved. 
            Licensed and regulated in applicable jurisdictions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
