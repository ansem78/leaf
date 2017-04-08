const express = require('express');
var cache = require('express-redis-cache')();
const path = require('path');

const router = express.Router();

// ---- Admin. ----

router.all('*',function(req,res,next) {
  res.sendFile(path.resolve('core/server/admin/index.html'));
});

module.exports = router;
