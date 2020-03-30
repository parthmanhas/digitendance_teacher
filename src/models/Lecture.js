class Lecture{
    constructor(name, date, expiryTime, secretKey){
        this.name = name;
        this.date = date;
        this.secretKey = secretKey;
        this.expiryTime = expiryTime;
        this.eventType = 'lecture';
    }
}

export default Lecture;