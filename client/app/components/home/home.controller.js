import firebase from './firebase';
import item from './pbItem';

class HomeController {
    constructor($http, $scope) {
        "ngInject";
        this.name = 'home';
        this.storyItItem = window.storyItItem;
        this.saveurl = 'http://www.playbuzz.com/playbuzz.game.service/item/save';
        this.http = $http;
        this.fb = new Storage('content');
        this.saveBtnClick();
        this.scope = $scope;
        this.content = [];
    }

    $onInit(){

      this.fb.getSnapshot().then((content) =>{
        this.content = content;
        this.scope.$apply();
      });

    }

    getData(fbData) {
        window.fbData = fbData;
        let sections = window.storyItItem["sections"];

        for (let key in fbData) {
            let type = fbData[key].type;
            var src = fbData[key].src;
            if (type === 'text') {
                let paragraph = window.paragraphSection;
                paragraph.text.ops[0].insert=src;
                window.storyItItem["sections"].push(paragraph);
            }
            else if( type === 'image') {
                let img = window.imgSection[0];
                img.media.originalImageUrl=src;
                img.media.url=src;
                window.storyItItem["sections"].push(img);
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
