import React from 'react';
import Settings from './page';

async function SettingsLayout() {
  const isDemo = process.env.DEMO_MODE === 'true';

  return <Settings isDemo={isDemo} />;
}

export default SettingsLayout;
