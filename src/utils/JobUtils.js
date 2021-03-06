module.exports = {
    remainingDays(job) {
        //ajustes no job
        //calculo de tempo restante

        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at) //dia que o projeto foi criado
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar ms em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        //restam x dias
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}