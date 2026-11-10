import { type ReactNode } from 'react';

export const whatsappBase = 'https://wa.me/5493412580840';

export function WhatsappLink({
  children,
  className = '',
  label = 'Escribinos por WhatsApp',
  testId = 'link-whatsapp',
  message = 'Hola SZ Mantenimiento PC! Te escribo desde la página web.',
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  testId?: string;
  message?: string;
}) {
  const href = `${whatsappBase}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-testid={testId} className={className}>
      {children}
    </a>
  );
}
