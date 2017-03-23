class AboutController {
    constructor($http) {
        this.name = 'about';
        this.init();
        this.saveurl = "yaniv";
        this.item = "yaniv";
        $http.post(this.saveurl , this.item);//.then(successSave, error);
    }

    init() {
        console.log("yahhhhhhhhhhhhhhhhh");
    }
}

export default AboutController;
