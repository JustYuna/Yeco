function VisualizeBar({ value, label, total, showPercentage }) {
    const filled = Math.min(total, Math.round((value / 100) * total));
    const bar = "▮".repeat(filled) + "▯".repeat(total - filled);

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