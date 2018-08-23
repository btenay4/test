window.onload = function (e) {
    liff.init(function () {
        getProfile();
        makeList();
    });
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getProfile(){
    // https://developers.line.me/ja/reference/liff/#liffgetprofile()
    liff.getProfile().then(function (profile) {
        document.getElementById('userid').textContent = 'Hai  ' + profile.displayName;
        document.getElementById('main').src = profile.pictureUrl;        
        document.getElementById('closewindowbutton').addEventListener('click', function () {
        liff.closeWindow();
        });
    });
}

function makeList(){
    var tipe = getParameterByName('type');
    var stri = getParameterByName('stkid');
    var isi = stri.split(',');
    var i;
    if (tipe = 'anim') {
        var ep = '/ANDROID/sticker_animation@2x.png';
    } else {
        var ep = "/ANDROID/sticker.png";
    }
    for (i = 0; i < isi.length; i++) {
        //var a = document.createElement('a');
        var a = document.createElement("img");
        a.src = 'https://stickershop.line-scdn.net/stickershop/v1/sticker/'+isi[i]+ep;
        //a.id = isi[i]
        a.addEventListener('click', function () {
        liff.sendMessages([{
              type: "template",
              altText: "Sticker",
              template: {
                     type: "image_carousel",
                     columns: [{
                         imageUrl: 'https://stickershop.line-scdn.net/stickershop/v1/sticker/'+ isi[i] + ep,
                         action: {
                             type: "uri",
                             uri: "line://shop/sticker/detail/"+getParameterByName('pkgid')}}
                                  ]
                                }
        }]).then(function () {
            liff.closeWindow();
        });
    });
        document.body.appendChild(a)
    };
}
    
    // closeWindow call
    
    

//function toggleProfileData() {
//    var elem = document.getElementById('profileinfo');
//    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
//        elem.style.display = "none";
//    } else {
//        elem.style.display = "block";
//    }
//}
