/// <reference path="HomeCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
var MessagesCtrl = (function () {
    function MessagesCtrl($scope, FinduserService, settings, $filter, $firebaseSimpleLogin, $modal, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.FinduserService = FinduserService;
        this.settings = settings;
        this.$filter = $filter;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.noMessages = settings.noMessages;
        $scope.noSuchUser = false;

        $scope.messages = this;

        $scope.home.hideMenu = true;

        $scope.home.auth.$getCurrentUser().then(function (user) {
            //            FROM
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                if ($scope.home.isBreeder === true) {
                    DataService.getMessages(user.email).then(function (messages) {
                        _this.fireMessages = messages;
                        _this.SetSelectedUser(0);
                        var userNames = _.pluck(_this.fireMessages, 'userName');
                        userNames.forEach(function (username) {
                        });
                    });
                }
                if ($scope.home.isBreeder === false) {
                    DataService.getLookerMessages(user.email).then(function (messages) {
                        _this.fireMessages = messages;
                        _this.SetSelectedUser(0);
                    });
                }
            });
        });
    }
    MessagesCtrl.prototype.Delete = function () {
        var _this = this;
        this.DataService.deleteConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _.where(_this.fireMessages, { isTrash: false, userName: _this.selectedUser.userName }).forEach(function (message) {
                message.isTrash = true;
            });
            _this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.Recover = function () {
        var _this = this;
        this.DataService.recoverConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _.where(_this.fireMessages, { isTrash: true, userName: _this.selectedUser.userName }).forEach(function (message) {
                message.isTrash = false;
            });
            _this.SetSelectedUser(0);
        });
    };

    MessagesCtrl.prototype.DeleteForever = function () {
        var _this = this;
        this.DataService.deleteForever(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _this.fireMessages = _.without(_this.fireMessages, _.findWhere(_this.fireMessages, { isTrash: true, userName: _this.selectedUser.userName }));
        });
    };

    //    Send() {
    //        this.$scope.home.auth.$getCurrentUser().then((user) => {
    //            this.$scope.home.Breedership(this.$scope.home.FireProcess(user.email)).then(() => {
    //                if (this.$scope.home.isBreeder === true) {
    //                    this.DataService.sendReply(this.$scope.home.userName, this.selectedUser.userName,this.selectedUser.nickName, this.reply.body).then(() => {
    //                        this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser.userName, nickName:this.selectedUser.nickName});
    //                        this.reply.body = "";
    //                    })
    //                }
    //                if (this.$scope.home.isBreeder === false) {
    //                    this.DataService.sendLookerReply(this.$scope.home.userName, this.selectedUser.userName,this.selectedUser.nickName, this.reply.body).then(() => {
    //                        this.fireMessages.push({amISender: true, body: this.reply.body, sent: Date.now(), isTrash: false, userName: this.selectedUser.userName, nickName:this.selectedUser.nickName});
    //                        this.reply.body = "";
    //                    })
    //                }
    //            })
    //        })
    //    }
    MessagesCtrl.prototype.SendNewMessage = function (to, body) {
        var _this = this;
        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                _this.FinduserService.find(to).then(function (userToProfile) {
                    // UserTo is in DB
                    //                        FROM ##############################
                    if (_this.$scope.home.isBreeder === true) {
                        _this.DataService.sendReply(_this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body).then(function () {
                            _this.fireMessages.push({ amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: _this.$scope.home.FireProcess(to), userName: _this.$scope.home.FireProcess(userToProfile.Email) });
                            //                                this.$state.go('^');
                            //                                this.ShowSuccess('Your message has been sent!!');
                        });
                    }
                    if (_this.$scope.home.isBreeder === false) {
                        _this.DataService.sendLookerReply(_this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body).then(function () {
                            _this.fireMessages.push({ amISender: true, body: body, sent: Date.now(), isTrash: false, nickName: _this.$scope.home.FireProcess(to), userName: _this.$scope.home.FireProcess(userToProfile.Email) });
                            //                                this.$state.go('^');
                            //                                this.ShowSuccess('Your message has been sent!!');
                        });
                    }

                    //                TO #################################
                    if (userToProfile.isBreeder === true) {
                        _this.DataService.sendReply(userToProfile.Email, _this.$scope.home.userName, _this.$scope.home.nickName, body).then(function () {
                            //                                this.$state.go('^');
                            _this.ShowSuccess('Your message has been sent!!');
                        });
                    }
                    if (_this.$scope.home.isBreeder === false) {
                        _this.DataService.sendLookerReply(userToProfile.Email, _this.$scope.home.userName, _this.$scope.home.nickName, body).then(function () {
                            //                                this.$state.go('^');
                            _this.ShowSuccess('Your message has been sent!!');
                        });
                    }
                }, function () {
                    // Not Found
                    _this.ShowError(_this.settings.noSuchUser);
                    _this.$scope.noSuchUser = true;
                });
            });
        });
    };

    MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        var _this = this;
        this.selectedUserIndex = arrIndex;

        var userNames = _.map(_.uniq(_.filter(this.fireMessages, function (note) {
            return note.isTrash === _this.isTrash;
        })), function (message) {
            return { userName: message.userName, nickName: message.nickName };
        });
        this.selectedUser = userNames[this.selectedUserIndex];
    };

    MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return MessagesCtrl;
})();
