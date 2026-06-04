import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-body font-500 text-base tracking-[0.12em] uppercase mb-4" style={{ color: '#3D4A52' }}>
      {title}
    </h2>
    <div className="space-y-3 font-body font-light text-sm leading-relaxed" style={{ color: '#3D4A52' }}>
      {children}
    </div>
  </div>
);

export default function MentionsLegales() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ background: '#F5F0E8' }}>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-body font-medium tracking-[0.15em] uppercase mb-12 transition-colors hover:text-[#C4724A]"
          style={{ color: 'rgba(61,74,82,0.5)' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour
        </Link>

        <h1 className="font-heading font-light mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C4724A' }}>
          Mentions légales
        </h1>
        <p className="font-body font-light text-xs tracking-[0.2em] uppercase mb-14" style={{ color: 'rgba(61,74,82,0.4)' }}>
          En vigueur au 1er juin 2026
        </p>

        {/* ── ÉDITEUR ── */}
        <Section title="1. Éditeur du site">
          <p>Le présent site <strong>acorya.fr</strong> est édité par :</p>
          <p>
            <strong>ACORYA SAS</strong><br />
            Société par actions simplifiée au capital de 1 000 €<br />
            RCS Basse-Terre — 104 981 105<br />
            EUID : FR9711.104981105<br />
            Siège social : 210 Caladium, résidence le Flamboyant, Baie Nettle — 97150 Saint-Martin<br />
            Email : <a href="mailto:contact@acorya.fr" className="underline hover:text-[#C4724A]">contact@acorya.fr</a>
          </p>
          <p>
            <strong>Directeur de la publication :</strong> Valentin Laude, Président
          </p>
        </Section>

        {/* ── HÉBERGEUR ── */}
        <Section title="2. Hébergeur">
          <p>
            Le site est hébergé par :<br />
            <strong>OVHcloud</strong><br />
            2 rue Kellermann — 59100 Roubaix — France<br />
            Tél. : 1007<br />
            <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C4724A]">www.ovhcloud.com</a>
          </p>
        </Section>

        {/* ── PROPRIÉTÉ INTELLECTUELLE ── */}
        <Section title="3. Propriété intellectuelle">
          <p>
            L'ensemble des éléments constituant ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive d'ACORYA SAS, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès écrit d'ACORYA SAS.
          </p>
        </Section>

        {/* ── RESPONSABILITÉ ── */}
        <Section title="4. Limitation de responsabilité">
          <p>
            ACORYA SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, la société ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
          </p>
          <p>
            ACORYA SAS décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site, ainsi que pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition.
          </p>
        </Section>

        {/* ── LIENS ── */}
        <Section title="5. Liens hypertextes">
          <p>
            Le site peut contenir des liens vers des sites tiers. ACORYA SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur politique de confidentialité.
          </p>
        </Section>

        {/* ── DROIT APPLICABLE ── */}
        <Section title="6. Droit applicable">
          <p>
            Le présent site et ses conditions d'utilisation sont régis par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </Section>

        {/* ═══════════════════════════════ */}
        <div className="my-14 h-px" style={{ background: 'rgba(196,114,74,0.2)' }} />

        <h1 className="font-heading font-light mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C4724A' }}>
          Politique de confidentialité
        </h1>
        <p className="font-body font-light text-xs tracking-[0.2em] uppercase mb-14" style={{ color: 'rgba(61,74,82,0.4)' }}>
          Conformément au RGPD (UE) 2016/679
        </p>

        <Section title="1. Responsable du traitement">
          <p>
            ACORYA SAS — 210 Caladium, résidence le Flamboyant, Baie Nettle — 97150 Saint-Martin<br />
            Email : <a href="mailto:contact@acorya.fr" className="underline hover:text-[#C4724A]">contact@acorya.fr</a>
          </p>
        </Section>

        <Section title="2. Données collectées">
          <p>Dans le cadre de l'utilisation de ce site, ACORYA SAS peut collecter les données suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Adresse email</strong> — via le formulaire de contact, afin de vous recontacter.</li>
            <li><strong>Données de navigation</strong> — adresse IP, type de navigateur, pages visitées (données anonymisées via les logs serveur OVH).</li>
          </ul>
          <p>Aucune donnée sensible n'est collectée.</p>
        </Section>

        <Section title="3. Finalité et base légale">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(196,114,74,0.2)' }}>
                <th className="text-left py-2 pr-4 font-medium">Finalité</th>
                <th className="text-left py-2 pr-4 font-medium">Base légale</th>
                <th className="text-left py-2 font-medium">Durée de conservation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(61,74,82,0.08)' }}>
                <td className="py-2 pr-4">Répondre à votre demande de contact</td>
                <td className="py-2 pr-4">Intérêt légitime (art. 6.1.f RGPD)</td>
                <td className="py-2">3 ans</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Logs serveur (sécurité)</td>
                <td className="py-2 pr-4">Obligation légale</td>
                <td className="py-2">1 an</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="4. Destinataires des données">
          <p>
            Vos données ne sont ni vendues, ni cédées à des tiers. Elles peuvent être transmises à des prestataires techniques (hébergeur OVHcloud) dans le strict cadre de l'exécution de leurs services.
          </p>
        </Section>

        <Section title="5. Vos droits">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
            <li><strong>Droit à la limitation</strong> — restreindre le traitement</li>
            <li><strong>Droit d'opposition</strong> — vous opposer à un traitement</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@acorya.fr" className="underline hover:text-[#C4724A]">contact@acorya.fr</a>
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> (www.cnil.fr) ou de l'autorité de contrôle compétente de votre pays de résidence.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            Ce site n'utilise pas de cookies de traçage, de publicité ou d'analytics tiers. Les seuls cookies susceptibles d'être déposés sont des cookies techniques strictement nécessaires au fonctionnement du site (session, sécurité), qui ne nécessitent pas votre consentement au titre de l'article 5.3 de la Directive ePrivacy.
          </p>
        </Section>

        <Section title="7. Sécurité">
          <p>
            ACORYA SAS met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.
          </p>
        </Section>

        <Section title="8. Modifications">
          <p>
            La présente politique peut être mise à jour à tout moment. La date de mise en vigueur indiquée en haut de page fait foi.
          </p>
        </Section>

        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(196,114,74,0.15)' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-body font-medium tracking-[0.15em] uppercase transition-colors hover:text-[#C4724A]"
            style={{ color: 'rgba(61,74,82,0.4)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}