import React, { useState } from 'react';
import './styles.css';

const PriceElasticityCalculator: React.FC = () => {
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);
    const [percentageChange, setPercentageChange] = useState<number>(0);
    const [elasticity, setElasticity] = useState<number>(-1);
    const [userChange, setUserChange] = useState<number | null>(null);
    const [calculationMethod, setCalculationMethod] = useState<'price' | 'percentage'>('price');

    const calculateUserChange = () => {
        let priceChangePercentage;
        if (calculationMethod === 'percentage') {
            priceChangePercentage = percentageChange;
            setNewPrice(currentPrice * (1 + percentageChange / 100));
        } else {
            priceChangePercentage = ((newPrice - currentPrice) / currentPrice) * 100;
            setPercentageChange(priceChangePercentage);
        }
        const userChangePercentage = priceChangePercentage * elasticity;
        setUserChange(userChangePercentage);
    };

    return (
        <div className="calculator-container">
            <div className="calculator-box">
                <h1>SaaS Price Sensitivity Analyzer</h1>
                <p className="description">
                    Analyze how price changes affect your user base using price elasticity of demand.
                </p>

                <div className="input-group">
                    <label>Current Price ($):</label>
                    <input
                        type="number"
                        value={currentPrice}
                        onChange={(e) => setCurrentPrice(Number(e.target.value))}
                        placeholder="Enter current price"
                    />
                </div>

                <div className="calculation-toggle">
                    <label>Calculate using:</label>
                    <select 
                        value={calculationMethod}
                        onChange={(e) => setCalculationMethod(e.target.value as 'price' | 'percentage')}
                    >
                        <option value="price">New Price</option>
                        <option value="percentage">Percentage Change</option>
                    </select>
                </div>

                {calculationMethod === 'price' ? (
                    <div className="input-group">
                        <label>New Price ($):</label>
                        <input
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(Number(e.target.value))}
                            placeholder="Enter new price"
                        />
                    </div>
                ) : (
                    <div className="input-group">
                        <label>Price Change (%):</label>
                        <input
                            type="number"
                            value={percentageChange}
                            onChange={(e) => setPercentageChange(Number(e.target.value))}
                            placeholder="Enter percentage change"
                        />
                    </div>
                )}

                <div className="input-group">
                    <label>
                        Price Elasticity: {elasticity}
                        <span className="tooltip">?
                            <span className="tooltip-text">
                                Typical values range from -0.1 (inelastic) to -2.0 (elastic).
                                More negative = More sensitive to price changes.
                            </span>
                        </span>
                    </label>
                    <input
                        type="range"
                        min="-2"
                        max="-0.1"
                        step="0.1"
                        value={elasticity}
                        onChange={(e) => setElasticity(Number(e.target.value))}
                    />
                    <div className="range-labels">
                        <span>More Elastic (-2.0)</span>
                        <span>More Inelastic (-0.1)</span>
                    </div>
                </div>

                <button onClick={calculateUserChange} className="calculate-button">
                    Calculate Impact
                </button>

                {userChange !== null && (
                    <div className="results">
                        <h2>Analysis Results</h2>
                        <div className="result-box">
                            <p className="price-change">
                                Price Change: {percentageChange.toFixed(2)}%
                            </p>
                            <p className="user-change">
                                Expected User Base Change: {userChange.toFixed(2)}%
                            </p>
                            <p className="new-price">
                                New Price: ${newPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceElasticityCalculator;
