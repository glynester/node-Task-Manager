const mongoose = require('mongoose');
// Different connection string to mongodb
// Also given a dfferent db name ('task-manager-api') as mongoose data will look different.
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
  useNewUrlParser: true,
  // useCreateIndex: true     // Training vid said usse this but mongoose doesn't work with this option enabled.
});


