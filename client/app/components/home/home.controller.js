import firebase from './firebase';
import item from './pbItem';

class HomeController {
    constructor($http, $scope) {
        "ngInject";
        this.name = 'home';
        this.saveurl = 'http://www.playbuzz.com/playbuzz.game.service/item/save';
        this.http = $http;
        this.fb = new Storage('content');
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
        var req = {
            method: 'POST',
            url: this.saveurl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: window.storyItItem,
            withCredentials:true
        }

        this.http(req);
       // this.http.post(this.saveurl, {withCredentials:true,data:window.storyItItem,headers:{'Content-Type':'application/json'}});//.then(this.successSave, this.errorSaving);
    }
}

export default HomeController;
