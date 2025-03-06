import { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import saveAs from 'file-saver';

export default function ChatbotSpecifications() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [finalDoc, setFinalDoc] = useState('');

  const questions = [
    'Quel type de projet souhaitez-vous décrire ? (Fournitures, Services, Travaux)',
    'Décrivez brièvement l'objet du marché.',
    'Quels sont les critères techniques ou caractéristiques attendues ?',
    'Combien d'unités ou volumes souhaitez-vous ?',
    'Y a-t-il des contraintes de livraison ou de garantie ?'
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      generateDoc();
    }
  };

  const handleChange = (e) => {
    setResponses({ ...responses, [step]: e.target.value });
  };

  const generateDoc = () => {
    const doc = `Spécifications Techniques :\n\n` +
      `1. Type de projet : ${responses[0]}\n` +
      `2. Objet du marché : ${responses[1]}\n` +
      `3. Critères techniques : ${responses[2]}\n` +
      `4. Quantité : ${responses[3]}\n` +
      `5. Contraintes : ${responses[4]}\n`;
    setFinalDoc(doc);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text(finalDoc, 10, 10);
    pdf.save('specifications.pdf');
  };

  const downloadDOCX = () => {
    const blob = new Blob([finalDoc], { type: 'application/msword' });
    saveAs(blob, 'specifications.docx');
  };

  return (
    <div>
      <div>
        {finalDoc ? (
          <motion.div>
            <h2>Document Généré</h2>
            <pre>{finalDoc}</pre>
            <button onClick={downloadPDF}>Télécharger PDF</button>
            <button onClick={downloadDOCX}>Télécharger DOCX</button>
          </motion.div>
        ) : (
          <motion.div>
            <h2>{questions[step]}</h2>
            <input type="text" onChange={handleChange} />
            <button onClick={handleNext}>Suivant</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
