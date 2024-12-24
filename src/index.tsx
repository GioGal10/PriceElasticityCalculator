import React from 'react';
import { createRoot } from 'react-dom/client';
import PriceElasticityCalculator from './price-elasticity-calculator';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<PriceElasticityCalculator />);
}