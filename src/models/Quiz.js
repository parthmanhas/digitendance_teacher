class Quiz {
    constructor(id, name, date, expiryTime, secretKey) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.secretKey = secretKey;
        this.expiryTime = expiryTime;
        this.eventType = 'quiz';
    }
}

export default Quiz;