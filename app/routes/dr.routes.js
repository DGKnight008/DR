module.exports = app => {
    const dailyroutine = require("../controllers/dr.controller.js");
    var router = require("express").Router();
    router.post("/",dailyroutine.create);
    
    router.get("/",dailyroutine.findAll);
    router.get("/ready",dailyroutine.findAllReady);
    router.get("/:Taskid",dailyroutine.findOne);

    router.put("/:Taskid",dailyroutine.update);
    
    router.delete("/:Taskid",dailyroutine.delete);
    router.delete("/",dailyroutine.deleteAll);
    
    app.use('/api/dailyroutine',router);
};