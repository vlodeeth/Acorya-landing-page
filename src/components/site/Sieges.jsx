import React from 'react';
import { Section, EnTete, Reveal } from './Section';

const sieges = [
  {
    domaine: 'Finance',
    titre: 'Pilotage financier',
    corps:
      'Tableaux de bord, analyse des marges réelles, trésorerie prévisionnelle, reporting mensuel de direction, projection financière.',
  },
  {
    domaine: 'Organisation',
    titre: 'Structuration & process',
    corps:
      "Audit organisationnel, déploiement de process opérationnels, sélection et mise en place des outils de suivi et de contrôle.",
  },
  {
    domaine: 'Technologie',
    titre: 'IA & automatisation',
    corps:
      "Formation à l'IA générative, cartographie des tâches automatisables, déploiement et connexion des outils adaptés.",
  },
  {
    domaine: 'Juridique',
    titre: 'Accompagnement juridique',
    corps:
      'Gestion contractuelle, relations clients et fournisseurs, protection du dirigeant. Conseil opérationnel uniquement.',
  },
  {
    domaine: 'Achats',
    titre: 'Achat & pricing',
    corps:
      "Audit achat, consultation fournisseurs, négociation des prix, catalogue tarifaire, conditions générales de vente et d'achat.",
  },
];

function Siege({ siege, dernier }) {
  return (
    <article
      className="siege-ligne ligne-survol"
      style={{
        display: 'grid',
        gap: '0.85rem 3rem',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(232, 201, 154, 0.18)',
        ...(dernier ? { borderBottom: '1px solid rgba(232, 201, 154, 0.18)' } : {}),
      }}
    >
      <p className="cartel" style={{ color: '#E8C99A', paddingTop: '0.45rem' }}>
        {siege.domaine}
      </p>

      <div>
        <h3
          className="titre-section"
          style={{ color: '#F5F0E8', fontSize: 'clamp(1.5rem, 1.15rem + 1.2vw, 2.125rem)' }}
        >
          {siege.titre}
        </h3>
        <p style={{ color: 'rgba(245, 240, 232, 0.62)', maxWidth: '40rem', marginTop: '0.85rem' }}>
          {siege.corps}
        </p>
      </div>
    </article>
  );
}

export default function Sieges() {
  return (
    <Section id="expertises" sombre>
      <EnTete
        sombre
        cartel="Les cinq sièges"
        titre="Une direction complète, à l'échelle d'une PME."
        chapo="Chaque siège correspond à une fonction qu'un grand groupe emploie à plein temps. Vous l'activez pour la durée dont vous avez besoin, et pas davantage."
      />

      <div className="grille-marge">
        <div />
        <div>
          {sieges.map((s, i) => (
            <Reveal key={s.domaine} delai={i * 0.06}>
              <Siege siege={s} dernier={i === sieges.length - 1} />
            </Reveal>
          ))}

          <Reveal delai={0.1}>
            <a
              href="#contact"
              className="lien-fin cartel"
              style={{ color: '#E8C99A', display: 'inline-block', marginTop: '2.75rem' }}
            >
              Parler de votre situation
            </a>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .siege-ligne { grid-template-columns: 10rem minmax(0, 1fr); }
        }
      `}</style>
    </Section>
  );
}
