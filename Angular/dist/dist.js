var http=require('http');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db=mongoose.connection;
// db.on('error',console.error('连接出错'));
// db.once('openUri',function (){console.log('当前连接保持中')});
// db.once('close',function(cb){console.log('连接被切断')});

var kittySchema=mongoose.Schema({
    name:String,
});
kittySchema.methods.speak=function () {
    var greeting=this.name
        ?"Meow name is "+this.name
        :"I don't have a name";
    console.log(greeting);
};
var Kitten=mongoose.model('Kitten',kittySchema);
var data;

Kitten.find(function (err,kittens) {
    if(err) console.error(err);
    // console.log(kittens);
    data=kittens;
    db.close();
});

console.log(data);
var html=`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/angular.js/1.4.0-rc.2/angular.min.js"></script>
    <script>
        var m1=angular.module('myapp',[]);
//        全局局部作用域
        m1.controller('aaa',function ($scope,$rootScope) {
            $scope.new='hello';
            $rootScope.age=12;
        });
//        父子作用域
        m1.controller('bbb',function ($scope) {
            $scope.new='yes';
        });
        m1.controller('ccc',function ($scope) {
            $scope.new='我自己的';
            $scope.age=8;
        });
//        双向数据绑定
        m1.controller('bind',function ($scope,$rootScope) {
            $scope.name='默认值';
//            $rootScope.age=$scope.name;
        });
//        延时器和事件
        m1.controller('timeout',function ($scope,$timeout) {
            $scope.name='等待两秒...';
            $timeout(function () {
                $scope.name='谢谢你等待两秒~';
            },2000);
            $scope.showit=function (e) {
                $scope.name='你成功点了一下我';
                console.log(e);
            }
        });
//        过滤器
        m1.controller('cur',function ($scope) {
            $scope.name='wph';
            $scope.price=120;
        });
        m1.filter('reverse',function () {
            return function (text) {
                return text.split('').reverse().join('');
            }
        });
//        watch
        m1.controller('watch',function ($scope,$rootScope) {
            $scope.option={name:'是的'};
            $scope.$watch('option',function (n,o) {
                $scope.btname=n.name;
            },true);
//            $scope.change=function () {
//                return $scope.name;
//            };
//            $scope.$watch($scope.change,function (n,o,l) {
//                $scope.btname=n;
//            });
        });
//        自定义指令
        m1.directive("runoobDirective", function() {
            return {
                restrict : "EACM",
                template : "<h1>自定义指令!</h1>"
            };
        });
        
        
//        工具方法
        var obj={
            time:{
                '1':11
            }
        };
        var b=angular.copy(obj);
        console.log(b);
    </script>
</head>
<body ng-app="myapp">
<div ng-controller="aaa">
    <p>{{new}}</p>
    <p>{{age}}</p>
</div>
<div ng-controller="bbb">
    <p>{{new}}</p>
    <p>{{age}}</p>
    <div ng-controller="ccc">
        <p>{{new}}</p>
        <p>{{age}}</p>
    </div>
</div>
<div ng-controller="bind">
<input type="text" ng-model="name" >
<p>你输入了{{name}}</p>
<p >{{name}}</p>
</div>
<div ng-controller="timeout" ng-click="showit()">
    <p>{{name}}</p>
</div>
<div ng-controller="cur">
    <p>{{name}}</p>
    <p>uppercae大写{{name | uppercase}}</p>
    <p>currency货币格式{{price|currency:'￥'}}</p>
    <p>reverse 自定义的过滤器，将字符串反转：{{name|reverse}}</p>
</div>

<div ng-controller="watch">
    <input type="text" ng-model="option" placeholder="请输入按钮名字"><br>
    {{option.name}}
    <button>{{btname}}</button>
</div>
<runoob-directive></runoob-directive>
<div runoob-directive></div>
<div class="runoob-directive"></div>
<!-- directive: runoob-directive -->
</body>
</html>
`;

http.createServer(function (req,res) {
    console.log(req.url)
    res.end(html);
}).listen(3000);