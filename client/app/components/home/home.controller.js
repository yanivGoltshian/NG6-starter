import firebase from './firebase';
import item from './pbItem';

class HomeController {
    constructor($http, $scope) {
        "ngInject";
        this.name = 'home';
        this.saveurl = '/playbuzz.game.service/item/save';
        this.http = $http;
        this.fb = new Storage('content');
        this.scope = $scope;
        this.loader = false;
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
                let paragraph = window.paragraphSection[0];
                paragraph.text.ops[0].insert=src;
                paragraph.id = this.guid();
                window.storyItItem["sections"].push([paragraph]);
            }
            else if( type === 'image') {
                let img = window.imgSection[0];
                img.media.originalImageUrl=src;
                img.media.url=src;
                img.id = this.guid();
                window.storyItItem["sections"].push([img]);
            }
        }

      var req = {
        method: 'POST',
        url: '/playbuzz.game.service/item/save',
        headers: {
          'Content-Type': 'application/json'
        },
        data: window.storyItItem,
        withCredentials:true
      };

      window.storyItItem["id"]=this.guid();
      this.http(req).then(() => {
        this.hideLoader()
      }, () => {
        this.hideLoader()
      });
      window.storyItItem["sections"]=[];

    }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  hideLoader(){
     this.loader = false;
  }

    showLoader(){
      this.loader = true;
    }

    saveBtnClick() {
        this.fb.getSnapshot(this.getData.bind(this));

        this.showLoader();

       // this.http.post(this.saveurl, {withCredentials:true,data:window.storyItItem,headers:{'Content-Type':'application/json'}});//.then(this.successSave, this.errorSaving);
    }
}

export default HomeController;
