import firebase from './firebase';
import item from './pbItem';

class HomeController {
    constructor($http) {
        "ngInject";
        this.name = 'home';
        this.storyItItem = window.storyItItem;
        this.saveurl = 'http://www.playbuzz.com/playbuzz.game.service/item/save';
        this.http = $http;
        this.fb = new Storage('content');
    }

    getData(fbData) {
        window.fbData = fbData;
        let sections = window.storyItItem["sections"];

        for (let key in fbData) {
            let type = fbData[key].type;
            var src = fbData[key].src;
            if (type === 'text') {
                window.storyItItem["sections"].forEach(function (arr) {
                    let section = arr[0];
                    if (section.type === "paragraphSection") {
                        section.text.ops[0].insert=src;
                    }
                })
            }
        }
    }

    saveBtnClick() {
        this.fb.getSnapshot().then(this.getData);
        this.fbData;
        this.http.post(this.saveurl, this.storyItItem);//.then(this.successSave, this.errorSaving);
    }
}

export default HomeController;
