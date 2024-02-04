const Express = require("express");
const App     = Express();
const PORT    = 3001;



App.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));