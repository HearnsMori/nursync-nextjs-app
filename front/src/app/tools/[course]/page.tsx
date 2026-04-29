"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, Maximize2 } from 'lucide-react';

//components
import Header from "@/components/AppHeader";
import Footer from "@/components/AppFooter";
import LoadingPage from "@/components/LoadingPage";
import ChatAI from "@/components/ChatAI";
import Flyout from "@/components/Flyout";

import "../../globals.css";

// --- Types ---
interface FlashcardData {
  question: string;
  answer: string;
  hint?: string;
}

interface CourseContent {
  title: string;
  subject: string;
  cards: FlashcardData[];
}

// --- Data Mapping ---
const COURSE_DATA: Record<string, CourseContent> = {

  // =========================================================
  // LEVEL 1
  // =========================================================

  'anatomy-and-physiology': {
    title: 'Digestive System',
    subject: 'ANATOMY AND PHYSIOLOGY',
    cards: [
      { question: 'Where does digestion begin?', answer: 'The mouth (oral cavity).', hint: 'Think about where food enters.' },
      { question: 'What organ produces bile?', answer: 'The liver.', hint: 'It is the largest internal organ.' },
      { question: 'Where is bile stored?', answer: 'The gallbladder.', hint: 'It is a small sac beneath the liver.' },
      { question: 'What is the function of the small intestine?', answer: 'Absorption of nutrients into the bloodstream.', hint: 'Most digestion and absorption occur here.' },
      { question: 'What are the three parts of the small intestine?', answer: 'Duodenum, Jejunum, and Ileum.', hint: 'DJI.' },
      { question: 'What is the function of the large intestine?', answer: 'Absorption of water and electrolytes; formation of feces.', hint: 'Final stage before elimination.' },
      { question: 'What enzyme in saliva begins carbohydrate digestion?', answer: 'Salivary amylase (ptyalin).', hint: 'Found in saliva.' },
      { question: 'What is the role of the pancreas in digestion?', answer: 'Secretes digestive enzymes and bicarbonate into the duodenum.', hint: 'Both endocrine and exocrine functions.' },
      { question: 'What is peristalsis?', answer: 'Wave-like muscle contractions that move food through the GI tract.', hint: 'Involuntary muscle movement.' },
      { question: 'What is the ileocecal valve?', answer: 'A valve between the ileum and the large intestine that prevents backflow.', hint: 'Junction of small and large intestine.' },
      { question: 'What is the function of hydrochloric acid in the stomach?', answer: 'It kills bacteria, activates pepsinogen to pepsin, and aids protein digestion.', hint: 'Produced by parietal cells.' },
      { question: 'What cells secrete pepsinogen?', answer: 'Chief cells of the stomach.', hint: 'Precursor to pepsin.' },
      { question: 'What is the pyloric sphincter?', answer: 'A muscular valve at the junction of the stomach and the duodenum.', hint: 'Controls gastric emptying.' },
      { question: 'What are villi and microvilli?', answer: 'Finger-like projections in the small intestine that increase surface area for absorption.', hint: 'Brush border.' },
      { question: 'What is the hepatic portal system?', answer: 'A system of veins that carries nutrient-rich blood from the intestines to the liver.', hint: 'Direct nutrient processing route.' },
      { question: 'What is chyme?', answer: 'The semi-liquid mixture of food and gastric juices that leaves the stomach.', hint: 'Enters the duodenum.' },
      { question: 'What is the function of bile in digestion?', answer: 'Emulsification of fats.', hint: 'Breaks fat into smaller droplets.' },
      { question: 'What is the sigmoid colon?', answer: 'The S-shaped section of the large intestine just before the rectum.', hint: 'Precedes the rectum.' },
      { question: 'What is the appendix?', answer: 'A small, finger-like pouch attached to the cecum with no clear digestive function.', hint: 'Can become inflamed (appendicitis).' },
      { question: 'What is the mesentery?', answer: 'A fold of peritoneum that attaches the intestines to the abdominal wall.', hint: 'Supports intestines.' },
      { question: 'What is the function of the cecum?', answer: 'It receives material from the ileum and connects the small and large intestines.', hint: 'Beginning of the large intestine.' },
      { question: 'What sphincter controls defecation?', answer: 'The external anal sphincter (voluntary) and internal anal sphincter (involuntary).', hint: 'Two sphincters at the anus.' },
      { question: 'What is the normal gastric pH?', answer: '1.5 to 3.5 (highly acidic).', hint: 'Very low pH due to HCl.' },
      { question: 'What is the Brunner\'s gland and where is it found?', answer: 'Mucus-secreting glands found in the submucosa of the duodenum.', hint: 'Protects duodenal lining.' },
      { question: 'What is the role of intrinsic factor?', answer: 'Produced by parietal cells; essential for absorption of Vitamin B12 in the ileum.', hint: 'Deficiency causes pernicious anemia.' },
      { question: 'What is the name of the enzyme that digests proteins in the stomach?', answer: 'Pepsin.', hint: 'Activated from pepsinogen.' },
      { question: 'What is the muscularis externa?', answer: 'The muscle layer of the GI tract wall responsible for peristalsis.', hint: 'Inner circular and outer longitudinal layers.' },
      { question: 'What are the four layers of the GI tract wall?', answer: 'Mucosa, Submucosa, Muscularis externa, and Serosa/Adventitia.', hint: 'From inside to outside.' },
      { question: 'What is segmentation in the GI tract?', answer: 'Back-and-forth mixing contractions of the small intestine that help mix chyme with digestive juices.', hint: 'Different from peristalsis.' },
      { question: 'What hormone stimulates the pancreas to release bicarbonate?', answer: 'Secretin.', hint: 'Released by S cells in the duodenum.' },
      { question: 'What hormone stimulates the gallbladder to release bile?', answer: 'Cholecystokinin (CCK).', hint: 'Released in response to fats and proteins.' },
      { question: 'What is gastrin?', answer: 'A hormone secreted by G cells in the stomach that stimulates HCl and pepsinogen secretion.', hint: 'Promotes acid production.' },
      { question: 'What is the enteric nervous system?', answer: 'The intrinsic nervous system of the GI tract, sometimes called the "second brain."', hint: 'Controls GI motility independently.' },
      { question: 'What vitamins are fat-soluble and absorbed in the small intestine?', answer: 'Vitamins A, D, E, and K.', hint: 'ADEK.' },
      { question: 'What is the role of the liver in carbohydrate metabolism?', answer: 'Glycogenesis, glycogenolysis, and gluconeogenesis to maintain blood glucose.', hint: 'Glucose homeostasis.' },
      { question: 'What is the name of the opening between the esophagus and stomach?', answer: 'The cardiac sphincter (lower esophageal sphincter / LES).', hint: 'Can cause heartburn if weakened.' },
      { question: 'What is the rugae of the stomach?', answer: 'Folds in the stomach lining that allow the stomach to expand.', hint: 'Increase surface area.' },
      { question: 'What is the normal transit time for food through the entire GI tract?', answer: 'Approximately 24 to 72 hours.', hint: 'Varies by individual and diet.' },
      { question: 'What is the cephalic phase of gastric secretion?', answer: 'The anticipatory phase triggered by sight, smell, or thought of food; stimulates gastric juice secretion.', hint: 'Before food enters the stomach.' },
      { question: 'What is the gastric phase of digestion?', answer: 'The phase when food enters the stomach, distending it and triggering more HCl and pepsin secretion.', hint: 'Accounts for ~2/3 of total secretion.' },
      { question: 'What is the intestinal phase of digestion?', answer: 'The phase when chyme enters the duodenum, triggering secretin and CCK release to inhibit gastric activity.', hint: 'Slows stomach emptying.' },
      { question: 'What is steatorrhea?', answer: 'Fat in the stool, indicating fat malabsorption.', hint: 'Oily, foul-smelling stool.' },
      { question: 'What is the difference between the jejunum and the ileum?', answer: 'The jejunum absorbs most nutrients; the ileum absorbs bile salts and vitamin B12.', hint: 'Ileum is the last segment.' },
      { question: 'What is the function of the haustra in the large intestine?', answer: 'Pouches that create a sacculated appearance and aid in mixing and slow transport of colonic contents.', hint: 'Characteristic of the colon.' },
      { question: 'What is the role of gut bacteria in digestion?', answer: 'They ferment undigested carbohydrates, produce some B vitamins and vitamin K, and protect against pathogens.', hint: 'Microbiome functions.' },
      { question: 'What is GERD?', answer: 'Gastroesophageal reflux disease — backflow of stomach acid into the esophagus due to a weakened LES.', hint: 'Causes heartburn.' },
      { question: 'What is a hiatal hernia?', answer: 'Protrusion of the stomach through the diaphragmatic hiatus into the thoracic cavity.', hint: 'Often associated with GERD.' },
      { question: 'What is the role of mucus in the GI tract?', answer: 'Protects the stomach lining from HCl and pepsin, and lubricates the passage of food.', hint: 'Secreted by goblet cells.' },
      { question: 'What is the difference between mechanical and chemical digestion?', answer: 'Mechanical digestion physically breaks food down (chewing, churning); chemical digestion uses enzymes to break molecular bonds.', hint: 'Physical vs. enzymatic.' },
      { question: 'What is the blood supply to the small intestine?', answer: 'The superior mesenteric artery (SMA).', hint: 'Branch of the abdominal aorta.' },
      { question: 'What is the significance of the plicae circulares?', answer: 'Permanent circular folds in the small intestine that increase surface area for absorption.', hint: 'Also called valves of Kerckring.' },
    ]
  },

  'biochemistry': {
    title: 'Introduction to Biomolecules',
    subject: 'BIOCHEMISTRY',
    cards: [
      { question: 'What are the four main types of biomolecules?', answer: 'Carbohydrates, Lipids, Proteins, and Nucleic Acids.', hint: 'The building blocks of life.' },
      { question: 'What is the monomer of carbohydrates?', answer: 'Monosaccharides (e.g., glucose, fructose, galactose).', hint: 'Simple sugars.' },
      { question: 'What is the monomer of proteins?', answer: 'Amino acids.', hint: 'There are 20 standard amino acids.' },
      { question: 'What is the monomer of nucleic acids?', answer: 'Nucleotides.', hint: 'Each consists of a sugar, phosphate, and nitrogenous base.' },
      { question: 'What bond links amino acids together?', answer: 'Peptide bond.', hint: 'Forms during condensation reaction.' },
      { question: 'What is the primary structure of a protein?', answer: 'The linear sequence of amino acids.', hint: 'Determined by the gene.' },
      { question: 'What is the secondary structure of a protein?', answer: 'Local folding into alpha helices or beta sheets stabilized by hydrogen bonds.', hint: 'Hydrogen bonds between backbone atoms.' },
      { question: 'What is the tertiary structure of a protein?', answer: 'The overall 3D shape of a single polypeptide chain.', hint: 'Includes disulfide bonds, hydrophobic interactions.' },
      { question: 'What is the quaternary structure of a protein?', answer: 'The arrangement of multiple polypeptide subunits.', hint: 'Example: hemoglobin has 4 subunits.' },
      { question: 'What are essential amino acids?', answer: 'Amino acids that cannot be synthesized by the body and must be obtained from the diet.', hint: 'There are 9 essential amino acids.' },
      { question: 'What is an enzyme?', answer: 'A biological catalyst that speeds up chemical reactions without being consumed.', hint: 'Usually a protein.' },
      { question: 'What is an active site?', answer: 'The region of an enzyme where the substrate binds and the reaction occurs.', hint: 'Specific to substrate shape.' },
      { question: 'What is the lock-and-key model of enzyme action?', answer: 'The substrate fits perfectly into the active site like a key into a lock.', hint: 'Rigid fit hypothesis.' },
      { question: 'What is the induced fit model of enzyme action?', answer: 'The enzyme changes shape slightly to accommodate the substrate upon binding.', hint: 'More accurate than lock-and-key.' },
      { question: 'What is a coenzyme?', answer: 'A non-protein organic molecule that assists an enzyme in catalysis.', hint: 'Many vitamins are coenzymes.' },
      { question: 'What is a cofactor?', answer: 'An inorganic ion or molecule required for enzyme activity.', hint: 'Examples: Mg²⁺, Zn²⁺, Fe²⁺.' },
      { question: 'What is denaturation of a protein?', answer: 'The unfolding of a protein\'s 3D structure due to heat, pH changes, or chemicals.', hint: 'Loses biological activity.' },
      { question: 'What is glycolysis?', answer: 'The breakdown of glucose into two molecules of pyruvate, producing 2 ATP and 2 NADH.', hint: 'Occurs in the cytoplasm.' },
      { question: 'What is the Krebs cycle (TCA cycle)?', answer: 'A series of reactions in the mitochondria that oxidize acetyl-CoA to produce NADH, FADH2, and CO2.', hint: 'Also called citric acid cycle.' },
      { question: 'What is the net ATP yield from one glucose molecule in aerobic respiration?', answer: 'Approximately 30–32 ATP.', hint: 'Via glycolysis, Krebs, and oxidative phosphorylation.' },
      { question: 'What is the structure of DNA?', answer: 'A double helix made of two antiparallel strands of nucleotides linked by hydrogen bonds between complementary bases.', hint: 'Discovered by Watson and Crick.' },
      { question: 'What are the nitrogenous bases in DNA?', answer: 'Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).', hint: 'A pairs with T; G pairs with C.' },
      { question: 'What replaces thymine in RNA?', answer: 'Uracil (U).', hint: 'RNA-specific base.' },
      { question: 'What is the central dogma of molecular biology?', answer: 'DNA → RNA → Protein (transcription then translation).', hint: 'Flow of genetic information.' },
      { question: 'What is transcription?', answer: 'The synthesis of mRNA from a DNA template in the nucleus.', hint: 'DNA → mRNA.' },
      { question: 'What is translation?', answer: 'The synthesis of a protein from an mRNA template at the ribosome.', hint: 'mRNA → Protein.' },
      { question: 'What is a codon?', answer: 'A sequence of three nucleotide bases on mRNA that codes for a specific amino acid.', hint: 'Read in triplets.' },
      { question: 'What is an anticodon?', answer: 'A sequence of three bases on tRNA complementary to a codon on mRNA.', hint: 'On tRNA.' },
      { question: 'What is the role of tRNA?', answer: 'To carry amino acids to the ribosome and match them to the correct codon on mRNA.', hint: 'Transfer RNA.' },
      { question: 'What is the start codon?', answer: 'AUG (codes for methionine).', hint: 'Initiates translation.' },
      { question: 'What are the three stop codons?', answer: 'UAA, UAG, UGA.', hint: 'They signal the end of translation.' },
      { question: 'What is a saturated fatty acid?', answer: 'A fatty acid with no double bonds between carbon atoms; solid at room temperature.', hint: 'Example: palmitic acid.' },
      { question: 'What is an unsaturated fatty acid?', answer: 'A fatty acid with one or more double bonds; usually liquid at room temperature.', hint: 'Example: oleic acid.' },
      { question: 'What is the function of phospholipids?', answer: 'They are the main structural component of cell membranes, forming a bilayer.', hint: 'Amphipathic molecule.' },
      { question: 'What is cholesterol\'s role in the cell membrane?', answer: 'It modulates membrane fluidity, making it less fluid at high temperatures and preventing solidification at low temperatures.', hint: 'Fluidity buffer.' },
      { question: 'What is beta oxidation?', answer: 'The metabolic process of breaking down fatty acids into acetyl-CoA in the mitochondria for energy production.', hint: 'Fatty acid catabolism.' },
      { question: 'What is a ketone body?', answer: 'Molecules (acetoacetate, beta-hydroxybutyrate, acetone) produced from fatty acid oxidation when glucose is scarce.', hint: 'Fasting/starvation byproduct.' },
      { question: 'What is glycogen?', answer: 'The storage form of glucose in animals, mainly in the liver and skeletal muscles.', hint: 'Polysaccharide.' },
      { question: 'What is the difference between starch and glycogen?', answer: 'Starch is the plant storage form of glucose; glycogen is the animal storage form and is more highly branched.', hint: 'Both are polysaccharides.' },
      { question: 'What is a disaccharide? Give two examples.', answer: 'A sugar made of two monosaccharides. Examples: sucrose (glucose + fructose) and lactose (glucose + galactose).', hint: 'Two simple sugars joined.' },
      { question: 'What is the isoelectric point (pI) of an amino acid?', answer: 'The pH at which an amino acid carries no net electrical charge (zwitterion form).', hint: 'Net charge = 0.' },
      { question: 'What is oxidative phosphorylation?', answer: 'The process by which ATP is produced using the electron transport chain and ATP synthase in the inner mitochondrial membrane.', hint: 'Requires oxygen.' },
      { question: 'What is the electron transport chain?', answer: 'A series of protein complexes in the inner mitochondrial membrane that transfer electrons from NADH and FADH2 to oxygen, generating a proton gradient.', hint: 'Final stage of cellular respiration.' },
      { question: 'What is a prosthetic group?', answer: 'A non-protein component permanently attached to a protein that is essential for its function.', hint: 'E.g., heme in hemoglobin.' },
      { question: 'What is substrate-level phosphorylation?', answer: 'Direct transfer of a phosphate group from a substrate molecule to ADP to form ATP.', hint: 'Occurs in glycolysis and Krebs cycle.' },
      { question: 'What is the role of NAD⁺ in metabolism?', answer: 'It is an electron carrier that accepts electrons (becomes NADH) during oxidation reactions, then donates them in the ETC.', hint: 'Oxidized form is NAD⁺.' },
      { question: 'What is a zymogen (proenzyme)?', answer: 'An inactive precursor of an enzyme that must be cleaved to become active.', hint: 'Example: pepsinogen → pepsin.' },
      { question: 'What is competitive inhibition of an enzyme?', answer: 'An inhibitor resembles the substrate and competes for the active site; can be overcome by increasing substrate concentration.', hint: 'Km increases, Vmax unchanged.' },
      { question: 'What is non-competitive inhibition?', answer: 'An inhibitor binds to a site other than the active site, changing the enzyme\'s shape and reducing activity regardless of substrate concentration.', hint: 'Vmax decreases, Km unchanged.' },
      { question: 'What is allosteric regulation?', answer: 'Regulation of enzyme activity by a molecule binding to a site other than the active site, causing a conformational change.', hint: 'Feedback regulation.' },
      { question: 'What is the buffer system in blood?', answer: 'The bicarbonate buffer system (H₂CO₃/HCO₃⁻) maintains blood pH around 7.4.', hint: 'Most important blood buffer.' },
    ]
  },

  'theoretical-foundations-in-nursing': {
    title: 'Nursing Theories',
    subject: 'THEORETICAL FOUNDATIONS IN NURSING',
    cards: [
      { question: 'Who is known as the Lady with the Lamp?', answer: 'Florence Nightingale.', hint: 'Environmental Theory.' },
      { question: 'What is Florence Nightingale\'s major nursing theory?', answer: 'Environmental Theory — the environment affects health and healing.', hint: 'Focus on ventilation, cleanliness, light.' },
      { question: 'What are the 13 canons of Nightingale\'s Environmental Theory?', answer: 'Ventilation and warming, light, cleanliness of rooms, health of houses, noise, variety, food, bed and bedding, personal cleanliness, chattering hopes and advices, observation of the sick, taking food, and petty management.', hint: 'Environmental factors affecting recovery.' },
      { question: 'Who developed the Theory of Human Caring?', answer: 'Jean Watson.', hint: '10 Caritas processes.' },
      { question: 'What are Watson\'s 10 Caritas Processes?', answer: 'Processes that guide caring relationships, including forming a humanistic system of values, instilling faith and hope, sensitivity to self and others, and developing a helping-trust relationship.', hint: 'Originally called carative factors.' },
      { question: 'Who developed the Self-Care Deficit Theory?', answer: 'Dorothea Orem.', hint: 'Three related theories.' },
      { question: 'What are the three theories in Orem\'s model?', answer: 'Self-Care Theory, Self-Care Deficit Theory, and Theory of Nursing Systems.', hint: 'Self-care framework.' },
      { question: 'Who developed the Adaptation Model?', answer: 'Sister Callista Roy.', hint: 'Four adaptive modes.' },
      { question: 'What are Roy\'s four adaptive modes?', answer: 'Physiological-physical, Self-concept/group identity, Role function, and Interdependence.', hint: 'PSRI.' },
      { question: 'Who is the theorist behind the Hierarchy of Needs?', answer: 'Abraham Maslow (not a nurse, but widely applied in nursing).', hint: 'Pyramid of needs.' },
      { question: 'What are the five levels of Maslow\'s Hierarchy of Needs?', answer: 'Physiological, Safety and Security, Love and Belonging, Esteem, and Self-Actualization.', hint: 'From base to top of pyramid.' },
      { question: 'Who developed the Interpersonal Relations Theory?', answer: 'Hildegard Peplau.', hint: 'Nurse-patient relationship.' },
      { question: 'What are the four phases of Peplau\'s nurse-patient relationship?', answer: 'Orientation, Identification, Exploitation, and Resolution.', hint: 'OIER.' },
      { question: 'Who developed the Goal Attainment Theory?', answer: 'Imogene King.', hint: 'Systems framework.' },
      { question: 'What are King\'s three interacting systems?', answer: 'Personal, Interpersonal, and Social systems.', hint: 'Interact to attain goals.' },
      { question: 'Who developed the Theory of Human Becoming?', answer: 'Rosemarie Parse.', hint: 'Parse\'s three principles.' },
      { question: 'Who developed the Neuman Systems Model?', answer: 'Betty Neuman.', hint: 'Stressor and defense lines.' },
      { question: 'What are the three lines of defense in Neuman\'s model?', answer: 'Flexible line of defense, Normal line of defense, and Lines of resistance.', hint: 'Concentric circles around the core.' },
      { question: 'Who developed the Theory of Comfort?', answer: 'Katharine Kolcaba.', hint: 'Relief, ease, transcendence.' },
      { question: 'What are Kolcaba\'s three types of comfort?', answer: 'Relief, Ease, and Transcendence.', hint: 'In four contexts: physical, psychospiritual, environmental, sociocultural.' },
      { question: 'Who developed the Tidal Model?', answer: 'Phil Barker.', hint: 'Mental health nursing.' },
      { question: 'Who developed the Cultural Care Diversity and Universality Theory?', answer: 'Madeleine Leininger.', hint: 'Transcultural nursing.' },
      { question: 'What is Leininger\'s Sunrise Model?', answer: 'A visual representation of transcultural nursing that depicts cultural dimensions influencing care.', hint: 'Culturally congruent care.' },
      { question: 'Who developed the Health Promotion Model?', answer: 'Nola Pender.', hint: 'Focuses on positive health behavior.' },
      { question: 'What concept is central to Pender\'s Health Promotion Model?', answer: 'Individual\'s desire for competence, self-efficacy, and positive health behavior.', hint: 'Not fear of illness.' },
      { question: 'Who developed the Uncertainty in Illness Theory?', answer: 'Merle Mishel.', hint: 'Cognitive adaptation.' },
      { question: 'Who is the theorist for "The Art and Science of Humanistic Nursing"?', answer: 'Josephine Paterson and Loretta Zderad.', hint: 'Humanistic nursing theory.' },
      { question: 'What are the four metaparadigm concepts in nursing?', answer: 'Person, Health, Environment, and Nursing.', hint: 'PHEN.' },
      { question: 'What is a grand theory in nursing?', answer: 'A broad, abstract theory that provides a general framework for nursing practice but is not easily tested empirically.', hint: 'High level of abstraction.' },
      { question: 'What is a middle-range theory in nursing?', answer: 'A theory with a more limited scope that is testable and closer to actual practice.', hint: 'Between grand and practice theories.' },
      { question: 'What is a practice theory (situation-specific theory)?', answer: 'A highly specific theory developed for a particular population or setting, directly guiding nursing actions.', hint: 'Lowest level of abstraction.' },
      { question: 'What did Virginia Henderson define as the unique function of nursing?', answer: 'To assist individuals, sick or well, to perform activities contributing to health or recovery that they would perform unaided if they had the strength, will, or knowledge.', hint: '14 Basic Human Needs.' },
      { question: 'What are Henderson\'s 14 basic needs?', answer: 'Breathing, eating, elimination, movement, sleep, clothing, temperature maintenance, hygiene, safety, communication, worship, work, play, and learning.', hint: 'Physiological and psychosocial.' },
      { question: 'Who developed the Science of Unitary Human Beings?', answer: 'Martha Rogers.', hint: 'Energy fields and patterns.' },
      { question: 'What is Rogers\' concept of homeodynamics?', answer: 'Principles of integrality, resonancy, and helicy describing the continuous interaction between human and environmental energy fields.', hint: 'Integrality, resonancy, helicy.' },
      { question: 'Who developed the Theory of Chronic Sorrow?', answer: 'Georgene Gee Eakes, Mary Lermann Burke, and Margaret Hainsworth (based on Olshansky\'s work).', hint: 'Related to ongoing loss.' },
      { question: 'What is the difference between a nursing model and a nursing theory?', answer: 'A nursing model is a conceptual representation; a nursing theory provides explanatory propositions that can be tested.', hint: 'Theory is more formal.' },
      { question: 'Who developed the Synergy Model?', answer: 'AACN (American Association of Critical-Care Nurses).', hint: 'Patient needs and nurse competencies.' },
      { question: 'What is Nightingale\'s definition of health?', answer: 'Not only to be well but to be able to use well every power we have.', hint: 'Positive view of health.' },
      { question: 'What is the significance of the concept of "environment" in nursing theory?', answer: 'It encompasses all external conditions affecting the patient, first highlighted by Nightingale and later incorporated into most nursing models.', hint: 'One of the four metaparadigm concepts.' },
      { question: 'Who developed the Theory of Bureaucratic Caring?', answer: 'Marilyn Ray.', hint: 'Caring within hospital systems.' },
      { question: 'What is the concept of homeostasis as it applies to nursing?', answer: 'The body\'s tendency to maintain internal equilibrium; nurses support this balance when illness disrupts it.', hint: 'Balance and stability.' },
      { question: 'Who authored the "Notes on Nursing" (1859)?', answer: 'Florence Nightingale.', hint: 'First nursing text.' },
      { question: 'What is Watson\'s view of the nurse-patient relationship?', answer: 'A transpersonal caring relationship that goes beyond physical tasks to address the whole person — body, mind, and spirit.', hint: 'Holistic and spiritual.' },
      { question: 'What is Orem\'s definition of self-care?', answer: 'Activities that individuals initiate and perform on their own behalf to maintain life, health, and well-being.', hint: 'Personal health management.' },
      { question: 'What is the therapeutic self-care demand in Orem\'s theory?', answer: 'The total of all self-care actions needed to meet all self-care requisites.', hint: 'What must be done for health.' },
      { question: 'Who developed the Peaceful End of Life Theory?', answer: 'Cornelia Ruland and Shake Moore.', hint: 'Palliative/end-of-life care.' },
      { question: 'What is the difference between inductive and deductive theory development?', answer: 'Inductive begins with observations leading to generalizations; deductive begins with a theory and tests specific predictions.', hint: 'Bottom-up vs. top-down.' },
      { question: 'What is a concept in nursing theory?', answer: 'A mental image or abstract idea that represents a phenomenon in nursing.', hint: 'Building block of theory.' },
      { question: 'What is a proposition in nursing theory?', answer: 'A statement that describes the relationship between two or more concepts.', hint: 'Links concepts together.' },
      { question: 'What is borrowed theory in nursing?', answer: 'Theory adapted from another discipline (e.g., psychology, sociology) and applied to nursing practice.', hint: 'Example: Maslow\'s hierarchy.' },
    ]
  },

  'microbiology-and-parasitology': {
    title: 'Bacterial Classification',
    subject: 'MICROBIOLOGY AND PARASITOLOGY',
    cards: [
      { question: 'What color do Gram-positive bacteria turn after staining?', answer: 'Purple/Blue.', hint: 'Think Crystal Violet.' },
      { question: 'What color do Gram-negative bacteria turn after staining?', answer: 'Pink/Red.', hint: 'Counterstained with safranin.' },
      { question: 'Why do Gram-negative bacteria stain differently from Gram-positive?', answer: 'Gram-negative bacteria have a thinner peptidoglycan layer and an outer lipopolysaccharide membrane that washes away Crystal Violet with alcohol.', hint: 'Outer membrane makes the difference.' },
      { question: 'What are the four steps of the Gram staining procedure?', answer: 'Crystal Violet (primary stain), Gram\'s Iodine (mordant), Alcohol/Acetone (decolorizer), Safranin (counterstain).', hint: 'CIAS.' },
      { question: 'What is the basic shape of a coccus?', answer: 'Spherical/round.', hint: 'Example: Staphylococcus.' },
      { question: 'What is the basic shape of a bacillus?', answer: 'Rod-shaped.', hint: 'Example: Escherichia coli.' },
      { question: 'What is a spirillum?', answer: 'A rigid, spiral-shaped bacterium.', hint: 'Example: Spirillum minus.' },
      { question: 'What is a spirochete?', answer: 'A flexible, helical bacterium.', hint: 'Example: Treponema pallidum (syphilis).' },
      { question: 'What is the difference between facultative anaerobes and obligate anaerobes?', answer: 'Facultative anaerobes can grow with or without oxygen; obligate anaerobes cannot survive in the presence of oxygen.', hint: 'Oxygen tolerance.' },
      { question: 'What is the function of the bacterial capsule?', answer: 'Protects bacteria from phagocytosis and desiccation; contributes to virulence.', hint: 'Anti-phagocytic.' },
      { question: 'What is a flagellum?', answer: 'A whip-like appendage on bacteria used for locomotion.', hint: 'Motility organ.' },
      { question: 'What is a pilus (fimbria)?', answer: 'Hair-like projections on bacteria used for attachment and conjugation.', hint: 'Adhesion and gene transfer.' },
      { question: 'What is a bacterial endospore?', answer: 'A highly resistant dormant structure formed by some bacteria (e.g., Clostridium, Bacillus) to survive harsh conditions.', hint: 'Difficult to kill by heat.' },
      { question: 'What bacteria causes tuberculosis?', answer: 'Mycobacterium tuberculosis.', hint: 'Acid-fast bacillus.' },
      { question: 'What stain is used for Mycobacterium?', answer: 'Ziehl-Neelsen (acid-fast) stain.', hint: 'Appears red/pink.' },
      { question: 'What bacteria causes pneumonia (most common)?', answer: 'Streptococcus pneumoniae (pneumococcus).', hint: 'Gram-positive diplococci.' },
      { question: 'What bacteria causes typhoid fever?', answer: 'Salmonella typhi.', hint: 'Gram-negative rod.' },
      { question: 'What bacteria causes cholera?', answer: 'Vibrio cholerae.', hint: 'Comma-shaped Gram-negative rod.' },
      { question: 'What bacteria causes tetanus?', answer: 'Clostridium tetani.', hint: 'Anaerobic spore-former.' },
      { question: 'What toxin does Clostridium tetani produce?', answer: 'Tetanospasmin (neurotoxin that causes spastic paralysis).', hint: 'Prevents inhibitory neurotransmitter release.' },
      { question: 'What bacteria causes gas gangrene?', answer: 'Clostridium perfringens.', hint: 'Produces alpha toxin.' },
      { question: 'What bacteria causes botulism?', answer: 'Clostridium botulinum.', hint: 'Flaccid paralysis toxin.' },
      { question: 'What is the most common cause of urinary tract infections?', answer: 'Escherichia coli (E. coli).', hint: 'Gram-negative rod, normal gut flora.' },
      { question: 'What is MRSA?', answer: 'Methicillin-resistant Staphylococcus aureus — a strain of staph resistant to most beta-lactam antibiotics.', hint: 'Hospital-acquired infection.' },
      { question: 'What is a virus?', answer: 'An acellular infectious agent with genetic material (DNA or RNA) surrounded by a protein coat (capsid); requires a host cell to replicate.', hint: 'Not alive independently.' },
      { question: 'What is the difference between a lytic and lysogenic cycle?', answer: 'In the lytic cycle, the virus immediately replicates and destroys the host cell. In the lysogenic cycle, viral DNA integrates into the host genome and replicates silently.', hint: 'Lytic = immediate destruction.' },
      { question: 'What type of virus causes influenza?', answer: 'Orthomyxovirus (RNA virus).', hint: 'Antigenic drift and shift.' },
      { question: 'What are hemagglutinin (H) and neuraminidase (N) in influenza?', answer: 'Surface glycoproteins of the influenza virus used for host cell attachment (H) and release (N); basis for subtype naming (e.g., H1N1).', hint: 'Key antigens.' },
      { question: 'What is the causative organism of malaria?', answer: 'Plasmodium species (P. falciparum, P. vivax, P. malariae, P. ovale).', hint: 'Transmitted by Anopheles mosquito.' },
      { question: 'What is the life cycle of Plasmodium?', answer: 'Sporozoites → liver (exoerythrocytic) → merozoites → red blood cells (erythrocytic) → gametocytes → picked up by mosquito.', hint: 'Alternates between human and mosquito.' },
      { question: 'What is Entamoeba histolytica?', answer: 'A protozoan parasite that causes amoebic dysentery and liver abscess.', hint: 'Transmitted by fecal-oral route.' },
      { question: 'What is the definitive host of Taenia solium?', answer: 'Humans (tapeworm in the intestine).', hint: 'Pigs are the intermediate host.' },
      { question: 'What is cysticercosis?', answer: 'Infection with the larval (cysticercus) stage of Taenia solium in human tissues, especially the brain (neurocysticercosis).', hint: 'Caused by ingestion of T. solium eggs.' },
      { question: 'What is the causative agent of schistosomiasis?', answer: 'Schistosoma species (trematode/blood fluke).', hint: 'Penetrates through skin.' },
      { question: 'What snail is the intermediate host in schistosomiasis endemic to the Philippines?', answer: 'Oncomelania hupensis quadrasi.', hint: 'Freshwater snail.' },
      { question: 'What is Ascaris lumbricoides?', answer: 'A large roundworm (nematode) that infects the human intestine.', hint: 'Most common intestinal nematode.' },
      { question: 'What is the route of infection of hookworm?', answer: 'Larval penetration through the skin (usually barefoot contact with contaminated soil).', hint: 'Causes creeping eruption.' },
      { question: 'What is the causative agent of dengue fever?', answer: 'Dengue virus (Flavivirus, 4 serotypes).', hint: 'Transmitted by Aedes aegypti mosquito.' },
      { question: 'What is the cardinal sign of dengue hemorrhagic fever?', answer: 'Thrombocytopenia (platelet count below 100,000) with plasma leakage.', hint: 'Platelet drop.' },
      { question: 'What is herd immunity?', answer: 'Indirect protection of unvaccinated individuals when a sufficient proportion of the population is immune, interrupting transmission.', hint: 'Community-level protection.' },
      { question: 'What is an autoclave and what does it use?', answer: 'A device that uses steam under pressure (121°C at 15 psi for 15–20 minutes) to sterilize equipment.', hint: 'Standard sterilization method.' },
      { question: 'What is the difference between disinfection and sterilization?', answer: 'Disinfection removes most pathogens but not spores; sterilization eliminates all microorganisms including spores.', hint: 'Sterilization is more complete.' },
      { question: 'What is Koch\'s postulates?', answer: 'Criteria to establish causation between a microbe and a disease: organism found in all cases, isolated in pure culture, causes disease when inoculated, and re-isolated from experimental host.', hint: 'Foundation of microbiology.' },
      { question: 'What is a prion?', answer: 'An abnormal, misfolded protein that can cause other proteins to misfold; responsible for Creutzfeldt-Jakob disease (CJD) and mad cow disease.', hint: 'No nucleic acid.' },
      { question: 'What is the mechanism of action of beta-lactam antibiotics?', answer: 'They inhibit bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs), preventing cross-linking of peptidoglycan.', hint: 'Target: cell wall.' },
      { question: 'What is antibiotic resistance?', answer: 'The ability of bacteria to survive and grow in the presence of antibiotics, due to mechanisms like enzyme production, efflux pumps, or target modification.', hint: 'Major global health threat.' },
      { question: 'What is the normal flora?', answer: 'Microorganisms that normally inhabit the body without causing disease; they compete with pathogens and assist in digestion.', hint: 'Commensal bacteria.' },
      { question: 'What is an opportunistic infection?', answer: 'An infection caused by a normally harmless organism that becomes pathogenic when the host\'s immune system is compromised.', hint: 'Example: Candida in immunosuppressed patients.' },
      { question: 'What is the replication cycle of HIV?', answer: 'HIV binds to CD4+ T cells via gp120, reverse transcribes its RNA to DNA, integrates into the host genome, and uses the host cell to produce new virions.', hint: 'Targets helper T cells.' },
      { question: 'What is ELISA and how is it used in microbiology?', answer: 'Enzyme-Linked Immunosorbent Assay — a test that detects antibodies or antigens using enzyme-linked antibodies and a color change.', hint: 'Used to screen for HIV and other infections.' },
      { question: 'What is the cell wall component unique to bacteria that can trigger the immune response?', answer: 'Lipopolysaccharide (LPS) in Gram-negative bacteria — acts as an endotoxin and triggers systemic inflammation/sepsis.', hint: 'Endotoxin.' },
    ]
  },

  'health-assessment': {
    title: 'Physical Examination',
    subject: 'HEALTH ASSESSMENT',
    cards: [
      { question: 'What are the 4 techniques of physical assessment?', answer: 'Inspection, Palpation, Percussion, and Auscultation.', hint: 'IPPA.' },
      { question: 'In what order are the assessment techniques performed on the abdomen?', answer: 'Inspection, Auscultation, Percussion, Palpation (bowel sounds may be altered by palpation/percussion).', hint: 'IAPP for abdomen.' },
      { question: 'What does inspection involve?', answer: 'Visual examination of the body using the naked eye, noting color, size, shape, symmetry, and movement.', hint: 'Looking carefully.' },
      { question: 'What is light palpation used for?', answer: 'Assessing skin texture, temperature, surface masses, and tenderness (depth of ~1 cm).', hint: 'Gentle pressure.' },
      { question: 'What is deep palpation used for?', answer: 'Assessing organs and masses deeper in the abdomen (depth of 4–5 cm).', hint: 'More pressure, bimanual technique.' },
      { question: 'What does resonance sound like during percussion?', answer: 'A low-pitched, hollow sound heard over air-filled structures like normal lung tissue.', hint: 'Normal lung sound.' },
      { question: 'What does dullness sound like during percussion?', answer: 'A short, soft, thud-like sound heard over solid organs like the liver or spleen.', hint: 'Liver, spleen.' },
      { question: 'What does tympany sound like during percussion?', answer: 'A musical, drum-like sound heard over air-filled cavities like the stomach or intestines.', hint: 'Gastric bubble.' },
      { question: 'What does hyperresonance indicate?', answer: 'Abnormal air accumulation, as seen in emphysema or pneumothorax.', hint: 'Too much air.' },
      { question: 'What does flatness indicate during percussion?', answer: 'Very dense tissue with no air, such as muscle or bone.', hint: 'Solid tissue.' },
      { question: 'What does the Glasgow Coma Scale (GCS) assess?', answer: 'Level of consciousness using Eye opening, Verbal response, and Motor response (max score 15, min 3).', hint: 'E + V + M.' },
      { question: 'What GCS score indicates severe brain injury?', answer: 'Score of 8 or below.', hint: 'Also indicates need for airway management.' },
      { question: 'What is the normal respiratory rate for adults?', answer: '12 to 20 breaths per minute.', hint: 'Eupnea.' },
      { question: 'What is the normal heart rate for adults?', answer: '60 to 100 beats per minute.', hint: 'Pulse rate.' },
      { question: 'What is the normal blood pressure for adults?', answer: 'Less than 120/80 mmHg.', hint: 'Systolic/diastolic.' },
      { question: 'What is the normal oral temperature?', answer: '36.5°C to 37.5°C (97.7°F to 99.5°F).', hint: 'Average 37°C / 98.6°F.' },
      { question: 'What is the normal oxygen saturation (SpO2)?', answer: '95–100%.', hint: 'Measured by pulse oximetry.' },
      { question: 'What is a normal pain scale score?', answer: '0 on a 0–10 scale (0 = no pain, 10 = worst pain).', hint: 'NRS or numeric rating scale.' },
      { question: 'What is Korotkoff sounds?', answer: 'The sounds heard through a stethoscope when measuring blood pressure; Phase I (first sound) = systolic; Phase V (disappearance) = diastolic.', hint: 'BP auscultation sounds.' },
      { question: 'What is the purpose of the health history?', answer: 'To collect subjective data about the patient\'s current health status, past medical history, family history, and lifestyle.', hint: 'Baseline subjective information.' },
      { question: 'What is OLDCARTS?', answer: 'A mnemonic for assessing symptoms: Onset, Location, Duration, Character, Aggravating factors, Relieving factors, Timing, and Severity.', hint: 'Symptom analysis framework.' },
      { question: 'What is the difference between signs and symptoms?', answer: 'Signs are objective findings detected by the examiner; symptoms are subjective experiences reported by the patient.', hint: 'Objective vs. subjective.' },
      { question: 'What is the purpose of a genogram?', answer: 'A family health history diagram that shows disease patterns across generations.', hint: 'Family medical tree.' },
      { question: 'What is the purpose of assessing the JVP (jugular venous pressure)?', answer: 'To indirectly assess right heart pressure; elevated JVP may indicate right-sided heart failure.', hint: 'Neck vein assessment.' },
      { question: 'What is the normal range of a capillary refill time?', answer: 'Less than 2 seconds.', hint: 'Peripheral circulation indicator.' },
      { question: 'What does PERRLA stand for?', answer: 'Pupils Equal, Round, and Reactive to Light and Accommodation.', hint: 'Pupil assessment.' },
      { question: 'What is the Rinne test?', answer: 'A hearing test using a tuning fork to compare air conduction versus bone conduction.', hint: 'Air conduction should be greater.' },
      { question: 'What is the Weber test?', answer: 'A hearing test placing a vibrating tuning fork on the midline of the skull; sound should be heard equally in both ears.', hint: 'Lateralization indicates hearing loss type.' },
      { question: 'What are Snellen chart findings?', answer: '20/20 vision is normal; 20/40 means the patient sees at 20 feet what a normal eye sees at 40 feet.', hint: 'Visual acuity.' },
      { question: 'What are the four abdominal quadrants?', answer: 'Right upper quadrant (RUQ), Left upper quadrant (LUQ), Right lower quadrant (RLQ), Left lower quadrant (LLQ).', hint: 'Divided by umbilicus.' },
      { question: 'What organs are found in the RUQ?', answer: 'Liver, gallbladder, right kidney, part of the colon.', hint: 'Upper right abdomen.' },
      { question: 'What does Rovsing\'s sign indicate?', answer: 'Pain in the RLQ when pressure is applied to the LLQ — suggests appendicitis.', hint: 'Appendicitis sign.' },
      { question: 'What is McBurney\'s point?', answer: 'A point 1/3 the distance from the right anterior superior iliac spine (ASIS) to the umbilicus; tenderness here suggests appendicitis.', hint: 'Appendix location.' },
      { question: 'What is the Murphy\'s sign?', answer: 'Sudden stopping of inspiration during deep palpation of the RUQ due to pain — indicates cholecystitis.', hint: 'Gallbladder tenderness.' },
      { question: 'What is the Cullen\'s sign?', answer: 'Periumbilical ecchymosis (bruising) indicating intraperitoneal hemorrhage (e.g., ectopic pregnancy, pancreatitis).', hint: 'Bruising around navel.' },
      { question: 'What is the Grey Turner\'s sign?', answer: 'Ecchymosis of the flanks indicating retroperitoneal hemorrhage (e.g., pancreatitis, trauma).', hint: 'Flank bruising.' },
      { question: 'What is Homan\'s sign?', answer: 'Pain in the calf on dorsiflexion of the foot — historically associated with DVT (not reliable, largely deprecated).', hint: 'Deep vein thrombosis sign.' },
      { question: 'What is the Babinski reflex?', answer: 'Extension (dorsiflexion) of the big toe and fanning of other toes when the plantar surface is stroked; normal in infants, abnormal in adults (indicates upper motor neuron lesion).', hint: 'Plantar reflex.' },
      { question: 'What is the scale for assessing deep tendon reflexes?', answer: '0 (absent), 1+ (diminished), 2+ (normal), 3+ (brisk), 4+ (hyperactive with clonus).', hint: '0 to 4+ scale.' },
      { question: 'What is the purpose of the Romberg test?', answer: 'Assesses balance and proprioception; the patient stands with feet together and eyes closed — swaying or falling indicates a positive test.', hint: 'Cerebellar function test.' },
      { question: 'What is the purpose of assessing turgor?', answer: 'To assess hydration status; skin that is slow to return after pinching indicates dehydration.', hint: 'Skin elasticity.' },
      { question: 'What is diaphoresis?', answer: 'Excessive sweating, often associated with fever, pain, or cardiovascular events.', hint: 'Profuse sweating.' },
      { question: 'What is edema grading (pitting edema)?', answer: '1+ (2mm depth), 2+ (4mm), 3+ (6mm), 4+ (8mm or more).', hint: '1–4+ scale based on depth.' },
      { question: 'What is BMI and how is it calculated?', answer: 'Body Mass Index = Weight (kg) / Height² (m²); indicates nutritional status.', hint: 'Normal: 18.5–24.9.' },
      { question: 'What is the purpose of the Mental Status Examination (MSE)?', answer: 'To assess cognitive function including orientation, memory, attention, language, and thought processes.', hint: 'Neuropsychiatric assessment.' },
      { question: 'What does the Mini-Mental State Examination (MMSE) assess?', answer: 'Cognitive function; tests orientation, registration, attention, recall, language, and visuospatial skills; max score of 30.', hint: 'Screens for dementia.' },
      { question: 'What is a focused assessment?', answer: 'A rapid, problem-specific assessment targeting a particular complaint or body system.', hint: 'Opposite of comprehensive assessment.' },
      { question: 'What is the purpose of the review of systems (ROS)?', answer: 'A systematic method of gathering subjective information about each body system to identify problems not addressed in the chief complaint.', hint: 'Head-to-toe subjective inquiry.' },
      { question: 'What is the difference between a complete and a focused health assessment?', answer: 'A complete assessment covers all systems (used on admission); a focused assessment targets specific complaints or changes in condition.', hint: 'Scope of assessment.' },
      { question: 'What tool is used to assess pain in non-verbal patients?', answer: 'FLACC Scale (Face, Legs, Activity, Cry, Consolability) or the Behavioral Pain Scale (BPS).', hint: 'Observational pain tools.' },
    ]
  },

  'fundamentals-of-nursing': {
    title: 'Nursing Process',
    subject: 'FUNDAMENTALS OF NURSING',
    cards: [
      { question: 'What are the steps of the Nursing Process?', answer: 'Assessment, Diagnosis, Planning, Implementation, and Evaluation.', hint: 'ADPIE.' },
      { question: 'What is the first step of the nursing process?', answer: 'Assessment — systematic collection of subjective and objective data about the patient.', hint: 'Data collection phase.' },
      { question: 'What is the difference between subjective and objective data?', answer: 'Subjective data is what the patient reports (symptoms); objective data is what the nurse observes or measures (signs).', hint: 'S = what they say; O = what you see.' },
      { question: 'What is a nursing diagnosis?', answer: 'A clinical judgment about a patient\'s response to actual or potential health problems formulated by the nurse.', hint: 'NANDA format.' },
      { question: 'What is the NANDA format for a nursing diagnosis?', answer: 'Problem related to (r/t) Etiology as evidenced by (AEB) Signs and Symptoms (PES format).', hint: 'PES = Problem, Etiology, Signs/Symptoms.' },
      { question: 'What is the difference between a medical diagnosis and a nursing diagnosis?', answer: 'A medical diagnosis identifies a disease; a nursing diagnosis identifies the patient\'s response to health problems and is within the nurse\'s scope.', hint: 'Response vs. disease identification.' },
      { question: 'What are the three types of nursing diagnoses?', answer: 'Actual, Risk (potential), and Health promotion (wellness) diagnoses.', hint: 'Actual, Risk, Wellness.' },
      { question: 'What is a risk nursing diagnosis?', answer: 'A clinical judgment that an individual is vulnerable to developing a specific problem; no defining characteristics yet.', hint: 'Preceded by "Risk for..."' },
      { question: 'What is planning in the nursing process?', answer: 'Setting patient-centered goals and selecting nursing interventions to achieve those goals.', hint: 'Goal and intervention selection.' },
      { question: 'What are SMART goals?', answer: 'Specific, Measurable, Achievable, Realistic, and Time-bound.', hint: 'Criteria for good goals.' },
      { question: 'What is the difference between short-term and long-term goals?', answer: 'Short-term goals are achievable within days or hours (immediate/acute); long-term goals take weeks or months.', hint: 'Time frame.' },
      { question: 'What are independent nursing interventions?', answer: 'Actions the nurse initiates based on their own judgment and scope of practice without a physician\'s order.', hint: 'Nurse-initiated.' },
      { question: 'What are dependent nursing interventions?', answer: 'Actions that require a physician\'s order, such as administering medications.', hint: 'Physician-ordered.' },
      { question: 'What are interdependent (collaborative) nursing interventions?', answer: 'Actions performed jointly with other healthcare team members.', hint: 'Team-based care.' },
      { question: 'What is the final step of the nursing process?', answer: 'Evaluation — determining if patient goals were met, partially met, or not met, and revising the care plan.', hint: 'Reassessment of outcomes.' },
      { question: 'What is documentation in nursing?', answer: 'The systematic recording of patient assessment data, care provided, and patient responses in the medical record.', hint: 'Legal and communication tool.' },
      { question: 'What does SOAP note stand for?', answer: 'Subjective, Objective, Assessment, Plan.', hint: 'Charting format.' },
      { question: 'What is the difference between primary and secondary sources of data?', answer: 'Primary source is the patient themselves; secondary sources include family, health records, or other providers.', hint: 'Who provides the information.' },
      { question: 'What is aseptic technique?', answer: 'Practices used to prevent the introduction of microorganisms into the body or environment.', hint: 'Infection prevention.' },
      { question: 'What is the difference between medical and surgical asepsis?', answer: 'Medical asepsis (clean technique) reduces the number of pathogens; surgical asepsis (sterile technique) eliminates all microorganisms.', hint: 'Clean vs. sterile.' },
      { question: 'What are standard precautions?', answer: 'Infection control practices applied to ALL patients regardless of diagnosis, including hand hygiene, PPE, respiratory hygiene, and safe injection practices.', hint: 'Applied universally.' },
      { question: 'When should hand hygiene be performed (WHO 5 Moments)?', answer: 'Before patient contact, before aseptic procedure, after body fluid exposure risk, after patient contact, after contact with patient surroundings.', hint: 'WHO 5 Moments for Hand Hygiene.' },
      { question: 'What is the correct technique for handwashing?', answer: 'Wet hands, apply soap, rub for at least 20 seconds covering all surfaces, rinse, and dry with a clean towel.', hint: 'At least 20 seconds.' },
      { question: 'What is the order for donning PPE?', answer: 'Gown → Mask/Respirator → Goggles/Face shield → Gloves.', hint: 'GMGG.' },
      { question: 'What is the order for doffing PPE?', answer: 'Gloves → Goggles/Face shield → Gown → Mask/Respirator.', hint: 'Remove most contaminated first.' },
      { question: 'What is droplet precaution?', answer: 'Used for infections spread through large respiratory droplets (>5 µm), e.g., influenza, meningococcal disease; requires a surgical mask within 1 meter.', hint: 'Example: flu.' },
      { question: 'What is airborne precaution?', answer: 'Used for infections spread through small particles (<5 µm) that remain suspended in air, e.g., TB, measles, chickenpox; requires an N95 respirator and negative pressure room.', hint: 'Example: TB.' },
      { question: 'What is contact precaution?', answer: 'Used for infections spread through direct or indirect contact, e.g., MRSA, C. difficile; requires gloves and gown.', hint: 'Example: MRSA.' },
      { question: 'What is the proper method for turning a patient to prevent pressure ulcers?', answer: 'Turn and reposition every 2 hours using a turning schedule; use pillows or foam wedges to offload pressure points.', hint: 'Frequent repositioning.' },
      { question: 'What are the pressure points most at risk for pressure ulcers in supine position?', answer: 'Occiput, sacrum, heels, and scapulae.', hint: 'Bony prominences in supine.' },
      { question: 'What is the Braden Scale?', answer: 'A tool used to assess risk for pressure ulcer development, scoring sensory perception, moisture, activity, mobility, nutrition, and friction/shear.', hint: 'Lower score = higher risk.' },
      { question: 'What are the 6 rights of medication administration?', answer: 'Right Patient, Right Drug, Right Dose, Right Route, Right Time, Right Documentation.', hint: 'Minimum 6 rights.' },
      { question: 'What is the correct technique for IM injection?', answer: 'Select appropriate site (e.g., deltoid, vastus lateralis, ventrogluteal), clean site, insert needle at 90° angle, aspirate (some guidelines omit this), inject, and withdraw.', hint: 'Intramuscular technique.' },
      { question: 'What is the Z-track technique?', answer: 'An IM injection method where the skin is displaced laterally before injection and released after withdrawal, to prevent medication from tracking back along the needle path.', hint: 'Used for irritating medications like iron.' },
      { question: 'What is the correct angle for a subcutaneous injection?', answer: '45 to 90 degrees, depending on the patient\'s body fat.', hint: 'Insulin and heparin route.' },
      { question: 'What is an intradermal injection used for?', answer: 'Allergy tests and tuberculin (Mantoux) skin testing; given at a 5–15° angle in the forearm.', hint: 'Bleb formed under skin.' },
      { question: 'What is the correct rate of flow for IV fluids?', answer: 'Calculated by the physician\'s order and confirmed using the drop factor formula: Flow rate (drops/min) = Volume (mL) / Time (min) × Drop factor.', hint: 'gtt/min formula.' },
      { question: 'What is an infiltration of an IV line?', answer: 'Leakage of IV fluid into the surrounding tissue due to displacement of the cannula; site becomes swollen, cool, and pale.', hint: 'Non-vesicant fluid in tissue.' },
      { question: 'What is extravasation?', answer: 'Leakage of a vesicant (tissue-damaging) drug into surrounding tissue; can cause severe tissue injury.', hint: 'Chemotherapy complication.' },
      { question: 'What is a nasogastric tube (NGT) used for?', answer: 'Gastric decompression, tube feeding, medication administration, or gastric lavage.', hint: 'Passed through nose to stomach.' },
      { question: 'How is NGT placement verified?', answer: 'Aspiration of gastric contents and checking pH (≤5.5), X-ray confirmation (gold standard), and auscultation of air bolus.', hint: 'X-ray is most accurate.' },
      { question: 'What is a Foley catheter?', answer: 'An indwelling urinary catheter inserted through the urethra into the bladder to drain urine continuously.', hint: 'Balloon keeps it in place.' },
      { question: 'What is the normal urine output per hour?', answer: '0.5 to 1 mL/kg/hour (approximately 30–50 mL/hour for adults).', hint: 'Oliguria < 0.5 mL/kg/hr.' },
      { question: 'What is the purpose of a care plan?', answer: 'A written plan that outlines patient-specific nursing diagnoses, goals, interventions, and evaluation criteria to guide individualized care.', hint: 'Individualized care guide.' },
      { question: 'What is Maslow\'s hierarchy as applied to care prioritization?', answer: 'Physiological needs are addressed first (airway, breathing, circulation), followed by safety, then psychosocial needs.', hint: 'Basic needs first.' },
      { question: 'What is the nurse\'s role in informed consent?', answer: 'The nurse witnesses the patient\'s signature and ensures the patient understands the procedure; the explanation is the physician\'s responsibility.', hint: 'Witness, not explainer.' },
      { question: 'What is the purpose of incident reports?', answer: 'To document unexpected events (falls, medication errors, near misses) for quality improvement and legal protection; not part of the medical record.', hint: 'Quality assurance tool.' },
      { question: 'What is client advocacy in nursing?', answer: 'Acting in the best interest of the patient by protecting their rights, providing information, and supporting informed decision-making.', hint: 'Patient rights protection.' },
      { question: 'What is the difference between empathy and sympathy in nursing?', answer: 'Empathy is understanding and sharing the patient\'s feelings without judgment; sympathy is feeling pity for the patient.', hint: 'Empathy is therapeutic; sympathy is not.' },
      { question: 'What is therapeutic communication?', answer: 'Communication techniques that promote the patient\'s expression of thoughts and feelings and the nurse\'s understanding of those expressions.', hint: 'Examples: open-ended questions, reflection.' },
      { question: 'What are non-therapeutic communication techniques to avoid?', answer: 'Giving false reassurance, using medical jargon, giving advice, asking "why" questions, and making value judgments.', hint: 'Barriers to communication.' },
    ]
  },

  // =========================================================
  // LEVEL 2
  // =========================================================

  'community-health-nursing': {
    title: 'Public Health Concepts',
    subject: 'COMMUNITY HEALTH NURSING',
    cards: [
      { question: 'What is the focus of CHN?', answer: 'Health promotion and disease prevention in the community.', hint: 'Not just individual care.' },
      { question: 'What is the definition of community health nursing?', answer: 'A synthesis of nursing practice and public health principles applied to promote and preserve the health of populations.', hint: 'Population-focused nursing.' },
      { question: 'What are the levels of prevention?', answer: 'Primary (prevent disease), Secondary (early detection), and Tertiary (rehabilitation and minimizing disability).', hint: 'Three levels of Leavell and Clark.' },
      { question: 'What are examples of primary prevention?', answer: 'Immunization, health education, proper nutrition, and environmental sanitation.', hint: 'Before disease occurs.' },
      { question: 'What are examples of secondary prevention?', answer: 'Screening programs, early diagnosis, and prompt treatment.', hint: 'Early detection.' },
      { question: 'What are examples of tertiary prevention?', answer: 'Rehabilitation, physical therapy, support groups, and prevention of complications.', hint: 'Minimize disability.' },
      { question: 'What is the Primary Health Care approach?', answer: 'Essential health care based on practical, scientifically sound, and socially acceptable methods made universally accessible; based on the Alma Ata Declaration (1978).', hint: 'Alma Ata 1978.' },
      { question: 'What are the 8 elements of PHC (Alma Ata)?', answer: 'Education, Local endemic disease control, Expanded Program on Immunization, MCH including family planning, Essential drugs, Nutrition, Treatment of common diseases and injuries, Safe water and basic sanitation.', hint: 'ELEMENTS mnemonic.' },
      { question: 'What is the Expanded Program on Immunization (EPI)?', answer: 'A Philippine DOH program ensuring all children receive vaccines against vaccine-preventable diseases.', hint: 'National immunization program.' },
      { question: 'What vaccines are included in the Philippine EPI?', answer: 'BCG, Hepatitis B, DPT/Pentavalent, OPV/IPV, Measles-Mumps-Rubella (MMR), and Rotavirus, among others.', hint: 'Core childhood vaccines.' },
      { question: 'What is BCG vaccine for?', answer: 'Prevention of tuberculosis; given at birth.', hint: 'Bacillus Calmette-Guérin.' },
      { question: 'What is epidemiology?', answer: 'The study of the distribution and determinants of health-related states and events in specified populations.', hint: 'Who, what, when, where, why of disease.' },
      { question: 'What is incidence?', answer: 'The number of new cases of a disease occurring in a population during a specified time period.', hint: 'New cases.' },
      { question: 'What is prevalence?', answer: 'The total number of existing cases (new and old) of a disease in a population at a given time.', hint: 'Existing cases.' },
      { question: 'What is morbidity rate?', answer: 'The rate of illness or disease occurrence in a population.', hint: 'Sickness rate.' },
      { question: 'What is mortality rate?', answer: 'The rate of deaths in a population.', hint: 'Death rate.' },
      { question: 'What is the infant mortality rate?', answer: 'The number of deaths of infants under 1 year per 1,000 live births in a given year.', hint: 'Sensitive indicator of health.' },
      { question: 'What is maternal mortality ratio?', answer: 'The number of maternal deaths per 100,000 live births.', hint: 'Indicator of obstetric care quality.' },
      { question: 'What is a notifiable disease?', answer: 'A disease that must be reported to public health authorities, e.g., tuberculosis, dengue, COVID-19.', hint: 'Mandatory reporting.' },
      { question: 'What is herd immunity threshold?', answer: 'The proportion of the population that must be immune (through vaccination or prior infection) to prevent disease spread. Varies by disease (e.g., measles ≈ 95%).', hint: 'R0-dependent.' },
      { question: 'What is the chain of infection?', answer: 'Infectious agent → Reservoir → Portal of exit → Mode of transmission → Portal of entry → Susceptible host.', hint: 'Six links.' },
      { question: 'What is the most effective way to break the chain of infection?', answer: 'Hand hygiene and proper sanitation.', hint: 'Interrupts transmission.' },
      { question: 'What is endemic?', answer: 'A disease constantly present in a particular geographic area or population.', hint: 'Baseline presence.' },
      { question: 'What is epidemic?', answer: 'An occurrence of a disease in excess of normal expectancy in a community.', hint: 'More than expected.' },
      { question: 'What is pandemic?', answer: 'An epidemic that spreads across countries or continents.', hint: 'Worldwide spread.' },
      { question: 'What is a sporadic disease?', answer: 'A disease occurring irregularly and infrequently in a population with no predictable pattern.', hint: 'Isolated, unpredictable cases.' },
      { question: 'What is the role of the barangay health center in CHN?', answer: 'It is the basic health service delivery point at the community level, providing preventive, promotive, and basic curative care.', hint: 'First-level facility.' },
      { question: 'What is community diagnosis?', answer: 'The process of identifying the health problems and needs of a community using epidemiological data, surveys, and observation.', hint: 'Community-level assessment.' },
      { question: 'What is the COPAR process?', answer: 'Community Organizing Participatory Action Research — a process that involves the community in identifying and solving their own health problems.', hint: 'Empowerment approach.' },
      { question: 'What are the five steps in the community health nursing process?', answer: 'Community assessment, community diagnosis, planning, implementation, and evaluation.', hint: 'Same as nursing process but at community level.' },
      { question: 'What is a home visit in CHN?', answer: 'A purposeful visit to a patient\'s home to deliver care and assess living conditions.', hint: 'Care in the community setting.' },
      { question: 'What are the purposes of a home visit?', answer: 'Assessment of family and home environment, health education, provision of direct nursing care, and follow-up.', hint: 'Multiple purposes.' },
      { question: 'What is a family health record?', answer: 'A cumulative record of health information for all members of a family used to monitor and plan family health care.', hint: 'Family-based documentation.' },
      { question: 'What are the four phases of a home visit?', answer: 'Preparation, Introduction, Implementation, and Termination/Evaluation.', hint: 'PIIT.' },
      { question: 'What is the purpose of an ecomap?', answer: 'To illustrate the family\'s relationships and connections with external resources and community systems.', hint: 'External family connections.' },
      { question: 'What is the purpose of a genogram in CHN?', answer: 'To depict health patterns across generations and identify inherited risks within a family.', hint: 'Family health history diagram.' },
      { question: 'What is the Cues-to-Action model?', answer: 'Part of the Health Belief Model — internal or external triggers that motivate individuals to take a health action.', hint: 'Health Belief Model component.' },
      { question: 'What are the five components of the Health Belief Model?', answer: 'Perceived susceptibility, perceived severity, perceived benefits, perceived barriers, and cues to action (plus self-efficacy).', hint: 'Why people take health actions.' },
      { question: 'What is the PRECEDE-PROCEED model?', answer: 'A health program planning model that starts with desired outcomes and works backward to identify determinants and forward through implementation.', hint: 'Program planning framework.' },
      { question: 'What is the DOH organizational structure in the Philippines?', answer: 'Central office (DOH) → Regional health offices (CHDs) → Provincial/City hospitals → Barangay health centers.', hint: 'Hierarchical structure.' },
      { question: 'What is RA 9173 (Philippine Nursing Act of 2002)?', answer: 'The law that regulates the practice of nursing in the Philippines, including licensure, education, and professional standards.', hint: 'Philippine Nursing Act.' },
      { question: 'What is the "Kalusugan Pangkalahatan" program?', answer: 'A DOH universal health care program aiming for equitable access to health services for all Filipinos.', hint: 'Universal Health Care initiative.' },
      { question: 'What is PhilHealth?', answer: 'The Philippine Health Insurance Corporation providing social health insurance to Filipinos.', hint: 'National health insurance.' },
      { question: 'What is the DOTS strategy for tuberculosis?', answer: 'Directly Observed Treatment Short-course — a WHO strategy where a health worker observes the patient taking each dose of anti-TB medication.', hint: 'TB treatment adherence.' },
      { question: 'What is the standard first-line TB drug regimen in the Philippines?', answer: '2HRZE/4HR — Isoniazid, Rifampicin, Pyrazinamide, and Ethambutol for 2 months, then Isoniazid and Rifampicin for 4 months.', hint: 'RIPE drugs.' },
      { question: 'What are the social determinants of health?', answer: 'Conditions in the environment where people are born, live, work, and age that affect health outcomes (e.g., income, education, housing, employment).', hint: 'Non-medical factors affecting health.' },
      { question: 'What is a health education vs health promotion?', answer: 'Health education provides information and skills; health promotion encompasses all strategies (policy, education, environment) to enable people to increase control over their health.', hint: 'Education is part of promotion.' },
      { question: 'What is the Ottawa Charter for Health Promotion (1986)?', answer: 'An international agreement outlining five action areas for health promotion: building healthy public policy, creating supportive environments, strengthening community action, developing personal skills, and reorienting health services.', hint: '5 action areas.' },
      { question: 'What is the difference between health promotion and disease prevention?', answer: 'Health promotion focuses on enhancing well-being and quality of life; disease prevention focuses on reducing the risk and burden of specific diseases.', hint: 'Positive vs. negative framing.' },
      { question: 'What is the Family Nurse Practitioner role in CHN?', answer: 'To provide primary health care at the family level, including assessment, health education, coordination of care, and referral.', hint: 'Primary care at family level.' },
      { question: 'What is the safe motherhood program?', answer: 'A program to reduce maternal and infant mortality through prenatal care, skilled birth attendance, emergency obstetric care, and postnatal care.', hint: 'Maternal health program.' },
    ]
  },

  'nutrition-and-diet-therapy': {
    title: 'Therapeutic Diets',
    subject: 'NUTRITION AND DIET THERAPY',
    cards: [
      { question: 'What diet is prescribed for hypertension?', answer: 'DASH Diet (Low Sodium).', hint: 'Dietary Approaches to Stop Hypertension.' },
      { question: 'What is the DASH diet?', answer: 'A diet rich in fruits, vegetables, whole grains, and low-fat dairy; low in saturated fat, cholesterol, and sodium.', hint: 'Reduces blood pressure.' },
      { question: 'What are the three macronutrients?', answer: 'Carbohydrates, Proteins, and Fats.', hint: 'Provide energy.' },
      { question: 'How many calories per gram does each macronutrient provide?', answer: 'Carbohydrates: 4 kcal/g; Proteins: 4 kcal/g; Fats: 9 kcal/g.', hint: 'Fat has the most energy density.' },
      { question: 'What is the recommended daily sodium intake for adults?', answer: 'Less than 2,300 mg per day; ideally 1,500 mg for those with hypertension.', hint: 'Low-sodium diet guideline.' },
      { question: 'What diet is recommended for patients with chronic kidney disease (CKD)?', answer: 'Low protein, low potassium, low phosphorus, and low sodium diet.', hint: 'Renal diet.' },
      { question: 'What foods are high in potassium to avoid in CKD?', answer: 'Bananas, oranges, potatoes, tomatoes, and dried fruits.', hint: 'K+ restriction in renal diet.' },
      { question: 'What is a low-residue (low-fiber) diet used for?', answer: 'Conditions requiring reduced bowel activity, such as Crohn\'s disease flare-ups, bowel surgery preparation, or diverticulitis.', hint: 'Minimizes stool production.' },
      { question: 'What is a high-fiber diet used for?', answer: 'Prevention and treatment of constipation, diverticular disease, and hypercholesterolemia.', hint: 'Increases stool bulk.' },
      { question: 'What is the recommended daily fiber intake for adults?', answer: '25–38 grams per day (women: 25g; men: 38g).', hint: 'Dietary fiber recommendation.' },
      { question: 'What is the diabetic diet?', answer: 'A diet that controls carbohydrate intake, emphasizes low glycemic index foods, adequate fiber, and consistent meal timing.', hint: 'Carbohydrate counting.' },
      { question: 'What is the glycemic index (GI)?', answer: 'A measure of how quickly a carbohydrate-containing food raises blood glucose compared to pure glucose (GI of 100).', hint: 'Low GI = slow glucose rise.' },
      { question: 'What is a clear liquid diet?', answer: 'A diet consisting only of liquids that are transparent at room temperature, such as water, broth, clear juice, and gelatin.', hint: 'Pre/post-surgical diet.' },
      { question: 'What is a full liquid diet?', answer: 'A diet that includes all liquids and foods that are liquid at body temperature, such as milk, cream soups, ice cream, and strained cereals.', hint: 'After clear liquids.' },
      { question: 'What is a soft diet?', answer: 'A diet of easily chewed and digested foods, low in fiber and connective tissue, for patients with dental problems or GI issues.', hint: 'Mechanically altered.' },
      { question: 'What is the purpose of a high-protein diet?', answer: 'To support wound healing, tissue repair, surgery recovery, burns, and conditions associated with increased protein needs.', hint: 'Anabolic support.' },
      { question: 'What is the recommended daily protein intake for healthy adults?', answer: '0.8 grams per kilogram of body weight per day.', hint: 'RDA for protein.' },
      { question: 'What is a low-fat diet used for?', answer: 'Gallbladder disease, pancreatitis, hyperlipidemia, and malabsorption syndromes.', hint: 'Fat restriction.' },
      { question: 'What is a cholesterol-lowering diet?', answer: 'A diet that limits saturated fats, trans fats, and dietary cholesterol while increasing soluble fiber and plant sterols.', hint: 'Cardiac-protective diet.' },
      { question: 'What is a purine-restricted diet used for?', answer: 'Management of gout and hyperuricemia; limits organ meats, shellfish, red meat, and alcohol.', hint: 'Reduces uric acid production.' },
      { question: 'What is lactose intolerance?', answer: 'An inability to digest lactose due to deficiency of lactase enzyme; causes bloating, diarrhea, and cramping after dairy consumption.', hint: 'Dairy intolerance.' },
      { question: 'What diet is used for celiac disease?', answer: 'A strict gluten-free diet (avoiding wheat, barley, rye, and their derivatives).', hint: 'No gluten.' },
      { question: 'What is malnutrition?', answer: 'A condition resulting from insufficient, excessive, or imbalanced consumption of nutrients affecting body function.', hint: 'Undernutrition or overnutrition.' },
      { question: 'What is kwashiorkor?', answer: 'Protein deficiency malnutrition characterized by edema, distended abdomen, skin changes, and normal to high calorie intake.', hint: 'Protein-energy malnutrition.' },
      { question: 'What is marasmus?', answer: 'Severe caloric (energy) malnutrition characterized by extreme wasting of muscle and fat, without edema.', hint: 'Total starvation state.' },
      { question: 'What is the difference between kwashiorkor and marasmus?', answer: 'Kwashiorkor = protein deficiency with edema; Marasmus = calorie and protein deficiency with wasting but no edema.', hint: 'Edema distinguishes them.' },
      { question: 'What is the Nutrition Care Process (NCP)?', answer: 'A standardized approach used by dietitians: Nutrition Assessment, Nutrition Diagnosis, Nutrition Intervention, Nutrition Monitoring and Evaluation (ADIME).', hint: 'Dietitian\'s clinical process.' },
      { question: 'What is the body mass index (BMI) classification?', answer: 'Underweight < 18.5; Normal 18.5–24.9; Overweight 25–29.9; Obese ≥ 30.', hint: 'kg/m² classification.' },
      { question: 'What is the TPN (Total Parenteral Nutrition)?', answer: 'A method of providing all nutritional requirements intravenously when the GI tract cannot be used.', hint: 'IV nutrition.' },
      { question: 'What is enteral nutrition?', answer: 'Delivery of nutrients directly into the GI tract (stomach, duodenum, or jejunum) via a feeding tube.', hint: 'Tube feeding.' },
      { question: 'What is the preferred feeding route when the GI tract is functional?', answer: 'Enteral (oral or tube feeding) — "If the gut works, use it."', hint: 'Enteral is always preferred.' },
      { question: 'What is refeeding syndrome?', answer: 'A potentially fatal metabolic complication that occurs when nutrition is reintroduced too rapidly to a severely malnourished person; characterized by hypokalemia, hypophosphatemia, and hypomagnesemia.', hint: 'Electrolyte shifts after starvation.' },
      { question: 'What vitamins are most commonly deficient in the elderly?', answer: 'Vitamin D, Vitamin B12, and Calcium.', hint: 'Age-related deficiencies.' },
      { question: 'What is the function of Vitamin C?', answer: 'Antioxidant, collagen synthesis, immune function, and enhances iron absorption.', hint: 'Ascorbic acid.' },
      { question: 'What disease is caused by Vitamin C deficiency?', answer: 'Scurvy (bleeding gums, petechiae, poor wound healing).', hint: 'Sailors\' disease.' },
      { question: 'What disease is caused by Vitamin D deficiency?', answer: 'Rickets in children and osteomalacia in adults.', hint: 'Bone mineralization failure.' },
      { question: 'What is the role of iron in nutrition?', answer: 'Essential for hemoglobin synthesis and oxygen transport.', hint: 'Prevents iron-deficiency anemia.' },
      { question: 'What is the role of calcium in the body?', answer: 'Bone and teeth formation, muscle contraction, nerve transmission, and blood clotting.', hint: 'Multiple functions.' },
      { question: 'What is the role of folic acid in pregnancy?', answer: 'Essential for DNA synthesis and cell division; prevents neural tube defects in the fetus.', hint: 'Start before conception.' },
      { question: 'What disease is caused by niacin deficiency?', answer: 'Pellagra (the 4 Ds: Dermatitis, Diarrhea, Dementia, Death).', hint: 'Vitamin B3 deficiency.' },
      { question: 'What disease is caused by thiamine (B1) deficiency?', answer: 'Beriberi (wet: cardiovascular; dry: neurological) and Wernicke-Korsakoff syndrome.', hint: 'Vitamin B1 deficiency.' },
      { question: 'What is the Plate Method for meal planning?', answer: 'Fill half the plate with vegetables, 1/4 with lean protein, and 1/4 with whole grains; used in diabetes and healthy eating.', hint: 'Visual meal planning guide.' },
      { question: 'What is basal metabolic rate (BMR)?', answer: 'The minimum energy required to maintain basic body functions at rest.', hint: 'Resting energy expenditure.' },
      { question: 'What is the carbohydrate-to-calorie percentage in a healthy diet?', answer: '45–65% of total daily calories.', hint: 'AMDR for carbohydrates.' },
      { question: 'What foods are high in Vitamin K to be monitored in warfarin therapy?', answer: 'Green leafy vegetables like spinach, kale, broccoli, and Brussels sprouts.', hint: 'Affects warfarin efficacy.' },
      { question: 'What is the role of phosphorus in the body?', answer: 'Bone and teeth formation, ATP production, and cell membrane structure.', hint: 'Works with calcium.' },
      { question: 'What is zinc\'s role in the body?', answer: 'Wound healing, immune function, protein synthesis, and taste/smell perception.', hint: 'Deficiency causes poor wound healing.' },
      { question: 'What is a tyramine-restricted diet?', answer: 'Avoidance of aged cheeses, fermented foods, and processed meats to prevent hypertensive crisis in patients taking MAO inhibitors.', hint: 'Drug-food interaction.' },
      { question: 'What is the Mediterranean diet?', answer: 'A diet rich in olive oil, fruits, vegetables, whole grains, legumes, fish, and moderate wine; associated with reduced cardiovascular risk.', hint: 'Heart-healthy diet.' },
      { question: 'What is the difference between soluble and insoluble fiber?', answer: 'Soluble fiber dissolves in water, lowers cholesterol and blood glucose; insoluble fiber does not dissolve, promotes bowel regularity.', hint: 'Oats vs. wheat bran.' },
    ]
  },

  'pharmacology': {
    title: 'Drug Administration',
    subject: 'PHARMACOLOGY',
    cards: [
      { question: 'What are the 10 rights of drug administration?', answer: 'Right Patient, Drug, Dose, Route, Time, Documentation, Reason, Response, Refusal, and Education.', hint: 'Safety first.' },
      { question: 'What is pharmacokinetics?', answer: 'The study of how the body processes drugs: Absorption, Distribution, Metabolism, and Excretion (ADME).', hint: 'What the body does to the drug.' },
      { question: 'What is pharmacodynamics?', answer: 'The study of the mechanism of drug action and effects of drugs on the body.', hint: 'What the drug does to the body.' },
      { question: 'What is a drug\'s half-life?', answer: 'The time required for the plasma concentration of a drug to decrease by 50%.', hint: 'T½.' },
      { question: 'What is bioavailability?', answer: 'The fraction of an administered dose of a drug that reaches the systemic circulation unchanged.', hint: 'IV bioavailability = 100%.' },
      { question: 'What is the first-pass effect?', answer: 'Metabolism of an orally administered drug in the liver before it reaches systemic circulation, reducing bioavailability.', hint: 'Hepatic metabolism before circulation.' },
      { question: 'What is a drug receptor?', answer: 'A macromolecule (usually a protein) to which a drug binds to produce its effect.', hint: 'Target molecule.' },
      { question: 'What is an agonist?', answer: 'A drug that binds to and activates a receptor, producing a pharmacological response.', hint: 'Activates receptor.' },
      { question: 'What is an antagonist?', answer: 'A drug that binds to a receptor without activating it, blocking the action of an agonist.', hint: 'Blocks receptor.' },
      { question: 'What is the difference between potency and efficacy?', answer: 'Potency is the amount of drug needed to produce an effect; efficacy is the maximum effect a drug can produce.', hint: 'How much vs. how strong.' },
      { question: 'What is a therapeutic index (TI)?', answer: 'The ratio of the toxic dose (TD50) to the effective dose (ED50); a narrow TI means the drug has a small margin of safety.', hint: 'TI = TD50/ED50.' },
      { question: 'What drugs have a narrow therapeutic index?', answer: 'Digoxin, Warfarin, Phenytoin, Lithium, Theophylline, and Aminoglycosides.', hint: 'Requires close monitoring.' },
      { question: 'What is a loading dose?', answer: 'A larger initial dose given to quickly achieve a therapeutic drug level.', hint: 'Rapid attainment of steady state.' },
      { question: 'What is a maintenance dose?', answer: 'A dose given at regular intervals to maintain the drug at therapeutic levels.', hint: 'Keeps concentration steady.' },
      { question: 'What is tolerance?', answer: 'A decreased response to a drug after repeated administration, requiring higher doses to achieve the same effect.', hint: 'Need more drug for same effect.' },
      { question: 'What is tachyphylaxis?', answer: 'A rapid decrease in response to a drug after just a few doses.', hint: 'Rapid tolerance.' },
      { question: 'What is drug dependence?', answer: 'A state where the body requires a drug for normal functioning; withdrawal symptoms occur upon discontinuation.', hint: 'Physical or psychological.' },
      { question: 'What are adverse drug reactions (ADRs)?', answer: 'Unintended, harmful responses to a drug given at therapeutic doses.', hint: 'Side effects vs. ADRs differ by severity.' },
      { question: 'What is anaphylaxis?', answer: 'A severe, life-threatening allergic reaction characterized by hypotension, bronchospasm, and urticaria.', hint: 'Give epinephrine immediately.' },
      { question: 'What is the antidote for acetaminophen overdose?', answer: 'N-acetylcysteine (NAC).', hint: 'Replenishes glutathione.' },
      { question: 'What is the antidote for opioid overdose?', answer: 'Naloxone (Narcan).', hint: 'Opioid antagonist.' },
      { question: 'What is the antidote for benzodiazepine overdose?', answer: 'Flumazenil.', hint: 'Benzodiazepine antagonist.' },
      { question: 'What is the antidote for heparin overdose?', answer: 'Protamine sulfate.', hint: 'Neutralizes heparin.' },
      { question: 'What is the antidote for warfarin overdose?', answer: 'Vitamin K (phytonadione) and/or Fresh Frozen Plasma (FFP).', hint: 'Reverses anticoagulation.' },
      { question: 'What is the antidote for organophosphate poisoning?', answer: 'Atropine (and pralidoxime for reactivation of cholinesterase).', hint: 'Anticholinergic antidote.' },
      { question: 'What are beta-blockers used for?', answer: 'Hypertension, angina, arrhythmias, heart failure, and migraine prophylaxis.', hint: 'Block beta-adrenergic receptors.' },
      { question: 'What is a contraindication of beta-blockers?', answer: 'Asthma, COPD (non-cardioselective), bradycardia, and AV block.', hint: 'Bronchoconstriction risk.' },
      { question: 'What are ACE inhibitors used for?', answer: 'Hypertension, heart failure, diabetic nephropathy, and post-MI cardioprotection.', hint: 'Block angiotensin-converting enzyme.' },
      { question: 'What is the classic side effect of ACE inhibitors?', answer: 'Dry, persistent cough (due to bradykinin accumulation).', hint: 'ACE inhibitor cough.' },
      { question: 'What is the mechanism of action of diuretics?', answer: 'They increase urine production by reducing sodium and water reabsorption in the kidneys.', hint: 'Kidney salt and water loss.' },
      { question: 'What is a loop diuretic and give an example?', answer: 'A potent diuretic that acts on the thick ascending limb of the loop of Henle. Example: Furosemide (Lasix).', hint: 'Most potent diuretic class.' },
      { question: 'What is the most important side effect of loop diuretics?', answer: 'Hypokalemia (low potassium).', hint: 'Monitor K+ levels.' },
      { question: 'What is digoxin used for?', answer: 'Heart failure and atrial fibrillation; increases cardiac contractility and slows AV conduction.', hint: 'Cardiac glycoside.' },
      { question: 'What are signs of digoxin toxicity?', answer: 'Nausea, vomiting, visual disturbances (yellow/green halos), bradycardia, and arrhythmias.', hint: 'Narrow therapeutic index.' },
      { question: 'What is metformin used for?', answer: 'First-line treatment for type 2 diabetes mellitus; reduces hepatic glucose production.', hint: 'Biguanide class.' },
      { question: 'What is insulin and how is it classified?', answer: 'A hormone used to treat diabetes; classified by onset/duration: Rapid-acting, Short-acting, Intermediate, and Long-acting.', hint: 'Injectable hypoglycemic.' },
      { question: 'What is the peak action time of Regular insulin?', answer: '2–4 hours after injection.', hint: 'Short-acting insulin.' },
      { question: 'What is the duration of action of Glargine (Lantus) insulin?', answer: 'Approximately 20–24 hours (peakless).', hint: 'Long-acting basal insulin.' },
      { question: 'What is the Somogyi effect?', answer: 'Rebound hyperglycemia following nocturnal hypoglycemia; the body releases counterregulatory hormones.', hint: 'Morning high after night low.' },
      { question: 'What is the Dawn Phenomenon?', answer: 'Physiological rise in blood glucose in the early morning hours due to release of growth hormone and cortisol.', hint: 'Morning rise without prior hypoglycemia.' },
      { question: 'What is an antibiotic spectrum?', answer: 'The range of bacteria against which an antibiotic is effective; broad-spectrum targets many types; narrow-spectrum targets specific organisms.', hint: 'Broad vs. narrow coverage.' },
      { question: 'What is the drug of choice for methicillin-resistant S. aureus (MRSA)?', answer: 'Vancomycin.', hint: 'Glycopeptide antibiotic.' },
      { question: 'What is the classic side effect of aminoglycosides?', answer: 'Nephrotoxicity and ototoxicity.', hint: 'Monitor renal function and hearing.' },
      { question: 'What drug interaction should be avoided with MAO inhibitors?', answer: 'Tyramine-rich foods and serotonergic drugs (can cause hypertensive crisis or serotonin syndrome).', hint: 'Dangerous drug-food and drug-drug interaction.' },
      { question: 'What is corticosteroid therapy side effect?', answer: 'Hyperglycemia, immunosuppression, osteoporosis, Cushing\'s syndrome, peptic ulcer, and hypokalemia.', hint: 'Long-term steroid complications.' },
      { question: 'What is the mechanism of NSAIDs?', answer: 'Inhibition of cyclooxygenase (COX) enzymes, reducing prostaglandin synthesis, thereby decreasing pain, fever, and inflammation.', hint: 'COX inhibitors.' },
      { question: 'What is a common GI side effect of NSAIDs?', answer: 'Gastric irritation and peptic ulcer disease.', hint: 'Take with food or PPI.' },
      { question: 'What is the drug of choice for anaphylaxis?', answer: 'Epinephrine (adrenaline) IM into the anterolateral thigh.', hint: '1:1000 concentration.' },
      { question: 'What is the mechanism of action of morphine?', answer: 'Binds to mu (μ), kappa (κ), and delta (δ) opioid receptors to produce analgesia, sedation, and euphoria.', hint: 'Opioid agonist.' },
      { question: 'What are the three classic opioid side effects?', answer: 'Respiratory depression, constipation, and miosis (pinpoint pupils).', hint: 'Triads of opioid toxicity.' },
      { question: 'What is a drug-drug interaction?', answer: 'When two or more drugs interact with each other, altering the effect of one or both drugs (enhanced, reduced, or new effects).', hint: 'Polypharmacy risk.' },
    ]
  },

  'nursing-informatics': {
    title: 'Data and Information',
    subject: 'NURSING INFORMATICS',
    cards: [
      { question: 'What is the DIKW hierarchy?', answer: 'Data, Information, Knowledge, Wisdom.', hint: 'Starts with D.' },
      { question: 'What is nursing informatics?', answer: 'A specialty that integrates nursing science, computer science, and information science to manage and communicate data, information, knowledge, and wisdom.', hint: 'Nursing + IT.' },
      { question: 'What is data in the DIKW model?', answer: 'Raw, unprocessed facts and figures without context.', hint: 'Example: a number alone.' },
      { question: 'What is information in the DIKW model?', answer: 'Data that has been organized and given context to make it meaningful.', hint: 'Data + context.' },
      { question: 'What is knowledge in the DIKW model?', answer: 'Information that has been synthesized with experience and understanding to identify relationships.', hint: 'Understanding patterns.' },
      { question: 'What is wisdom in the DIKW model?', answer: 'The appropriate use of knowledge to make sound decisions and take the best action.', hint: 'Applying knowledge with judgment.' },
      { question: 'What is an Electronic Health Record (EHR)?', answer: 'A digital version of a patient\'s medical chart that is real-time, patient-centered, and accessible to authorized providers.', hint: 'Replaces paper records.' },
      { question: 'What is the difference between EHR and EMR?', answer: 'EMR (Electronic Medical Record) is a digital record from a single provider; EHR is a broader system shared across providers and settings.', hint: 'EHR is interoperable.' },
      { question: 'What is a Clinical Decision Support System (CDSS)?', answer: 'Software that provides clinicians with patient-specific assessments and recommendations to aid clinical decision-making.', hint: 'Alerts, reminders, and guidelines.' },
      { question: 'What is CPOE?', answer: 'Computerized Physician Order Entry — a system that allows clinicians to enter orders (medications, labs) electronically.', hint: 'Reduces medication errors.' },
      { question: 'What is interoperability in health informatics?', answer: 'The ability of different information systems, devices, and applications to access, exchange, integrate, and use data.', hint: 'Systems working together.' },
      { question: 'What is HL7?', answer: 'Health Level Seven — a set of international standards for the transfer of clinical and administrative data between healthcare systems.', hint: 'Healthcare data exchange standard.' },
      { question: 'What is SNOMED CT?', answer: 'Systematized Nomenclature of Medicine Clinical Terms — a comprehensive clinical terminology used in EHR systems.', hint: 'Standardized clinical terms.' },
      { question: 'What is ICD-10?', answer: 'International Classification of Diseases, 10th revision — a system for coding diagnoses and procedures used globally.', hint: 'Diagnosis coding system.' },
      { question: 'What is NANDA-I?', answer: 'North American Nursing Diagnosis Association International — the organization that develops and maintains standardized nursing diagnostic terminology.', hint: 'Nursing diagnosis classifications.' },
      { question: 'What is the NIC?', answer: 'Nursing Interventions Classification — a standardized classification of evidence-based nursing interventions.', hint: 'Classifies nursing actions.' },
      { question: 'What is the NOC?', answer: 'Nursing Outcomes Classification — a standardized classification of patient outcomes sensitive to nursing interventions.', hint: 'Classifies patient outcomes.' },
      { question: 'What is telemedicine/telehealth?', answer: 'The delivery of health care services using technology to connect patients and providers when they are not in the same location.', hint: 'Remote health services.' },
      { question: 'What is m-health (mobile health)?', answer: 'The use of mobile devices (smartphones, tablets, wearables) to support health care and public health practice.', hint: 'Healthcare via mobile devices.' },
      { question: 'What is a firewall in health IT?', answer: 'A network security system that monitors and controls incoming and outgoing traffic based on security rules.', hint: 'IT security barrier.' },
      { question: 'What does HIPAA stand for and what is its relevance to nursing?', answer: 'Health Insurance Portability and Accountability Act — U.S. law protecting patient health information privacy and security; nurses must safeguard PHI.', hint: 'Patient privacy law (U.S.).' },
      { question: 'What is the Data Privacy Act (RA 10173) in the Philippines?', answer: 'A Philippine law protecting personal information, including health data; requires consent for collection and use of personal information.', hint: 'Philippine equivalent of HIPAA.' },
      { question: 'What is protected health information (PHI)?', answer: 'Any individually identifiable health information that is created, received, or maintained by a covered entity.', hint: 'Private patient data.' },
      { question: 'What is a health information system (HIS)?', answer: 'An integrated system designed to manage health care data, including patient records, billing, and scheduling.', hint: 'Manages healthcare data.' },
      { question: 'What is a patient portal?', answer: 'A secure online website that gives patients 24-hour access to their personal health information, lab results, and communication with providers.', hint: 'Patient self-access to records.' },
      { question: 'What is artificial intelligence (AI) in nursing?', answer: 'The use of machine learning and algorithms to assist in clinical decision-making, diagnosis, patient monitoring, and administrative tasks.', hint: 'Smart computer systems in care.' },
      { question: 'What is big data in healthcare?', answer: 'Large volumes of structured and unstructured healthcare data that can be analyzed for patterns, trends, and outcomes improvement.', hint: 'Healthcare analytics.' },
      { question: 'What is a barcode medication administration (BCMA) system?', answer: 'A technology that scans barcodes on medications and patient wristbands to verify the 5 rights before administration.', hint: 'Reduces medication errors.' },
      { question: 'What is a simulation in nursing education?', answer: 'The use of realistic scenarios, mannequins, or virtual environments to teach and evaluate clinical skills without patient risk.', hint: 'Safe practice environment.' },
      { question: 'What is nursing informatics competency?', answer: 'The ability of nurses to use information technology, manage data, and apply informatics in clinical practice.', hint: 'Informatics knowledge + skills.' },
      { question: 'What is an alert fatigue?', answer: 'A phenomenon where clinicians become desensitized to system alerts due to excessive or irrelevant warnings, leading to ignoring important ones.', hint: 'Too many alerts cause disengagement.' },
      { question: 'What is a nursing minimum data set (NMDS)?', answer: 'A standardized set of nursing data elements collected for measuring nursing practice and patient outcomes.', hint: 'Minimum essential data.' },
      { question: 'What is the significance of SNOMED vs. ICD in nursing?', answer: 'SNOMED is used for clinical documentation; ICD is used for billing and epidemiological coding.', hint: 'Clinical vs. administrative coding.' },
      { question: 'What is the cloud in healthcare IT?', answer: 'Remote servers accessed via the internet to store, manage, and process healthcare data instead of local servers.', hint: 'Off-site data storage.' },
      { question: 'What is cybersecurity in nursing?', answer: 'Measures and practices to protect electronic health information from unauthorized access, breaches, and cyberattacks.', hint: 'Protects digital health data.' },
      { question: 'What is informatics literacy?', answer: 'The ability to identify, locate, evaluate, and effectively use information, including digital and computer-based information.', hint: 'Information skills.' },
      { question: 'What is the role of nursing informatics specialists?', answer: 'They bridge nursing practice and IT to design, implement, and evaluate information systems supporting nursing care.', hint: 'Nursing + IT bridge.' },
      { question: 'What is a data breach?', answer: 'Unauthorized access to or disclosure of protected health information.', hint: 'Security incident.' },
      { question: 'What is usability in health IT systems?', answer: 'How easily and efficiently users can interact with a system; poor usability can lead to errors and workflow disruption.', hint: 'User-friendly design.' },
      { question: 'What is the significance of standardized nursing languages?', answer: 'They enable consistent documentation, data comparison, research, and communication of nursing care across settings.', hint: 'NANDA, NIC, NOC.' },
      { question: 'What is an information overload in nursing?', answer: 'When the volume of information exceeds the nurse\'s ability to process it, leading to poor decision-making.', hint: 'Data excess problem.' },
      { question: 'What is the purpose of clinical documentation?', answer: 'To provide a legal record of care, ensure communication among providers, support continuity of care, and enable quality monitoring.', hint: 'Communication and legal record.' },
      { question: 'What is a PACS system?', answer: 'Picture Archiving and Communication System — stores, retrieves, and distributes medical images (X-rays, CT scans) digitally.', hint: 'Digital radiology system.' },
      { question: 'What is data integrity?', answer: 'The accuracy, consistency, and reliability of data throughout its lifecycle.', hint: 'Data quality.' },
      { question: 'What is workflow analysis in informatics?', answer: 'The study of existing processes to identify inefficiencies before implementing or improving health IT systems.', hint: 'Understand before automating.' },
      { question: 'What is GPS/location technology used for in health care?', answer: 'Real-time location tracking of patients, staff, and equipment in hospitals.', hint: 'Asset and patient tracking.' },
      { question: 'What is IoT (Internet of Things) in healthcare?', answer: 'Network-connected medical devices (e.g., smart monitors, insulin pumps) that collect and transmit health data in real time.', hint: 'Connected medical devices.' },
      { question: 'What is the role of a nurse informaticist in EHR implementation?', answer: 'To assess clinical workflow, train staff, customize the system to meet nursing needs, and evaluate post-implementation outcomes.', hint: 'EHR champion.' },
      { question: 'What is system downtime in healthcare?', answer: 'Periods when electronic systems are unavailable; nurses must have downtime procedures (paper backups) to ensure safe patient care.', hint: 'Backup planning needed.' },
      { question: 'What is meaningful use in health informatics?', answer: 'A set of standards for EHR use to improve quality, safety, and efficiency; incentivized by the U.S. government under the HITECH Act.', hint: 'EHR incentive standard.' },
    ]
  },

  // =========================================================
  // LEVEL 3
  // =========================================================

  'care-of-older-adult': {
    title: 'Gerontology',
    subject: 'CARE OF OLDER ADULT',
    cards: [
      { question: 'What is Presbyopia?', answer: 'Age-related loss of the eye\'s ability to focus on nearby objects.', hint: 'Vision changes.' },
      { question: 'What is presbycusis?', answer: 'Age-related progressive sensorineural hearing loss, especially for high-frequency sounds.', hint: 'Age-related hearing loss.' },
      { question: 'What is the definition of gerontology?', answer: 'The scientific study of the biological, psychological, and social aspects of aging.', hint: 'Study of aging.' },
      { question: 'What is geriatrics?', answer: 'The branch of medicine that focuses on the health care of elderly people.', hint: 'Medical care of the elderly.' },
      { question: 'What age is typically considered the beginning of "old age"?', answer: '65 years and older.', hint: 'Conventional cutoff.' },
      { question: 'What are the subcategories of older adults?', answer: 'Young-old (65–74), Middle-old (75–84), Old-old or frail elderly (85+).', hint: 'Three subgroups.' },
      { question: 'What is the leading cause of death in the elderly in the Philippines?', answer: 'Cardiovascular diseases, followed by pneumonia and cerebrovascular diseases.', hint: 'Chronic disease.' },
      { question: 'What is sarcopenia?', answer: 'Age-related progressive loss of skeletal muscle mass and strength.', hint: 'Muscle wasting with age.' },
      { question: 'What is osteoporosis?', answer: 'Decreased bone density and increased fracture risk, especially in postmenopausal women.', hint: 'Silent disease until fracture.' },
      { question: 'What is the most common type of fracture in osteoporosis?', answer: 'Hip fracture (proximal femur fracture).', hint: 'Leading cause of morbidity in elderly.' },
      { question: 'What is the DEXA scan used for?', answer: 'Measuring bone mineral density (BMD) to diagnose osteoporosis.', hint: 'Gold standard for bone density.' },
      { question: 'What is delirium?', answer: 'An acute, reversible state of confusion with fluctuating consciousness, disorientation, and cognitive impairment.', hint: 'Acute onset; reversible.' },
      { question: 'What is dementia?', answer: 'A chronic, progressive decline in cognitive function (memory, language, problem-solving) severe enough to interfere with daily activities.', hint: 'Chronic; not reversible.' },
      { question: 'What is the difference between delirium and dementia?', answer: 'Delirium is acute, reversible, and has a fluctuating course; dementia is chronic, irreversible, and progressive.', hint: 'Onset and reversibility differ.' },
      { question: 'What is the most common form of dementia?', answer: "Alzheimer's disease (accounts for 60–80% of dementia cases).", hint: 'Most prevalent.' },
      { question: "What is the hallmark pathological feature of Alzheimer's disease?", answer: 'Amyloid plaques and neurofibrillary tangles (tau protein) in the brain.', hint: 'Brain changes.' },
      { question: "What are the early signs of Alzheimer's disease?", answer: 'Short-term memory loss, difficulty with familiar tasks, language problems, and disorientation.', hint: 'Memory is first affected.' },
      { question: 'What is sundowning?', answer: 'Increased confusion and behavioral disturbances in dementia patients in the late afternoon and evening.', hint: 'Late-day confusion.' },
      { question: 'What is the Geriatric Depression Scale (GDS)?', answer: 'A self-report questionnaire used to screen for depression in older adults; 15 or 30-item version.', hint: 'Elderly depression screening.' },
      { question: 'What is the MMSE (Mini-Mental State Examination) cutoff for cognitive impairment?', answer: 'A score of 23 or below (out of 30) suggests cognitive impairment.', hint: 'Dementia screening tool.' },
      { question: 'What are the physiological changes in the cardiovascular system with aging?', answer: 'Decreased cardiac output, increased arterial stiffness, slower heart rate response to stress.', hint: 'Structural and functional decline.' },
      { question: 'What are the respiratory changes with aging?', answer: 'Decreased lung elasticity, reduced vital capacity, less effective cough reflex, and increased risk of aspiration.', hint: 'Reduced respiratory reserve.' },
      { question: 'What GI changes occur with aging?', answer: 'Decreased gastric acid secretion, slowed GI motility, constipation, and reduced absorption of some nutrients.', hint: 'Slower and less efficient.' },
      { question: 'What renal changes occur with aging?', answer: 'Decreased GFR, reduced drug clearance, less ability to concentrate urine, and increased risk of dehydration.', hint: 'Reduced kidney function.' },
      { question: 'What integumentary (skin) changes occur with aging?', answer: 'Thinning, dryness, loss of elasticity, decreased subcutaneous fat, slower wound healing, and increased bruising.', hint: 'Fragile aging skin.' },
      { question: 'What is polypharmacy?', answer: 'The concurrent use of 5 or more medications, which increases the risk of drug interactions, adverse effects, and non-adherence.', hint: 'Multiple medications problem.' },
      { question: 'What is the Beers Criteria?', answer: 'A list of potentially inappropriate medications for older adults due to increased risk of adverse effects.', hint: 'American Geriatrics Society list.' },
      { question: 'What is the Timed Up and Go (TUG) test?', answer: 'A test measuring functional mobility and fall risk; measures the time to rise from a chair, walk 3 meters, return, and sit.', hint: 'Fall risk assessment.' },
      { question: 'What is the Morse Fall Scale?', answer: 'A tool assessing fall risk in hospitalized patients, scoring history of falls, secondary diagnosis, ambulatory aid, IV therapy, gait, and cognitive status.', hint: '6-factor fall risk tool.' },
      { question: 'What is the most common cause of preventable injury in the elderly?', answer: 'Falls.', hint: 'Leading cause of injury in elderly.' },
      { question: 'What is functional incontinence?', answer: 'Urinary incontinence due to physical or cognitive impairment rather than a urinary system problem.', hint: 'Cannot reach the toilet in time.' },
      { question: 'What is urge incontinence?', answer: 'A sudden, intense urge to urinate followed by involuntary loss of urine (overactive bladder).', hint: 'Urgency type.' },
      { question: 'What is stress incontinence?', answer: 'Leakage of urine with increased intra-abdominal pressure (coughing, sneezing, exercise).', hint: 'Weak pelvic floor.' },
      { question: 'What is the role of the nurse in elder abuse prevention?', answer: 'Screening, recognizing signs of abuse (unexplained injuries, fear, financial inconsistencies), mandatory reporting, and advocacy.', hint: 'Assess, report, protect.' },
      { question: 'What are the types of elder abuse?', answer: 'Physical, emotional/psychological, sexual, financial, and neglect.', hint: 'Five types.' },
      { question: 'What is the SPICES tool in geriatric nursing?', answer: 'Sleep disorders, Problems with eating/feeding, Incontinence, Confusion, Evidence of falls, Skin breakdown — a tool to screen for common geriatric conditions.', hint: 'Geriatric assessment acronym.' },
      { question: 'What is Katz Index of Independence in ADLs?', answer: 'A tool assessing independence in 6 activities of daily living: bathing, dressing, toileting, transferring, continence, and feeding.', hint: 'ADL independence scale.' },
      { question: 'What is the Lawton-Brody IADL scale?', answer: 'Assesses instrumental activities of daily living: telephone use, shopping, cooking, housekeeping, laundry, transportation, medications, and finances.', hint: 'Higher-level ADLs.' },
      { question: 'What is the difference between ADLs and IADLs?', answer: 'ADLs are basic self-care activities; IADLs are complex activities needed for independent living.', hint: 'Basic vs. instrumental.' },
      { question: 'What is the social disengagement theory of aging?', answer: 'The theory that aging involves a mutual withdrawal between the individual and society.', hint: 'Cumming and Henry, 1961.' },
      { question: 'What is the activity theory of aging?', answer: 'The theory that older adults who remain active and engaged maintain higher life satisfaction.', hint: 'Stay active, stay happy.' },
      { question: 'What is the continuity theory of aging?', answer: 'The theory that older adults adapt to aging by maintaining their existing personality, activities, and relationships.', hint: 'Maintain patterns over time.' },
      { question: 'What is palliative care?', answer: 'Specialized medical care focused on relief from pain, symptoms, and stress of a serious illness, aimed at improving quality of life.', hint: 'Comfort-focused care.' },
      { question: 'What is hospice care?', answer: 'A type of palliative care for those with a terminal illness and a life expectancy of 6 months or less, focusing on comfort rather than curative treatment.', hint: 'End-of-life comfort care.' },
      { question: 'What is the purpose of an advance directive?', answer: 'A legal document specifying a person\'s wishes for medical care if they become unable to communicate decisions.', hint: 'Living will or healthcare proxy.' },
      { question: 'What is a do-not-resuscitate (DNR) order?', answer: 'A physician\'s order instructing healthcare providers not to perform CPR in the event of cardiac or respiratory arrest.', hint: 'Patient autonomy in end-of-life care.' },
      { question: 'What is the phenomenon of "failure to thrive" in elderly patients?', answer: 'A syndrome of weight loss, decreased appetite, poor nutrition, and inactivity in older adults, often without specific medical cause.', hint: 'Geriatric decline syndrome.' },
      { question: 'What is age-related macular degeneration (AMD)?', answer: 'A deterioration of the macula (central retina) leading to central vision loss; most common cause of blindness in elderly.', hint: 'Central vision loss.' },
      { question: 'What is glaucoma?', answer: 'A group of eye conditions with increased intraocular pressure damaging the optic nerve, leading to peripheral vision loss.', hint: 'Silent blindness.' },
      { question: 'What is the significance of pain assessment in elderly patients?', answer: 'The elderly may underreport pain due to cognitive changes, fear of opioids, or cultural factors; use visual or observational pain scales.', hint: 'Pain often undertreated.' },
      { question: 'What is the Comprehensive Geriatric Assessment (CGA)?', answer: 'A multidimensional evaluation of an older person\'s medical, functional, cognitive, and psychosocial status to develop an integrated care plan.', hint: 'Holistic elderly assessment.' },
    ]
  },

  'nursing-research-1': {
    title: 'Research Methodology',
    subject: 'NURSING RESEARCH 1',
    cards: [
      { question: 'What is a Hypothesis?', answer: 'A tentative explanation or prediction of the relationship between variables.', hint: 'An educated guess.' },
      { question: 'What is nursing research?', answer: 'Systematic inquiry using scientific methods to generate evidence for nursing practice, education, and administration.', hint: 'Evidence base for nursing.' },
      { question: 'What is the purpose of nursing research?', answer: 'To improve patient care, advance the nursing profession, and develop evidence-based practice.', hint: 'Better care through evidence.' },
      { question: 'What is quantitative research?', answer: 'Research using numerical data, measurement, and statistical analysis to test hypotheses and establish causal relationships.', hint: 'Numbers and statistics.' },
      { question: 'What is qualitative research?', answer: 'Research using non-numerical data (words, themes, experiences) to explore meanings, perceptions, and phenomena.', hint: 'Words and experiences.' },
      { question: 'What is mixed-methods research?', answer: 'Research that combines both quantitative and qualitative approaches within a single study.', hint: 'Both approaches.' },
      { question: 'What is evidence-based practice (EBP)?', answer: 'Integration of the best available research evidence with clinical expertise and patient preferences to guide clinical decisions.', hint: 'Research + clinical expertise + patient values.' },
      { question: 'What are the steps of the research process?', answer: 'Identify problem, review literature, formulate hypothesis, design study, collect data, analyze data, interpret results, and disseminate findings.', hint: '8 steps.' },
      { question: 'What is a research problem?', answer: 'A gap in knowledge that the researcher aims to address through systematic investigation.', hint: 'What we do not yet know.' },
      { question: 'What is an independent variable?', answer: 'The variable that is manipulated or controlled by the researcher; the presumed cause.', hint: 'Cause variable.' },
      { question: 'What is a dependent variable?', answer: 'The variable that is observed and measured; the presumed effect.', hint: 'Outcome variable.' },
      { question: 'What is an extraneous variable?', answer: 'A variable other than the independent variable that may influence the dependent variable and must be controlled.', hint: 'Confounding variable.' },
      { question: 'What is a null hypothesis (H0)?', answer: 'States that there is no significant relationship or difference between variables.', hint: 'No relationship.' },
      { question: 'What is an alternative hypothesis (H1)?', answer: 'States that there is a significant relationship or difference between variables.', hint: 'There IS a relationship.' },
      { question: 'What is a literature review?', answer: 'A systematic, comprehensive examination and synthesis of existing research and publications related to the research topic.', hint: 'Review of existing studies.' },
      { question: 'What is a conceptual framework?', answer: 'A set of interrelated concepts that form the theoretical foundation of a study.', hint: 'Theoretical basis.' },
      { question: 'What is sampling?', answer: 'The process of selecting a subset (sample) from the larger population to participate in the research study.', hint: 'Who is studied.' },
      { question: 'What is a probability sampling method?', answer: 'A sampling method where every member of the population has an equal and known chance of being selected.', hint: 'Random selection.' },
      { question: 'What is simple random sampling?', answer: 'Each member of the population is equally likely to be selected, using a random mechanism like a lottery or random number table.', hint: 'Most basic probability sample.' },
      { question: 'What is stratified random sampling?', answer: 'The population is divided into subgroups (strata) and random samples are drawn from each stratum.', hint: 'Proportional representation.' },
      { question: 'What is convenience sampling?', answer: 'Selecting participants who are readily available; a non-probability method that may introduce bias.', hint: 'Easy to access.' },
      { question: 'What is purposive sampling?', answer: 'Deliberately selecting participants based on specific characteristics relevant to the research question.', hint: 'Intentional selection.' },
      { question: 'What is snowball sampling?', answer: 'Existing participants recruit future participants; used for hard-to-reach populations.', hint: 'Chain referral.' },
      { question: 'What is a randomized controlled trial (RCT)?', answer: 'An experimental study in which participants are randomly assigned to experimental or control groups to test an intervention.', hint: 'Gold standard of research.' },
      { question: 'What is a cohort study?', answer: 'A longitudinal observational study following a group of people over time to identify factors related to health outcomes.', hint: 'Prospective follow-up study.' },
      { question: 'What is a case-control study?', answer: 'A retrospective study comparing individuals with a condition (cases) to those without (controls) to identify risk factors.', hint: 'Retrospective; from outcome to cause.' },
      { question: 'What is a cross-sectional study?', answer: 'A study that measures variables in a population at a single point in time.', hint: 'Snapshot study.' },
      { question: 'What is validity in research?', answer: 'The degree to which a study measures what it is intended to measure.', hint: 'Accuracy.' },
      { question: 'What is reliability in research?', answer: 'The consistency of a measurement tool to produce the same results under the same conditions.', hint: 'Consistency/repeatability.' },
      { question: 'What is internal validity?', answer: 'The degree to which the study design controls for extraneous variables and accurately establishes a cause-and-effect relationship.', hint: 'Causal accuracy.' },
      { question: 'What is external validity?', answer: 'The degree to which the study results can be generalized to other populations and settings.', hint: 'Generalizability.' },
      { question: 'What is informed consent in research?', answer: 'A process by which a study participant voluntarily agrees to participate after being fully informed of the study\'s purpose, risks, and benefits.', hint: 'Ethical requirement.' },
      { question: 'What are the three principles of the Belmont Report?', answer: 'Respect for Persons (autonomy), Beneficence (do good/minimize harm), and Justice (fair selection and distribution).', hint: 'Ethical principles in research.' },
      { question: 'What is an Institutional Review Board (IRB)?', answer: 'A committee that reviews and approves research involving human subjects to ensure ethical standards are met.', hint: 'Research ethics committee.' },
      { question: 'What is a pilot study?', answer: 'A small-scale preliminary study conducted before the main study to test the feasibility of methods and tools.', hint: 'Feasibility test.' },
      { question: 'What is data saturation in qualitative research?', answer: 'The point at which no new information or themes emerge from additional data collection.', hint: 'Enough data collected.' },
      { question: 'What is grounded theory?', answer: 'A qualitative method where theory is developed inductively from data gathered in the field rather than tested from pre-existing theories.', hint: 'Theory emerges from data.' },
      { question: 'What is phenomenology?', answer: 'A qualitative method that explores the lived experiences of individuals regarding a specific phenomenon.', hint: 'Lived experience.' },
      { question: 'What is ethnography?', answer: 'A qualitative method that studies the culture and behavior of a group within their natural environment.', hint: 'Cultural group study.' },
      { question: 'What is a systematic review?', answer: 'A comprehensive, structured review of all available research on a specific question using rigorous methodology to synthesize evidence.', hint: 'Highest level of evidence review.' },
      { question: 'What is a meta-analysis?', answer: 'A statistical technique that combines the results of multiple studies on the same topic to produce a stronger conclusion.', hint: 'Pooling of study results.' },
      { question: 'What is the hierarchy of evidence (levels of evidence)?', answer: 'From highest to lowest: Systematic review/meta-analysis > RCT > Cohort study > Case-control > Descriptive/Cross-sectional > Expert opinion.', hint: 'Evidence pyramid.' },
      { question: 'What is a Type I error in research?', answer: 'Rejecting a true null hypothesis (false positive); accepting that a relationship exists when it does not.', hint: 'False positive.' },
      { question: 'What is a Type II error in research?', answer: 'Failing to reject a false null hypothesis (false negative); missing a true relationship.', hint: 'False negative.' },
      { question: 'What is the p-value?', answer: 'The probability of obtaining results as extreme as observed, assuming the null hypothesis is true; p < 0.05 is typically significant.', hint: 'Statistical significance indicator.' },
      { question: 'What is a confidence interval (CI)?', answer: 'A range of values within which the true population parameter is likely to fall with a specified level of confidence (e.g., 95% CI).', hint: 'Range around the estimate.' },
      { question: 'What is a survey/questionnaire in research?', answer: 'A data collection instrument with standardized questions administered to study participants.', hint: 'Common self-report tool.' },
      { question: 'What is an interview as a research method?', answer: 'A data collection technique involving verbal questioning of participants; may be structured, semi-structured, or unstructured.', hint: 'Verbal data collection.' },
      { question: 'What is observation as a data collection method?', answer: 'Systematically watching and recording behavior or events in their natural setting.', hint: 'Watching behavior.' },
      { question: 'What is the PICO format?', answer: 'A framework for formulating clinical questions: Patient/Population, Intervention, Comparison, and Outcome.', hint: 'EBP question framework.' },
      { question: 'What is plagiarism in research?', answer: 'Using another person\'s ideas, words, or work without proper attribution; a serious research ethics violation.', hint: 'Intellectual theft.' },
    ]
  },

  'care-of-clients-with-problems-in-oxygenation-fluid-and-electrolyte-infectious-inflammatory-and-immunologic-response-cellular-aberration-acute-and-chronic': {
    title: 'Medical Surgical Nursing',
    subject: 'MS NURSING (NP13)',
    cards: [
      { question: 'What is the primary sign of hypoxemia?', answer: 'Restlessness and agitation.', hint: 'Early brain response to low O2.' },
      { question: 'What is the difference between hypoxia and hypoxemia?', answer: 'Hypoxemia is low oxygen in the blood (low PaO2); hypoxia is insufficient oxygen delivery to tissues.', hint: 'Blood vs. tissue oxygen.' },
      { question: 'What is ARDS (Acute Respiratory Distress Syndrome)?', answer: 'A severe form of acute lung injury with diffuse alveolar damage, hypoxemia refractory to O2 therapy, and bilateral pulmonary infiltrates.', hint: 'Life-threatening lung failure.' },
      { question: 'What is the Berlin definition criterion for ARDS?', answer: 'PaO2/FiO2 ratio < 300 mmHg; bilateral opacities on chest imaging; not fully explained by cardiac failure.', hint: 'P/F ratio < 300.' },
      { question: 'What is atelectasis?', answer: 'Collapse or incomplete expansion of the lung or a lung segment, reducing gas exchange.', hint: 'Lung collapse.' },
      { question: 'What is pneumothorax?', answer: 'Accumulation of air in the pleural space, causing lung collapse.', hint: 'Air in pleural space.' },
      { question: 'What is a tension pneumothorax?', answer: 'Life-threatening accumulation of air under pressure in the pleural space, causing mediastinal shift and cardiovascular compromise.', hint: 'Tracheal deviation, absent breath sounds.' },
      { question: 'What is the first action for a suspected tension pneumothorax?', answer: 'Immediate needle decompression at the 2nd intercostal space, midclavicular line.', hint: 'Emergency decompression.' },
      { question: 'What is hemothorax?', answer: 'Accumulation of blood in the pleural space, usually from trauma.', hint: 'Blood in pleural space.' },
      { question: 'What is the nursing management for a chest tube?', answer: 'Maintain tube patency, monitor drainage, keep the drainage system below chest level, observe for air leaks, and never clamp without an order.', hint: 'Chest tube care.' },
      { question: 'What is pulmonary embolism (PE)?', answer: 'Blockage of a pulmonary artery (usually by a blood clot) causing impaired gas exchange and right heart strain.', hint: 'Sudden dyspnea, pleuritic chest pain.' },
      { question: 'What is the Virchow\'s triad?', answer: 'Three factors predisposing to thrombosis: blood stasis, endothelial injury, and hypercoagulability.', hint: 'DVT/PE risk factors.' },
      { question: 'What is the ABG (arterial blood gas) interpretation for respiratory acidosis?', answer: 'pH < 7.35, PaCO2 > 45 mmHg; caused by hypoventilation (CO2 retention).', hint: 'Low pH, high CO2.' },
      { question: 'What is the ABG for metabolic acidosis?', answer: 'pH < 7.35, HCO3 < 22 mEq/L; caused by excess acids or loss of bicarbonate (e.g., DKA, diarrhea).', hint: 'Low pH, low HCO3.' },
      { question: 'What is the ABG for respiratory alkalosis?', answer: 'pH > 7.45, PaCO2 < 35 mmHg; caused by hyperventilation.', hint: 'High pH, low CO2.' },
      { question: 'What is the ABG for metabolic alkalosis?', answer: 'pH > 7.45, HCO3 > 26 mEq/L; caused by excess base or acid loss (e.g., vomiting, diuretics).', hint: 'High pH, high HCO3.' },
      { question: 'What is the normal pH of arterial blood?', answer: '7.35 to 7.45.', hint: 'Slightly alkaline.' },
      { question: 'What is the normal PaO2?', answer: '80 to 100 mmHg.', hint: 'Arterial oxygen partial pressure.' },
      { question: 'What is the normal PaCO2?', answer: '35 to 45 mmHg.', hint: 'Arterial carbon dioxide partial pressure.' },
      { question: 'What is the normal HCO3?', answer: '22 to 26 mEq/L.', hint: 'Bicarbonate (metabolic component).' },
      { question: 'What is heart failure?', answer: 'A clinical syndrome where the heart cannot pump sufficient blood to meet the body\'s metabolic demands.', hint: 'Pump failure.' },
      { question: 'What is the difference between left-sided and right-sided heart failure?', answer: 'Left-sided: pulmonary congestion (dyspnea, crackles, pulmonary edema). Right-sided: systemic congestion (peripheral edema, JVD, ascites).', hint: 'Lung vs. systemic congestion.' },
      { question: 'What is acute coronary syndrome (ACS)?', answer: 'A spectrum of conditions caused by sudden reduced blood flow to the heart: unstable angina, NSTEMI, and STEMI.', hint: 'Coronary artery occlusion.' },
      { question: 'What is the classic presentation of MI?', answer: 'Crushing chest pain, radiating to the left arm or jaw, with diaphoresis, nausea, and shortness of breath.', hint: 'Heart attack symptoms.' },
      { question: 'What are the nursing priorities for a patient having an MI?', answer: 'MONA: Morphine, Oxygen, Nitroglycerine, Aspirin; plus rapid transport for reperfusion therapy.', hint: 'MONA.' },
      { question: 'What is DKA (Diabetic Ketoacidosis)?', answer: 'A life-threatening complication of diabetes (usually Type 1) characterized by hyperglycemia, metabolic acidosis, and ketonemia.', hint: '3 Hs: Hyperglycemia, acidosis, ketonemia.' },
      { question: 'What is HHNS (Hyperosmolar Hyperglycemic Non-ketotic Syndrome)?', answer: 'A serious complication of Type 2 diabetes with extreme hyperglycemia, hyperosmolarity, severe dehydration, but no ketoacidosis.', hint: 'Very high glucose, no ketones.' },
      { question: 'What is hyponatremia?', answer: 'A serum sodium level < 135 mEq/L; caused by excess water relative to sodium.', hint: 'Na < 135.' },
      { question: 'What is hypernatremia?', answer: 'A serum sodium level > 145 mEq/L; caused by dehydration or excess sodium intake.', hint: 'Na > 145.' },
      { question: 'What is hypokalemia?', answer: 'A serum potassium level < 3.5 mEq/L; causes muscle weakness, cardiac arrhythmias, and abdominal distension.', hint: 'K < 3.5.' },
      { question: 'What is hyperkalemia?', answer: 'A serum potassium level > 5.0 mEq/L; causes peaked T waves, bradycardia, and potentially fatal arrhythmias.', hint: 'K > 5.0.' },
      { question: 'What is the ECG finding in hyperkalemia?', answer: 'Peaked T waves, widened QRS, prolonged PR, and eventually sine wave pattern.', hint: 'Peaked T waves are early sign.' },
      { question: 'What is sepsis?', answer: 'Life-threatening organ dysfunction caused by a dysregulated host response to infection.', hint: 'qSOFA or SOFA criteria.' },
      { question: 'What is septic shock?', answer: 'A subset of sepsis with persistent hypotension despite fluid resuscitation, requiring vasopressors to maintain MAP ≥ 65 mmHg.', hint: 'Sepsis + refractory hypotension.' },
      { question: 'What is the Surviving Sepsis Campaign "Hour-1 Bundle"?', answer: 'Measure lactate, obtain blood cultures, give broad-spectrum antibiotics, start IV fluids (30 mL/kg), and apply vasopressors if hypotensive.', hint: 'Sepsis 1-hour bundle.' },
      { question: 'What is systemic inflammatory response syndrome (SIRS)?', answer: 'An inflammatory response to a variety of insults (infection, trauma, burns) characterized by fever/hypothermia, tachycardia, tachypnea, and abnormal WBC.', hint: '2 of 4 SIRS criteria.' },
      { question: 'What is shock?', answer: 'A life-threatening state of inadequate tissue perfusion and oxygen delivery to meet metabolic demands.', hint: 'Inadequate perfusion.' },
      { question: 'What are the four types of shock?', answer: 'Hypovolemic, Distributive (septic, anaphylactic, neurogenic), Cardiogenic, and Obstructive.', hint: 'HDCO.' },
      { question: 'What is the treatment of anaphylactic shock?', answer: 'Epinephrine IM, supine position with legs elevated, IV fluids, antihistamines, and corticosteroids.', hint: 'Epinephrine is first-line.' },
      { question: 'What is cancer?', answer: 'A disease characterized by uncontrolled cell proliferation, invasion of adjacent tissues, and potential metastasis.', hint: 'Abnormal cell growth.' },
      { question: 'What are the warning signs of cancer (CAUTION)?', answer: 'Change in bowel/bladder habits, A sore that does not heal, Unusual bleeding, Thickening or lump, Indigestion, Obvious change in wart/mole, Nagging cough/hoarseness.', hint: 'CAUTION mnemonic.' },
      { question: 'What is the TNM classification of tumors?', answer: 'T = Tumor size; N = Lymph Node involvement; M = Metastasis.', hint: 'Staging system.' },
      { question: 'What is the mechanism of action of chemotherapy?', answer: 'Kills rapidly dividing cells by interfering with DNA synthesis, replication, or cell division.', hint: 'Targets cell division.' },
      { question: 'What are common side effects of chemotherapy?', answer: 'Nausea and vomiting, alopecia (hair loss), myelosuppression (bone marrow suppression), mucositis, and fatigue.', hint: 'Cytotoxic side effects.' },
      { question: 'What is myelosuppression?', answer: 'Depression of bone marrow activity resulting in reduced blood cell production (anemia, leukopenia, thrombocytopenia).', hint: 'Bone marrow suppression.' },
      { question: 'What is neutropenia?', answer: 'Absolute neutrophil count < 1,500/mm³; severely increases risk of infection.', hint: 'Low neutrophils.' },
      { question: 'What is the nadir in chemotherapy?', answer: 'The point of lowest blood cell counts (usually 7–10 days after chemotherapy), representing the highest risk for infection.', hint: 'Lowest blood count point.' },
      { question: 'What is the difference between acute and chronic inflammation?', answer: 'Acute inflammation is rapid onset (hours to days) with vascular and cellular responses; chronic inflammation is prolonged (weeks to years) with tissue destruction and repair.', hint: 'Duration and cellular response differ.' },
      { question: 'What are the cardinal signs of inflammation?', answer: 'Rubor (redness), Calor (heat), Tumor (swelling), Dolor (pain), and Functio laesa (loss of function).', hint: 'RCTDF.' },
      { question: 'What is the complement system?', answer: 'A part of the innate immune system consisting of plasma proteins that enhance opsonization, chemotaxis, and lysis of pathogens.', hint: 'Enhances antibody activity.' },
    ]
  },

  // =========================================================
  // LEVEL 4
  // =========================================================

  'nursing-competency-appraisal': {
    title: 'Board Exam Prep',
    subject: 'NURSING COMPETENCY APPRAISAL',
    cards: [
      { question: 'What is the priority in emergency triage?', answer: 'Airway, Breathing, and Circulation.', hint: 'ABC.' },
      { question: 'What is the START triage system?', answer: 'Simple Triage and Rapid Treatment — a 4-color system: Black (expectant), Red (immediate), Yellow (delayed), Green (minor).', hint: 'Mass casualty triage.' },
      { question: 'What does RICE stand for in acute musculoskeletal injury management?', answer: 'Rest, Ice, Compression, Elevation.', hint: 'Sprain/strain management.' },
      { question: 'What is the Glasgow Coma Scale maximum score?', answer: '15 (E4 V5 M6).', hint: 'Best possible score.' },
      { question: 'What are the 12 cranial nerves?', answer: 'Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear, Glossopharyngeal, Vagus, Accessory, Hypoglossal.', hint: 'Oh Oh Oh To Touch And Feel Very Good Velvet — Ah Heaven.' },
      { question: 'What is Cushing\'s triad?', answer: 'Hypertension, bradycardia, and irregular respirations — indicates increased intracranial pressure.', hint: 'ICP emergency sign.' },
      { question: 'What is the Monro-Kellie doctrine?', answer: 'The total volume of brain, CSF, and blood in the skull is constant; an increase in one component must be compensated by a decrease in another.', hint: 'ICP physiology.' },
      { question: 'What are the classic signs of meningitis?', answer: 'Fever, severe headache, nuchal rigidity (stiff neck), photophobia, and petechial rash (in meningococcal disease).', hint: 'Meningismus triad + rash.' },
      { question: 'What is Kernig\'s sign?', answer: 'Inability to fully extend the knee when the hip is flexed at 90° — positive in meningitis.', hint: 'Meningitis sign.' },
      { question: 'What is Brudzinski\'s sign?', answer: 'Involuntary flexion of the knees and hips when the neck is flexed — positive in meningitis.', hint: 'Meningitis sign.' },
      { question: 'What is stroke?', answer: 'Sudden interruption of blood flow to the brain; ischemic (blockage) or hemorrhagic (bleeding).', hint: 'Brain attack.' },
      { question: 'What is the FAST mnemonic for stroke?', answer: 'Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.', hint: 'Stroke recognition.' },
      { question: 'What is the "golden hour" for ischemic stroke thrombolysis?', answer: 'tPA (alteplase) must be given within 3–4.5 hours of symptom onset.', hint: 'Time-sensitive intervention.' },
      { question: 'What is the most common cause of increased ICP?', answer: 'Traumatic brain injury (TBI), followed by stroke, brain tumors, and hydrocephalus.', hint: 'ICP elevation causes.' },
      { question: 'What nursing position is preferred for increased ICP?', answer: 'Head of bed elevated 30–45°, head in neutral alignment.', hint: 'Promotes venous drainage.' },
      { question: 'What is the rule of nines for burns?', answer: 'Head and neck 9%, each arm 9%, chest 18%, abdomen 18%, each leg 18%, perineum 1%.', hint: 'Estimates burn surface area.' },
      { question: 'What is Parkland formula for burn resuscitation?', answer: '4 mL × weight (kg) × % TBSA burned of lactated Ringer\'s; give half in first 8 hrs, half in next 16 hrs.', hint: 'Burn fluid resuscitation.' },
      { question: 'What are the three types of burns?', answer: 'First degree (superficial), Second degree (partial thickness), Third degree (full thickness).', hint: 'Depth classification.' },
      { question: 'What is the first priority in caring for a burn patient?', answer: 'Airway management — inhalation injury is the leading cause of early burn mortality.', hint: 'ABC first.' },
      { question: 'What is a pneumonia assessment tool?', answer: 'CURB-65: Confusion, Urea > 7 mmol/L, Respiratory rate ≥ 30, Blood pressure < 90 systolic or ≤ 60 diastolic, Age ≥ 65.', hint: 'Severity score for community-acquired pneumonia.' },
      { question: 'What is the primary nursing responsibility in CPR?', answer: 'Initiating and maintaining high-quality chest compressions (rate 100–120/min, depth 5–6 cm) and calling for help.', hint: 'Compressions first (C-A-B).' },
      { question: 'What is the compression-to-ventilation ratio for adult CPR?', answer: '30 compressions : 2 breaths (30:2).', hint: 'BLS ratio for adults.' },
      { question: 'What is the defibrillation energy for ventricular fibrillation?', answer: '200 J biphasic (or 360 J monophasic) for the first shock.', hint: 'AED or defibrillator.' },
      { question: 'What are the shockable rhythms in cardiac arrest?', answer: 'Ventricular fibrillation (VF) and pulseless ventricular tachycardia (pVT).', hint: 'Shockable = VF and VT.' },
      { question: 'What are the non-shockable rhythms in cardiac arrest?', answer: 'Asystole and pulseless electrical activity (PEA).', hint: 'No shock for flatline or PEA.' },
      { question: 'What is the H\'s and T\'s of cardiac arrest?', answer: 'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis (PE), Thrombosis (coronary).', hint: 'Reversible causes.' },
      { question: 'What is blood transfusion reaction assessment?', answer: 'Monitor for fever, chills, back pain, hypotension, tachycardia, hematuria, and urticaria; stop transfusion immediately if reaction occurs.', hint: 'Hemolytic reaction signs.' },
      { question: 'What is the first action when a blood transfusion reaction is suspected?', answer: 'Stop the transfusion immediately, maintain IV access with normal saline, notify the physician, and send blood and urine samples to the lab.', hint: 'Stop, notify, maintain IV.' },
      { question: 'What is a normal adult hemoglobin level?', answer: 'Males: 13.5–17.5 g/dL; Females: 12.0–15.5 g/dL.', hint: 'Hemoglobin reference range.' },
      { question: 'What is the normal WBC count?', answer: '4,500 to 11,000 cells/μL (4.5–11.0 × 10³/μL).', hint: 'Leukocyte count.' },
      { question: 'What is the normal platelet count?', answer: '150,000 to 400,000/μL.', hint: 'Thrombocyte count.' },
      { question: 'What is the normal INR for a patient on warfarin therapy?', answer: '2.0 to 3.0 (therapeutic range); higher for mechanical heart valves.', hint: 'Anticoagulation monitoring.' },
      { question: 'What is a priority nursing intervention for a post-operative patient?', answer: 'Assess airway and respiratory status first; monitor vital signs, level of consciousness, and surgical site.', hint: 'Post-op assessment priority.' },
      { question: 'What are the signs of internal bleeding after surgery?', answer: 'Tachycardia, hypotension, restlessness, decreased urine output, and signs of peritonitis.', hint: 'Hypovolemic shock signs.' },
      { question: 'What is a wound dehiscence?', answer: 'Separation of wound edges; commonly occurs on days 5–8 post-operatively.', hint: 'Wound opening.' },
      { question: 'What is wound evisceration?', answer: 'Protrusion of abdominal contents through the wound opening.', hint: 'Intestines through the wound.' },
      { question: 'What is the nursing action for evisceration?', answer: 'Cover with sterile saline-soaked gauze, keep patient supine, do not attempt to push organs back, and notify the surgeon immediately.', hint: 'Sterile moist cover.' },
      { question: 'What is compartment syndrome?', answer: 'Elevated pressure within a fascial compartment that compromises blood flow to muscles and nerves; characterized by 6 Ps: Pain, Pressure, Paresthesia, Pallor, Paralysis, Pulselessness.', hint: 'Orthopedic emergency.' },
      { question: 'What is the 6 Ps of compartment syndrome?', answer: 'Pain (out of proportion), Pressure, Paresthesia, Pallor, Paralysis, and Pulselessness.', hint: 'Vascular compromise signs.' },
      { question: 'What is a tension pneumothorax nursing priority?', answer: 'Prepare for immediate needle decompression; anticipate chest tube insertion.', hint: 'Life-threatening emergency.' },
      { question: 'What is DIC (Disseminated Intravascular Coagulation)?', answer: 'A serious condition where clotting factors are activated systemically, leading to simultaneous clotting and bleeding throughout the body.', hint: 'Coagulation cascade dysregulation.' },
      { question: 'What laboratory finding is characteristic of DIC?', answer: 'Decreased platelets, decreased fibrinogen, elevated PT/aPTT, elevated D-dimer and FDP.', hint: 'Clotting factors consumed.' },
      { question: 'What is Addison\'s disease?', answer: 'Primary adrenal insufficiency — insufficient cortisol and aldosterone production by the adrenal glands.', hint: 'Hypocortisolism.' },
      { question: 'What is Cushing\'s syndrome?', answer: 'Excess cortisol production (endogenous) or intake (exogenous); causes moon face, buffalo hump, central obesity, and striae.', hint: 'Hypercortisolism.' },
      { question: 'What is thyroid storm?', answer: 'A life-threatening hyperthyroid crisis characterized by extreme fever, tachycardia, agitation, and altered mental status.', hint: 'Thyroid emergency.' },
      { question: 'What is myxedema coma?', answer: 'A life-threatening complication of severe hypothyroidism with hypothermia, bradycardia, altered consciousness, and hypoventilation.', hint: 'Hypothyroid emergency.' },
      { question: 'What is the Babinski reflex significance in adults?', answer: 'A positive Babinski (extensor plantar reflex) in adults indicates an upper motor neuron lesion.', hint: 'Normal in infants; abnormal in adults.' },
      { question: 'What is the most important intervention for a patient with hypoglycemia?', answer: 'Administer 15–20 g of fast-acting carbohydrates orally (if conscious) or IV dextrose (if unconscious or unable to swallow); reassess in 15 minutes.', hint: 'Rule of 15.' },
      { question: 'What are normal serum glucose levels?', answer: 'Fasting: 70–99 mg/dL; Random: < 140 mg/dL.', hint: 'Blood glucose reference.' },
      { question: 'What is the purpose of the Heimlich maneuver?', answer: 'To dislodge a foreign object from the airway of a choking adult by applying abdominal thrusts.', hint: 'Airway obstruction relief.' },
    ]
  },

  'disaster-nursing': {
    title: 'Emergency Management',
    subject: 'DISASTER NURSING',
    cards: [
      { question: 'What color tag represents immediate priority in a disaster?', answer: 'Red.', hint: 'Highest urgency.' },
      { question: 'What does the yellow tag represent in triage?', answer: 'Delayed — injuries serious but can wait for treatment without immediate threat to life.', hint: 'Can wait a few hours.' },
      { question: 'What does the green tag represent in triage?', answer: 'Minor — walking wounded; injuries are minor and can wait for treatment.', hint: 'Walking wounded.' },
      { question: 'What does the black tag represent in triage?', answer: 'Expectant — injuries incompatible with survival or patient is deceased.', hint: 'Expected to die.' },
      { question: 'What is the START triage system?', answer: 'Simple Triage and Rapid Treatment — a rapid primary triage tool for mass casualty incidents that takes < 30 seconds per patient.', hint: 'Mass casualty triage.' },
      { question: 'What are the steps in START triage?', answer: 'Can they walk? → Assess respirations → Assess perfusion (radial pulse/capillary refill) → Assess mental status → Assign color tag.', hint: 'Walking, breathing, perfusion, mental status.' },
      { question: 'What are the four phases of emergency management?', answer: 'Mitigation, Preparedness, Response, and Recovery.', hint: 'MPRR.' },
      { question: 'What is mitigation in disaster management?', answer: 'Actions taken to prevent or reduce the impact of disasters before they occur.', hint: 'Prevention phase.' },
      { question: 'What is preparedness in disaster management?', answer: 'Planning, training, and resource stockpiling before a disaster to enable an effective response.', hint: 'Before the disaster.' },
      { question: 'What is the response phase?', answer: 'Immediate actions taken during and directly after a disaster to save lives and prevent further damage.', hint: 'During the disaster.' },
      { question: 'What is the recovery phase?', answer: 'Long-term actions to restore normalcy after a disaster, including rebuilding and rehabilitation.', hint: 'After the disaster.' },
      { question: 'What is an Incident Command System (ICS)?', answer: 'A standardized hierarchical management system for directing emergency response personnel at a disaster scene.', hint: 'Structured command structure.' },
      { question: 'What is a mass casualty incident (MCI)?', answer: 'An event that results in more casualties than available local resources can manage without additional assistance.', hint: 'Resources overwhelmed.' },
      { question: 'What is the difference between a disaster and an emergency?', answer: 'An emergency can be managed with local resources; a disaster overwhelms local resources and requires external assistance.', hint: 'Scale of impact.' },
      { question: 'What is a natural disaster?', answer: 'A disaster caused by natural phenomena such as earthquakes, typhoons, floods, volcanic eruptions, and landslides.', hint: 'Nature-caused.' },
      { question: 'What is a man-made disaster?', answer: 'A disaster caused by human action or failure, such as industrial accidents, terrorism, nuclear incidents, or transportation accidents.', hint: 'Human-caused.' },
      { question: 'What is the role of the nurse in disaster response?', answer: 'Triage, providing emergency care, coordinating resources, documentation, psychosocial support, and community health surveillance.', hint: 'Multiple roles.' },
      { question: 'What is decontamination in disaster response?', answer: 'The process of removing contaminants (chemical, biological, radiological, nuclear) from victims and their environment.', hint: 'Hazmat procedure.' },
      { question: 'What is the priority in a chemical disaster?', answer: 'Remove victims from the source, decontaminate before treatment, and protect responders with appropriate PPE.', hint: 'Decontaminate first.' },
      { question: 'What is the Sendai Framework?', answer: 'A 2015–2030 international agreement for disaster risk reduction with four priorities: understanding disaster risk, strengthening governance, investing in resilience, and enhancing preparedness.', hint: 'Global disaster risk framework.' },
      { question: 'What is the Hyogo Framework for Action?', answer: 'A 2005–2015 international strategy for building resilience of nations and communities to disasters.', hint: 'Predecessor to Sendai Framework.' },
      { question: 'What is RA 10121 in the Philippines?', answer: 'The Philippine Disaster Risk Reduction and Management Act of 2010, creating the NDRRMC and shifting focus to disaster risk reduction.', hint: 'Philippine disaster law.' },
      { question: 'What is NDRRMC?', answer: 'National Disaster Risk Reduction and Management Council — the highest policy-making body on disaster risk reduction in the Philippines.', hint: 'Philippine national disaster body.' },
      { question: 'What is a barangay evacuation center?', answer: 'A designated safe shelter for residents displaced by disasters at the barangay level.', hint: 'Grassroots evacuation.' },
      { question: 'What is psychological first aid (PFA)?', answer: 'An evidence-based approach to providing initial psychosocial support to disaster survivors, reducing acute distress without imposing.', hint: 'Psychological support for survivors.' },
      { question: 'What is Critical Incident Stress Debriefing (CISD)?', answer: 'A structured group process offered to emergency responders after a traumatic event to process reactions and prevent PTSD.', hint: 'Debriefing for responders.' },
      { question: 'What is a hospital incident command system (HICS)?', answer: 'An ICS adapted for use in hospitals to manage emergencies and disasters within the hospital setting.', hint: 'Hospital emergency management.' },
      { question: 'What is the surge capacity?', answer: 'The ability of a healthcare facility to rapidly expand capacity beyond normal operations to meet increased demand for services during a disaster.', hint: 'Ability to handle more patients.' },
      { question: 'What are the components of HAZMAT response?', answer: 'Identification, notification, isolation, decontamination, treatment, and documentation.', hint: 'Hazardous materials response.' },
      { question: 'What is a bioterrorism agent?', answer: 'A biological organism (bacteria, virus, toxin) used intentionally to cause illness or death; Category A agents include anthrax, smallpox, plague.', hint: 'Biological weapon.' },
      { question: 'What are the signs of nerve agent (organophosphate) exposure?', answer: 'SLUDGE: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis + miosis and bronchospasm.', hint: 'SLUDGE mnemonic.' },
      { question: 'What is the antidote for nerve agent exposure?', answer: 'Atropine (to block muscarinic effects) and pralidoxime (2-PAM) to reactivate cholinesterase.', hint: 'Atropine + 2-PAM.' },
      { question: 'What is radiation sickness (Acute Radiation Syndrome)?', answer: 'A collection of health effects following a large dose of ionizing radiation; phases include prodromal, latent, manifest illness, and recovery/death.', hint: 'Nuclear exposure effects.' },
      { question: 'What PPE is needed for radiological decontamination?', answer: 'Gloves, gown, N95 respirator, goggles; dosimeters to monitor exposure; no special suit needed for most scenarios.', hint: 'Standard radiological PPE.' },
      { question: 'What is the difference between contamination and irradiation in radiation emergencies?', answer: 'Irradiation = exposure to radiation from an external source (person is not radioactive). Contamination = radioactive material on/in the body (person is radioactive).', hint: 'Exposure vs. contamination.' },
      { question: 'What is shelter-in-place?', answer: 'A protective action where people stay indoors in a well-sealed room to avoid exposure to a hazardous outdoor environment.', hint: 'Stay indoors for protection.' },
      { question: 'What is a disaster drill?', answer: 'A simulated exercise conducted to test and improve an organization\'s emergency response plan.', hint: 'Practice for real events.' },
      { question: 'What is the Chain of Survival for cardiac arrest?', answer: 'Early recognition and call for help, early CPR, early defibrillation, advanced life support, post-cardiac arrest care.', hint: '5-link chain.' },
      { question: 'What is the role of the community health nurse in disaster preparedness?', answer: 'Community risk assessment, public education, planning for vulnerable populations, and coordinating with local DRRM offices.', hint: 'Prevention and planning.' },
      { question: 'What is the immediate priority after a typhoon?', answer: 'Search and rescue, triage of injured, prevention of communicable diseases, safe water and sanitation, and psychosocial support.', hint: 'Post-typhoon priorities.' },
      { question: 'What communicable diseases are most common after floods?', answer: 'Leptospirosis, cholera, typhoid fever, diarrheal diseases, and respiratory infections.', hint: 'Waterborne and vector-borne diseases.' },
      { question: 'What is leptospirosis and how is it transmitted?', answer: 'A bacterial infection (Leptospira) transmitted through contact with water or soil contaminated by infected animal urine; common after floods.', hint: 'Floodwater exposure.' },
      { question: 'What is the purpose of a disaster risk reduction (DRR) plan?', answer: 'To identify hazards, assess vulnerabilities, and implement strategies to reduce the impact of disasters on communities.', hint: 'Proactive disaster planning.' },
      { question: 'What is an early warning system?', answer: 'A system that provides timely and effective information to communities to take action before a disaster occurs.', hint: 'Alert before disaster.' },
      { question: 'What is PAGASA?', answer: 'Philippine Atmospheric, Geophysical and Astronomical Services Administration — the agency responsible for weather forecasting and typhoon warnings in the Philippines.', hint: 'Philippine weather agency.' },
      { question: 'What is PHIVOLCS?', answer: 'Philippine Institute of Volcanology and Seismology — monitors volcanic activity and earthquakes in the Philippines.', hint: 'Volcano and earthquake agency.' },
      { question: 'What is the NDRRMC-DOH protocol in health emergencies?', answer: 'The DOH activates emergency operations, coordinates health facilities, deploys medical teams, and monitors disease surveillance.', hint: 'DOH emergency activation.' },
      { question: 'What is a family emergency plan?', answer: 'A household-level plan for communication, evacuation routes, and meeting points in the event of a disaster.', hint: 'Home preparedness.' },
      { question: 'What is risk communication in disasters?', answer: 'The process of informing communities about risks and protective actions in a clear, timely, and culturally appropriate manner.', hint: 'Communicating hazard information.' },
      { question: 'What is the difference between hazard, vulnerability, and risk?', answer: 'Hazard is a potential source of harm; vulnerability is susceptibility to that hazard; risk is the probability and severity of harm when hazard meets vulnerability.', hint: 'Risk = Hazard × Vulnerability.' },
    ]
  },

  'nursing-leadership-and-management': {
    title: 'Leadership Styles',
    subject: 'NURSING LEADERSHIP AND MANAGEMENT',
    cards: [
      { question: 'What is Laissez-faire leadership?', answer: 'A hands-off approach where the leader provides little or no direction.', hint: "French for 'let do'." },
      { question: 'What is autocratic (authoritarian) leadership?', answer: 'A style where the leader makes decisions unilaterally with little input from staff.', hint: 'Leader decides alone.' },
      { question: 'What is democratic (participative) leadership?', answer: 'A style where the leader involves staff in decision-making and values their input.', hint: 'Shared decision-making.' },
      { question: 'What are the differences between a manager and a leader?', answer: 'Managers focus on formal authority, planning, and control of resources; leaders influence, motivate, and inspire toward a vision.', hint: 'Authority vs. influence.' },
      { question: 'What is transactional leadership?', answer: 'A leadership style based on exchange (rewards for performance, punishment for non-performance); focuses on maintaining the status quo.', hint: 'Reward-punishment exchange.' },
      { question: 'What is transformational leadership?', answer: 'A leadership style that inspires and motivates staff to exceed expectations through vision, charisma, and creating meaningful change.', hint: 'Inspiring change.' },
      { question: 'What is servant leadership?', answer: 'A leadership philosophy focused on serving others first, prioritizing the growth and well-being of staff and community.', hint: 'Serve to lead.' },
      { question: 'What is situational leadership?', answer: 'A model where the leader adapts their style based on the readiness and competence of the follower.', hint: 'Leadership style matches follower maturity.' },
      { question: 'What is the Hersey-Blanchard Situational Leadership Model?', answer: 'A model with four leadership styles (telling, selling, participating, delegating) based on follower development level.', hint: 'D1-D4 follower levels.' },
      { question: 'What are the four functions of management?', answer: 'Planning, Organizing, Leading/Directing, and Controlling.', hint: 'POLC.' },
      { question: 'What is strategic planning?', answer: 'Long-range planning that establishes an organization\'s overall direction, goals, and priorities (3–5 years or more).', hint: 'Long-term direction.' },
      { question: 'What is operational planning?', answer: 'Short-term planning addressing the day-to-day operations and resource allocation.', hint: 'Short-term, daily planning.' },
      { question: 'What is a budget in nursing management?', answer: 'A formal financial plan that allocates resources (staff, supplies, equipment) to achieve organizational objectives.', hint: 'Financial planning tool.' },
      { question: 'What is delegation in nursing?', answer: 'Assigning selected nursing tasks to competent individuals while retaining accountability for the outcome.', hint: 'Task assignment with accountability.' },
      { question: 'What are the Five Rights of Delegation?', answer: 'Right task, Right circumstance, Right person, Right direction and communication, Right supervision and evaluation.', hint: 'NCSBN 5 rights.' },
      { question: 'What tasks cannot be delegated by a nurse?', answer: 'Assessment, care planning, evaluation of outcomes, and teaching — functions requiring professional nursing judgment.', hint: 'Core nursing functions.' },
      { question: 'What is staffing in nursing management?', answer: 'The process of determining the number and types of personnel needed to provide nursing care on a unit.', hint: 'Personnel planning.' },
      { question: 'What is patient acuity?', answer: 'The level of care a patient requires based on severity of illness and complexity of nursing needs.', hint: 'Determines staffing needs.' },
      { question: 'What is a nurse-to-patient ratio?', answer: 'The number of nurses assigned to care for a specific number of patients; affects care quality and safety.', hint: 'Staffing standard.' },
      { question: 'What is nursing burnout?', answer: 'A syndrome of emotional exhaustion, depersonalization, and reduced personal accomplishment resulting from chronic work-related stress.', hint: 'Work-related exhaustion.' },
      { question: 'What is the Magnet Recognition Program?', answer: 'An ANCC program recognizing healthcare organizations that demonstrate excellence in nursing practice and outcomes.', hint: 'Nursing excellence designation.' },
      { question: 'What is quality improvement (QI)?', answer: 'A systematic approach to improving processes and outcomes in healthcare using data and evidence.', hint: 'Systematic improvement.' },
      { question: 'What is the PDCA cycle?', answer: 'Plan-Do-Check-Act — a continuous quality improvement cycle.', hint: 'Deming cycle.' },
      { question: 'What is Total Quality Management (TQM)?', answer: 'An organization-wide approach to continuously improve quality of products and services.', hint: 'Organization-wide quality focus.' },
      { question: 'What is risk management in nursing?', answer: 'The process of identifying, assessing, and controlling risks that could harm patients, staff, or the organization.', hint: 'Prevent harm and liability.' },
      { question: 'What is an incident report?', answer: 'Documentation of an unexpected event (medication error, fall, near-miss) used for quality improvement and legal protection.', hint: 'Adverse event documentation.' },
      { question: 'What is a root cause analysis (RCA)?', answer: 'A systematic process for identifying the underlying causes of an adverse event to prevent recurrence.', hint: 'Why did it happen?' },
      { question: 'What is benchmarking in nursing?', answer: 'Comparing performance indicators with best practices or top-performing organizations to identify areas for improvement.', hint: 'Comparison with best practices.' },
      { question: 'What is scope of practice?', answer: 'The range of actions, procedures, and responsibilities that a licensed professional is authorized to perform based on education and law.', hint: 'Legal boundary of practice.' },
      { question: 'What is the Code of Ethics for Nurses?', answer: 'A set of ethical principles guiding nurses\' professional conduct, prioritizing patient welfare, dignity, and justice.', hint: 'Professional ethical guide.' },
      { question: 'What are Fayol\'s 14 principles of management?', answer: 'Division of work, Authority, Discipline, Unity of command, Unity of direction, Subordination of individual interest, Remuneration, Centralization, Scalar chain, Order, Equity, Stability, Initiative, and Esprit de corps.', hint: 'Classical management theory.' },
      { question: 'What is a span of control?', answer: 'The number of subordinates a manager can effectively supervise; a wide span = more subordinates; narrow span = fewer.', hint: 'Supervisory capacity.' },
      { question: 'What is unity of command?', answer: 'Fayol\'s principle that each employee should receive orders from only one superior.', hint: 'One boss principle.' },
      { question: 'What is the scalar chain in management?', answer: 'The formal chain of authority from the highest to the lowest level in an organization.', hint: 'Chain of command.' },
      { question: 'What is Maslow\'s theory applied to nursing management?', answer: 'Nurses must first meet their own basic needs (salary, safe workplace) before focusing on higher-level needs (belonging, esteem, self-actualization).', hint: 'Applies to staff motivation.' },
      { question: 'What is Herzberg\'s Two-Factor Theory?', answer: 'Hygiene factors (salary, working conditions) prevent dissatisfaction; motivators (achievement, recognition) increase satisfaction.', hint: 'Motivators vs. hygiene factors.' },
      { question: 'What is McGregor\'s Theory X and Theory Y?', answer: 'Theory X assumes workers are lazy and must be controlled; Theory Y assumes workers are self-motivated and capable of self-direction.', hint: 'Assumptions about human nature.' },
      { question: 'What is conflict management in nursing?', answer: 'Strategies to address and resolve disagreements constructively to maintain a healthy work environment.', hint: 'Manage disagreements.' },
      { question: 'What are the five conflict management styles?', answer: 'Competing, Collaborating, Compromising, Avoiding, and Accommodating.', hint: 'Thomas-Kilmann model.' },
      { question: 'What is the best conflict resolution style in nursing?', answer: 'Collaboration — seeks a win-win outcome and is appropriate for most workplace conflicts.', hint: 'Win-win approach.' },
      { question: 'What is the difference between discipline and punishment?', answer: 'Discipline is a constructive process to help employees correct behavior; punishment focuses on penalizing past behavior.', hint: 'Corrective vs. punitive.' },
      { question: 'What is a performance appraisal?', answer: 'A formal evaluation of an employee\'s work performance compared to set standards.', hint: 'Employee evaluation.' },
      { question: 'What is mentoring in nursing?', answer: 'A relationship where an experienced nurse guides a less experienced colleague in professional development.', hint: 'Professional development.' },
      { question: 'What is preceptorship?', answer: 'A structured relationship where a new nurse (preceptee) is guided by an experienced nurse (preceptor) during orientation.', hint: 'New nurse orientation.' },
      { question: 'What is the importance of mission and vision statements?', answer: 'Mission defines the organization\'s current purpose; vision describes the desired future state; both guide planning and decision-making.', hint: 'Organizational direction.' },
      { question: 'What is interprofessional collaboration?', answer: 'Healthcare professionals from different disciplines working together to provide comprehensive, coordinated patient care.', hint: 'Team-based care.' },
      { question: 'What is the SBAR communication tool?', answer: 'Situation, Background, Assessment, Recommendation — a standardized framework for communicating patient information among healthcare providers.', hint: 'Structured communication.' },
      { question: 'What is time management in nursing?', answer: 'The ability to prioritize tasks, organize workflow, and use available time efficiently to provide safe, quality patient care.', hint: 'Organizing tasks by priority.' },
      { question: 'What is the ABC priority system in nursing?', answer: 'A method of prioritizing care: A = airway issues, B = breathing problems, C = circulation problems — life-threatening problems first.', hint: 'Physiological priority.' },
      { question: 'What is decentralization in nursing management?', answer: 'Distributing decision-making authority to lower levels of the organization, empowering staff to make decisions at the point of care.', hint: 'Shared decision-making at unit level.' },
      { question: 'What is shared governance in nursing?', answer: 'A model where nurses participate in decision-making about clinical practice, quality, education, and professional development.', hint: 'Nurse empowerment model.' },
    ]
  },
};

export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // run on client only; check token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token && token.trim() !== '') {
      setAuthorized(true);
    } else {
      // redirect to /login if no token
      setTimeout(() => {
        router.replace('/login');
        setAuthorized(false);
      }, 370);
    }
  }, [router]);

  // while we determine auth, render nothing (or show a loader)
  if (authorized === null) {
    return (
      <LoadingPage />
    );
  }

  // authorized === true -> show page
  return (
    <div className='screenWithFlyout'>

      <Header isLoggedIn={true} />

      <div style={{
        marginTop: '4vw',
      }}>
        <div style={{
          display: "flex",
          flexFlow: "row nowrap",
        }}>
          <div style={{
            width: '73px', // or use '15.625rem'
            minWidth: '73px', // Add minWidth to prevent shrinking
          }}>
            <Flyout />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
            flexFlow: "row nowrap",
          }}>
            <FlashcardPage />
          </div>
        </div>
      </div>
      <Footer isLoggedIn={true} />
      <ChatAI />
    </div>
  );
}

function FlashcardPage() {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.course as string;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Get data based on URL or fallback
  const content = COURSE_DATA[courseSlug] || COURSE_DATA['anatomy-and-physiology'];
  const currentCard = content.cards[currentIndex];

  // --- Styles ---
  const containerStyle: React.CSSProperties = {
    height: '90vh',
    backgroundColor: '#ffffff',
    padding: '40px',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '73%',
  };

  const headerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  };

  const mainCardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#004d1a', // Dark green from
    borderRadius: '20px 20px 40px 40px',
    padding: '30px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  };

  const innerCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '500',
    position: 'relative',
  };

  const navControlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % content.cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + content.cards.length) % content.cards.length);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button 
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', color: '#004d1a', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <ArrowLeft size={20} /> BACK
        </button>
      </div>

      <div style={mainCardStyle}>
        {/* Course Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', opacity: 0.9 }}>{content.subject}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{content.title}</div>
          </div>
          <Maximize2 size={24} style={{ cursor: 'pointer' }} />
        </div>

        {/* Flashcard Area */}
        <div style={{ perspective: '1000px' }} onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            animate={{ rotateX: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ transformStyle: 'preserve-3d', position: 'relative' }}
          >
            {/* Front of Card */}
            <div style={{ 
              ...innerCardStyle, 
              backfaceVisibility: 'hidden',
              backgroundColor: '#b8c9b9' // Light green tinted background from
            }}>
              <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '16px', color: '#004d1a', textDecoration: 'underline' }}>
                <Lightbulb size={18} /> Get a hint?
              </div>
              {currentCard.question}
            </div>

            {/* Back of Card */}
            <div style={{ 
              ...innerCardStyle, 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              backfaceVisibility: 'hidden', 
              transform: 'rotateX(180deg)',
              backgroundColor: '#f9f9f9'
            }}>
              {currentCard.answer}
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={navControlsStyle}>
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '40px' }}>←</button>
            <span>{currentIndex + 1}/{content.cards.length}</span>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '40px' }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}