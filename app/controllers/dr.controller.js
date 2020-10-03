const { dailyroutines } = require("../models");
const db = require("../models");
const DailyRoutine = db.dailyroutines;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.taskdate){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const dailyroutine = {
        taskdate: req.body.taskdate,
        timestart: req.body.timestart,
        timeend: req.body.timeend,
        description: req.body.description,
        Ready: req.body.Ready ? req.body.Ready:false 
    };
    DailyRoutine.create(dailyroutine)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message||"Some error while creating Daily Routine"
        });
    });
};

exports.findAll = (req,res) => {
    
    const taskdate = req.query.taskdate;
    var condition = taskdate ? {taskdate:{[Op.like]: `%${taskdate}%`}}:null;
    DailyRoutine.findAll({where:condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message||"Some error while retriving Daily Routine."
        });
    });
};

exports.findOne = (req,res) => {
    const Taskid = req.params.Taskid;
    DailyRoutine.findByPk(Taskid)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message||"Some error with Taskid = "+Taskid
        });
    });
};
exports.update = (req,res) => {
    const Taskid = req.params.Taskid;
    DailyRoutine.update(req.body,{where: {id:Taskid}})
    .then(num => {
        if(num==1){
            res.send({ message: "Daily Routine was update successfully."});
        }
        else{
            res.send({ message: "Can not update Daily Routine."});
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:"could not update Daily Routine."
        });
    });
};
exports.deleteAll = (req,res) => {
    DailyRoutine.destroy({where: {},truncate: false})
    .then(num => {
        res.send({ message: "Daily Routine was delete successfully."});

    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Daily Routine."
        });
    });
};
exports.delete = (req,res) => {
    const Taskid = req.params.Taskid;
    DailyRoutine.destroy({where: {id:Taskid}})
    .then(num => {
        if(num==1){
            res.send({ message: "Daily Routine was delete successfully."});
        }
        else{
            res.send({ message: "Can not delete Daily Routine."});
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Daily Routine."
        });
    });
};


exports.findAllReady = (req,res) => {
    DailyRoutine.findAll({where: {Ready: true}})
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
            message:"Could not retriving Daily Routine."
        });
    });

};
