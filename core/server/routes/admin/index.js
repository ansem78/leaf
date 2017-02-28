const express = require('express');

const router = express.Router();

// ---- Admin. ----

router.all('*',function(req,res) {
  res.sendFile('/core/server/admin/index.html');
});

module.exports = router;