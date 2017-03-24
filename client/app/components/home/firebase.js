class Storage{

    constructor(databaseName){
        this.firebase = require("firebase");
        this.config = {
            apiKey: "AIzaSyCYqcG3O7vmeVUNH4C_48GQcBSRm4roObk",
            authDomain: "storyit-e76f1.firebaseapp.com",
            databaseURL: "https://storyit-e76f1.firebaseio.com",
            storageBucket: "storyit-e76f1.appspot.com",
            messagingSenderId: "11967370299"
        };
        this.databaseName = databaseName;
        this.firebase.initializeApp(this.config);

        this.database = this.firebase.database();
        this.snapshot = {};
    }

    getSnapshot(callback){
        let _this = this;
        const promise = new Promise((resolve, reject) => {
            this.database.ref(this.databaseName).on('value', function(snapshot) {
                _this.snapshot = snapshot.val();
                callback && callback(_this.snapshot);
                resolve(_this.snapshot);
            });
        });

        return promise;
    }

    save(obj){
        const key = this.database.ref().child(this.databaseName).push().key;

        this.database.ref(this.databaseName + "/" + key).set(obj);

    }
}


window.Storage = Storage;
