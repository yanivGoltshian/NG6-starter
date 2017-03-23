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

        this.saveBtnClick();
    }

    getData(fbData) {
        let sections = this.storyItItem["sections"];

        for (let key in fbData) {
            let type = fbData[key].type;
            if (type === 'text') {
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
