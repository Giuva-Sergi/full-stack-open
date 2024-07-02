const app = require("./app");
const info = require("./utils/logger");
require("dotenv").config();
const { PORT } = require("./utils/config");

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
