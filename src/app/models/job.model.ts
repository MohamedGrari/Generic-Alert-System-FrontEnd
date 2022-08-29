export class Job {
    //  jobId : number 
    //  jobGroup : string = ''
    //  scheduledAt : string = ''
    //  alertTime : string = ''
    //  employerId : number
    // requestFormId: number
    constructor(public jobId: string, public jobGroup: string, public scheduledAt: string, public alertTime: string, public employerId: number, public requestFormId: number) { }
    
}