import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EnTete, Reveal } from './Section';
import Coeur from './Coeur';
import Mots from './Mots';

const sieges = [
  {
    domaine: 'Finance',
    titre: 'Pilotage financier',
    corps:
      'Tableaux de bord, analyse des marges réelles, trésorerie prévisionnelle, reporting mensuel de direction, projection financière.',
    detail: 'Vous saurez enfin ce que chaque chantier, chaque client, chaque mois vous rapporte réellement.',
  },
  {
    domaine: 'Organisation',
    titre: 'Structuration & process',
    corps:
      "Audit organisationnel, déploiement de process opérationnels, sélection et mise en place des outils de suivi et de contrôle.",
    detail: "Ce qui ne tient aujourd'hui que dans votre tête devient un process que votre équipe peut tenir sans vous.",
  },
  {
    domaine: 'Technologie',
    titre: 'IA & automatisation',
    corps:
      "Formation à l'IA générative, cartographie des tâches automatisables, déploiement et connexion des outils adaptés.",
    detail: 'On commence par les tâches que vous refaites chaque semaine. Celles-là, vous ne les referez plus.',
  },
  {
    domaine: 'Juridique',
    titre: 'Accompagnement juridique',
    corps:
      'Gestion contractuelle, relations clients et fournisseurs, protection du dirigeant. Conseil opérationnel uniquement.',
    detail: 'Vos contrats cessent d’être un risque que vous découvrez le jour où ça se passe mal.',
  },
  {
    domaine: 'Achats',
    titre: 'Achat & pricing',
    corps:
      "Audit achat, consultation fournisseurs, négociation des prix, catalogue tarifaire, conditions générales de vente et d'achat.",
    detail: 'La marge se gagne autant à l’achat qu’à la vente. Presque personne ne la travaille des deux côtés.',
  },
];

export default function SiegesScroll() {
  const ancre = useRef(null);
  const articles = useRef([]);
  const [actif, setActif] = useState(0);
  const sansMouvement = useReducedMotion();

  /* Le siège actif est celui dont le bloc est le plus proche du tiers haut
     de l'écran. Calculé au défilement plutôt que par observateur : le
     résultat reste juste après un redimensionnement ou un retour d'onglet. */
  useEffect(() => {
    const mesurer = () => {
      const repere = window.innerHeight * 0.42;
      let meilleur = 0;
      let ecartMin = Infinity;
      articles.current.forEach((el, i) => {
        if (!el) return;
        const ecart = Math.abs(el.getBoundingClientRect().top - repere);
        if (ecart < ecartMin) {
          ecartMin = ecart;
          meilleur = i;
        }
      });
      setActif(meilleur);
    };
    mesurer();
    window.addEventListener('scroll', mesurer, { passive: true });
    window.addEventListener('resize', mesurer);
    return () => {
      window.removeEventListener('scroll', mesurer);
      window.removeEventListener('resize', mesurer);
    };
  }, []);

  return (
    <section
      id="expertises"
      ref={ancre}
      style={{ background: '#3D4A52', paddingTop: 'var(--marge-section)', paddingBottom: 'var(--marge-section)' }}
    >
      <div className="cadre">
        <EnTete
          sombre
          donnee="Les cinq sièges"
          titre="Une direction complète, à l'échelle d'une PME."
          chapo="Chaque siège correspond à une fonction qu'un grand groupe emploie à plein temps. Vous l'activez pour la durée dont vous avez besoin, et pas davantage."
        />

        <div className="sieges-scene">
          {/* Colonne défilante : une expertise après l'autre */}
          <div>
            {sieges.map((s, i) => (
              <article
                key={s.domaine}
                ref={(el) => { articles.current[i] = el; }}
                className="siege-bloc"
              >
                <motion.div
                  initial={sansMouvement ? false : { opacity: 0, y: 24 }}
                  whileInView={sansMouvement ? false : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="donnee" style={{ color: '#C4724A' }}>{s.domaine}</p>

                  <h3
                    className="titre-section"
                    style={{ color: '#F5F0E8', fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 3rem)', marginTop: '1.25rem' }}
                  >
                    {s.titre}
                  </h3>

                  <p style={{ color: 'rgba(245, 240, 232, 0.62)', maxWidth: '32rem', marginTop: '1.25rem' }}>
                    {s.corps}
                  </p>

                  <p
                    className="voix"
                    style={{
                      color: '#E8C99A',
                      maxWidth: '26ch',
                      marginTop: '2rem',
                      paddingTop: '1.75rem',
                      borderTop: '1px solid rgba(232, 201, 154, 0.2)',
                      fontSize: 'clamp(1.125rem, 0.95rem + 0.8vw, 1.5rem)',
                    }}
                  >
                    {s.detail}
                  </p>
                </motion.div>
              </article>
            ))}
          </div>

          {/* Colonne collée : la table, qui suit le lecteur */}
          <aside className="siege-table">
            <div style={{ width: '100%' }}>
              <p className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.5)' }}>
                Comité de direction
              </p>

              <hr className="filet-sombre" style={{ marginTop: '1.25rem' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(232, 201, 154, 0.18)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Coeur size={12} />
                  <span className="donnee" style={{ color: '#F5F0E8' }}>Vous</span>
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(245, 240, 232, 0.45)' }}>
                  Direction générale
                </span>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {sieges.map((s, i) => {
                  const estActif = i === actif;
                  return (
                    <li
                      key={s.domaine}
                      style={{
                        position: 'relative',
                        padding: '1.1rem 0',
                        borderBottom: '1px solid rgba(232, 201, 154, 0.1)',
                      }}
                    >
                      <motion.span
                        animate={{ opacity: estActif ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          position: 'absolute',
                          left: '-1.25rem',
                          top: '50%',
                          translateY: '-50%',
                          width: '0.5rem',
                          height: '1px',
                          background: '#C4724A',
                        }}
                      />

                      <motion.span
                        className="donnee"
                        animate={{
                          color: estActif ? '#F5F0E8' : 'rgba(245, 240, 232, 0.35)',
                          x: estActif ? 6 : 0,
                        }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'block' }}
                      >
                        {s.domaine}
                      </motion.span>

                      {/* Le filet terre se trace sous le siège en cours de lecture */}
                      <motion.span
                        animate={{ scaleX: estActif ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          left: 0,
                          bottom: -1,
                          height: '1px',
                          width: '100%',
                          background: '#C4724A',
                          transformOrigin: 'left',
                        }}
                      />
                    </li>
                  );
                })}
              </ul>

              <div style={{ marginTop: '1.75rem' }}>
                <span className="donnee donnee-fine" style={{ color: 'rgba(232, 201, 154, 0.45)', fontSize: '0.5625rem' }}>
                  Sièges tenus par Acorya
                </span>
                <p
                  className="donnee"
                  style={{ color: '#C4724A', marginTop: '0.5rem', fontSize: '1.5rem', letterSpacing: '0.1em' }}
                >
                  {/* La clé force la relecture de l'animation à chaque changement de siège */}
                  <Mots key={actif} texte={`0${actif + 1} / 05`} pas={0} delai={0} />
                </p>
              </div>
            </div>
          </aside>
        </div>

        <Reveal>
          <a
            href="#contact"
            className="lien-fin donnee"
            style={{ color: '#E8C99A', display: 'inline-block', marginTop: '3rem' }}
          >
            Parler de votre situation
          </a>
        </Reveal>
      </div>

      <style>{`
        .siege-bloc { padding: 3rem 0; }
        .siege-table { display: none; }

        @media (min-width: 1000px) {
          .sieges-scene {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(17rem, 22rem);
            gap: 5rem;
            align-items: start;
          }
          .siege-bloc {
            min-height: 78vh;
            display: flex;
            align-items: center;
            padding: 2rem 0;
          }
          .siege-table {
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            height: 100vh;
            padding-left: 1.25rem;
            border-left: 1px solid rgba(232, 201, 154, 0.14);
          }
        }
      `}</style>
    </section>
  );
}
