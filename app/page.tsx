'use client';

import { useState } from 'react';
import styles from './sanvalentin.module.css';

export default function SanValentinPage() {
  const [step, setStep] = useState<'intro' | 'invite' | 'accepted'>('intro');
  const [loading, setLoading] = useState(false);

  const flowers = ['🌼', '🤍', '🌸'];

  const handleAccept = async () => {
    setLoading(true);

    // Lanzamos el mail pero NO bloqueamos la UX
    fetch('/api/send-love', { method: 'POST' }).catch(console.error);

    // pequeña pausa para sensación "cinematográfica"
    setTimeout(() => {
      setLoading(false);
      setStep('accepted');
    }, 700);
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        {step === 'intro' && (
          <section className={styles.card}>
            <h1 className={styles.title}>Hola amor</h1>
            <p className={styles.text}>Te preparé algo chiquito para vos.</p>

            <button
              className={styles.primary}
              onClick={() => setStep('invite')}
            >
              Abrir invitación
            </button>
          </section>
        )}

        {step === 'invite' && (
          <section className={styles.card}>
            <h2 className={styles.subtitle}>¿Querés ser mi San Valentín?</h2>

            <p className={styles.textMuted}>
              Tengo una cena sorpresa, algo casero y vinito.
            </p>

            <div className={styles.actions}>
              <button
                className={styles.primary}
                onClick={handleAccept}
                disabled={loading}
              >
                {loading ? 'Confirmando...' : 'Aceptar ❤️'}
              </button>
            </div>
          </section>
        )}

        {step === 'accepted' && (
          <section className={styles.success}>
            {/* flores */}
            <div className={styles.flowers}>
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.flower}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${7 + Math.random() * 5}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  {flowers[Math.floor(Math.random() * flowers.length)]}
                </span>
              ))}
            </div>

            <h2 className={styles.title}>
              Nuestro primer dia de los enamorados
            </h2>

            <p className={styles.text}>
              Una cena casera, con mucho amor y la mejor compañía que podría
              pedir. Gracias por ser mi compañera de vida, mi amorcito
              <br />
              No hace falta nada más.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
