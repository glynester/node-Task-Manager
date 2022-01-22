const mongoose = require('mongoose');
// Different connection string to mongodb
// Also given a dfferent db name ('task-manager-api') as mongoose data will look different.
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser: true,
  // useCreateIndex: true     // Training vid said use this but mongoose doesn't work with this option enabled.
});


// useFindAndModify:false,     // Stops deprecation warning for "findByIdAndUpdate" (which I didn't get.)


