const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../Utils/JobUtils')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
    
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            // quando o status muda para done ou progress ele conta 1 na respectiva variavel
            statusCount[status] += 1

            // total de horas por job ainda em andamento
            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        
        //qtd de horas/dia que quero trabalhar - qtd de horas/dia de cada job em andamento
        const freeHours = profile['hours-per-day'] - jobTotalHours
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
    },
}

