angular.module('chatbackend', ['ngResource']).
    factory('Chat', function($resource) {
        var Chat = $resource('https://api.mongolab.com/api/1/databases' +
            '/stvchat/collections/stvcollection/:id',
            { apiKey: 'I5Noza9ey8MUC4-M9PH8cxRR5UgSV6m_' }, {}
        );
        return Chat;
    });
angular.module('html6', []).
    directive('navbar', function () {
        return {
            restrict: 'E',
            transclude: true,
            link: function(scope, element, attrs){
                scope.brand = attrs.brand;
                scope.brandLink = attrs.brandLink;
                scope.logo = attrs.logo;
            },
            template:
                "<div class=\"navbar navbar-static-top navbar-inverse\">" +
                    "<div class=navbar-inner>" +
                    "   <div class=container>" +
                    "       <button ng-click=\"toggleCollapse\" type=\"button\" class=\"btn btn-navbar\" data-toggle=collapse data-target=\".nav-collapse\">" +
                    "           <span class=icon-bar></span>" +
                    "           <span class=icon-bar></span>" +
                    "           <span class=icon-bar></span>" +
                    "       </button>" +
                    "       <a href='#/{{brandLink}}'>" +
                    "           <img id=navLogo ng-src={{logo}}>" +
                    "           <span class=\"brand\" ng-bind=\"brand\"></span>" +
                    "       </a>" +
                    "       <div class=\"nav-collapse collapse\">" +
                    "           <ul class=\"nav\" ng-transclude>" +
                    "           </ul>" +
                    "       </div>" +
                    "   </div>" +
                    "</div>" +
                    "</div>",
            replace: true
        };
    }).
    directive('chat', function() {
        return {
            restrict: 'E',
            controller: function ($scope, $filter, Chat) {
                $scope.chats = Chat.query();

                $scope.save = function() {
                    if ($scope.chat.email == null) {$scope.chat.email = (new Date).toString()};
                    $scope.chat.gravhash = CryptoJS.MD5($filter('lowercase')($scope.chat.email)).toString();
                    $scope.chat.date = new Date();
                    delete $scope.chat.email;

                    Chat.save($scope.chat, function(chat) {

                        $scope.chats.push(chat);
                    });
                }
            },
            template:
                '<div class=chat-module>' +
                    '<h3 class=page-header>Ask a question</h3>' +
                    '<div class="chat-box">' +
                    '<div ng-repeat="chat in chats | orderBy:\'_id.$oid\':true"" class=media>' +
                    '   <img class="pull-left media-object" src="http://www.gravatar.com/avatar/{{chat.gravhash}}?s=50&d=identicon">' +
                    '   <div class="media-body">' +
                    '       <h5 class="media-heading">{{chat.poster}}</h5><span>{{chat.date | date:"MM/dd/yy \'at\' h:mm a"}}</span>' +
                    '       <p>{{chat.content}}</p>' +
                    '       <div ng-if="chat.answer" class=media>' +
                    '           <img class="pull-left media-object" src="img/logo.png" width="50px">' +
                    '           <h5 class="media-heading">Answer</h5>' +
                    '           <p>{{chat.answer}}</p>' +
                    '       </div>' +
                    '   </div>' +
                    '</div>' +
                    '</div>' +

                    '<h4 class=page-header>Your question</h4>' +

                    '<form name="chatForm">' +
                    '   <div class="control-group" ng-class="{error: chatForm.poster.$invalid}">' +
                    '       <label>Your name</label>' +
                    '       <input type="text" name="poster" ng-model="chat.poster" required>' +
                    '       <span ng-show="chatForm.poster.$error.required" class=help-inline>Required</span>' +
                    '   </div>' +

                    '   <div class="control-group" ng-class="{error: chatForm.email.$invalid}">' +
                    '       <label>Gravatar</label>' +
                    '       <input type="email" name="email" ng-model="chat.email">' +
                    '       <span ng-show="chatForm.email.$error.email" class=help-inline>Not valid email</span>' +
                    '   </div>' +

                    '   <div class="control-group" ng-class="{error: chatForm.content.$invalid}">' +
                    '       <label>Comment</label>' +
                    '       <textarea name="content" ng-model="chat.content" required></textarea>' +
                    '       <span ng-show="chatForm.content.$error.required" class="help-inline">Required</span>' +
                    '   </div>' +
                    '<br>' +
                    '<button ng-click="save()" ng-disabled="chatForm.$invalid" class="btn">Comment</button>' +

                    '</form>' +
                    '</div>',
            replace: true

        }
    }).
    directive('countries', function(){
        return function(scope){
            scope.countries = ["United States", "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
                ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia; Herzegovina","Botswana","Brazil","British Virgin Islands"
                ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
                ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
                ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
                ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
                ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
                ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
                ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
                ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
                ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
                ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
                ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad; Tobago","Tunisia"
                ,"Turkey","Turkmenistan","Turks; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
                ,"Yemen","Zambia","Zimbabwe"];
        }
    });


