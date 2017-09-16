const appContext = require.context('../spec', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);
