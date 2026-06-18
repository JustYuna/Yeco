function VisualizeBar({ value, label, barCount, showPercentage }) {
    const totalBars = barCount || 20;
    const filled = Math.min(totalBars, Math.round((value / 100) * totalBars));
    const bar = "▮".repeat(filled) + "▯".repeat(totalBars - filled);

    if (label) {
        if (showPercentage) {
           return `${label}: [${bar}] (${value}%)`; 
        } else {
            return `${label}: [${bar}]`;
        }
    } else {
        if (showPercentage) {
           return `[${bar}] (${value}%)`; 
        } else {
            return `[${bar}]`;
        }
    }
};

module.exports = VisualizeBar;