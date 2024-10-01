import React from 'react';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} {...props}>
      <img
        src="/apple-touch-icon.png"
        alt="Icon"
        style={{ height: '30px', width: 'auto', marginRight: '8px' }}
      />
      <svg viewBox="0 0 200 40" height="40" aria-hidden="true">
        <text x="0" y="28" fontFamily="Arial, sans-serif" fontSize="20" fill="#46565d" fontWeight="bold">
          $ULABS
        </text>
      </svg>
    </div>
  );
}
