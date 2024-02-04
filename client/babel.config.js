module.exports = {
  presets: [
	['@babel/preset-env', {targets: {node: 'current'}}],
    	'@babel/preset-typescript',
  ],

  plugins: [
    // ... other plugins
    'react-refresh/babel',
  ],
};