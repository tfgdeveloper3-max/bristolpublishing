import React from "react";
import { Link } from "react-router-dom";
import PolicyLayout, { ContactCard } from "./PolicyLayout";
import type { PolicySection } from "./PolicyLayout";

const sections: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p><strong>Information you give us.</strong> When you fill in a form on our website, request a quote, or work with us on a project, we may collect:</p>
        <ul>
          <li>Your name, email address and phone number</li>
          <li>The service you are interested in and any message you send us</li>
          <li>Manuscripts, drafts, images, audio and other materials you share for your project</li>
          <li>Billing details needed to process payments (card payments are handled by our payment processors, not stored by us)</li>
        </ul>
        <p><strong>Information collected automatically.</strong> When you visit our website, we may collect basic technical information such as your browser type, device, IP address, the pages you view and how you arrived at our site. This is gathered through cookies and similar technologies.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your enquiries and prepare quotes</li>
          <li>Deliver the services you have hired us for, such as writing, editing, design, publishing, marketing and audiobook production</li>
          <li>Send project updates, invoices and service-related messages</li>
          <li>Process payments and keep business and tax records</li>
          <li>Improve our website and services</li>
          <li>Send occasional updates or offers, where permitted. You can opt out at any time.</li>
          <li>Meet legal obligations and protect our rights</li>
        </ul>
      </>
    ),
  },
  {
    id: "your-manuscript",
    title: "Your manuscript and creative work",
    content: (
      <>
        <p>We treat your manuscript and project materials as confidential. We use them only to carry out the work you have asked us to do. They are shared only with team members and contractors who need them for your project and who are bound by confidentiality obligations.</p>
        <p>You keep ownership of your original work. Ownership of project deliverables is covered in our <Link to="/terms-of-service">Terms of Service</Link> and your project agreement.</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    content: (
      <>
        <p><strong>We do not sell your personal information.</strong> We share it only in these situations:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run our business, such as website hosting, lead and customer management, email and payment processing</li>
          <li><strong>Publishing and distribution platforms</strong> when you ask us to publish or distribute your book on your behalf</li>
          <li><strong>Legal reasons</strong>, when required by law or to protect our rights, users or the public</li>
          <li><strong>Business transfers</strong>, if our business is merged, sold or reorganised</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: (
      <p>We use cookies and similar tools to keep the website working, understand how visitors use it and improve it. You can block or delete cookies in your browser settings. Some parts of the site may not work as intended without them.</p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <p>We keep personal information for as long as we need it to provide our services, keep proper business records and meet legal requirements. When it is no longer needed, we delete it or make it anonymous.</p>
    ),
  },
  {
    id: "security",
    title: "How we protect information",
    content: (
      <p>We use reasonable technical and organisational measures to protect your information and your project files. No method of sending or storing data online is completely secure, so we cannot guarantee absolute security.</p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Ask what personal information we hold about you</li>
          <li>Ask us to correct or delete it</li>
          <li>Opt out of marketing messages</li>
          <li>Ask us not to sell or share your information (we do not sell it)</li>
        </ul>
        <p>Residents of some US states, including California, may have additional rights under state law. To make a request, contact us using the details below. We will not treat you differently for using these rights.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    content: (
      <p>Our website and services are not directed at children under 13, and we do not knowingly collect personal information from them. If you believe a child has sent us information, please contact us and we will delete it.</p>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    content: (
      <p>Our website may link to other websites, such as publishing platforms or retailers. We are not responsible for their privacy practices, so please read their policies.</p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>We may update this Privacy Policy from time to time. The date at the top of this page shows when it was last changed. Continuing to use our website after an update means you accept the revised policy.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>If you have questions about this policy or want to make a privacy request, contact us:</p>
        <ContactCard />
      </>
    ),
  },
];

const PrivacyPolicy: React.FC = () => (
  <PolicyLayout
    current="privacy"
    title="Privacy Policy"
    updated="October 1, 2026"
    intro={
      <>
        <p>This Privacy Policy explains how Bristol Publishers ("we", "us", "our") collects, uses and protects your personal information when you visit our website or use our writing, editing, design, publishing, marketing and audiobook services.</p>
        <p>By using our website or services, you agree to the practices described here.</p>
      </>
    }
    sections={sections}
  />
);

export default PrivacyPolicy;