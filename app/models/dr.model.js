module.exports = (sequelize, Sequelize) => {
    const DailyRoutine = sequelize.define("dailyroutine",{
        taskdate: {type:Sequelize.STRING},
        timestart: {type:Sequelize.STRING},
        timeend: {type:Sequelize.STRING},
        description: {type:Sequelize.STRING},
        Ready: {type:Sequelize.BOOLEAN}
    });
    return DailyRoutine;
};