define(["jquery", "vue"], function ($, Vue) {
    var vm;

    function init() {
        var node = getUrlParameter("node");
        var edit = getUrlParameter("edit");
        var metric = getUrlParameter("metric");
        var forewarningId = getUrlParameter("forewarningId");
        if (typeof metric === "undefined" || metric == null) metric = "";
        if (typeof edit === "undefined" || edit == null) edit = "false";

        vm = new Vue({
            el: ".content-container",
            data: {
                edit: edit == "true",
                node: node,
                title: "",
                metric: metric,
                snippet: "",
                firerule: "",
                notifiers: [],
                availableNotifiers: [],
                msg: "",
                realMsg: "",
                recoveredMsg: "",
                realRecoveredMsg: "",
                evaluateResult: "",
                expression: "{{expression}}"
            },
            methods: {
                addForewarning: function () {
                    if (this.edit) {
                        $.post("/api/forewarning/edit/",
                            {
                                "title": this.title,
                                "node": this.node,
                                "metric": this.metric,
                                "snippet": this.snippet,
                                "firerule": this.firerule,
                                "notifiers": this.notifiers,
                                "msg": this.msg,
                                "recoveredMsg": this.recoveredMsg,
                                "forewarningId": forewarningId
                            },
                            function (res) {
                                if (res.success) {
                                    window.location.href = "/node/?node=" + node;
                                }
                                else {
                                    alert(res.message);
                                }
                            });
                    }
                    else {
                        $.post("/api/forewarning/",
                            {
                                "title": this.title,
                                "node": this.node,
                                "metric": this.metric,
                                "snippet": this.snippet,
                                "firerule": this.firerule,
                                "notifiers": this.notifiers,
                                "msg": this.msg,
                                "recoveredMsg": this.recoveredMsg
                            },
                            function (res) {
                                if (res.success) {
                                    window.location.href = "/node/?node=" + node;
                                }
                                else {
                                    alert(res.message);
                                }
                            });
                    }
                },
                removeForewarning: function () {
                    if (confirm("Do you want to remove this forewarning?")) {
                        $.post("/api/forewarning/delete/",
                            {
                                "title": this.title,
                                "node": this.node,
                                "metric": this.metric,
                                "snippet": this.snippet,
                                "firerule": this.firerule,
                                "notifiers": this.notifiers,
                                "msg": this.msg
                            },
                            function (res) {
                                if (res.success) {
                                    window.location.href = "/node/?node=" + node;
                                }
                            });
                    }
                },
                evaluate: function () {
                    $.post("/api/forewarning/evaluate/",
                        {
                            "node": this.node,
                            "metric": this.metric,
                            "snippet": this.snippet
                        },
                        function (res) {
                            if (res.success) {
                                vm.evaluateResult = res.data;
                            }
                        });
                },
                previewMsg: function () {
                    $.post("/api/forewarning/previewMsg/",
                        {
                            "node": this.node,
                            "metric": this.metric,
                            "msg": this.msg
                        },
                        function (res) {
                            if (res.success) {
                                vm.realMsg = res.data;
                            }
                        });
                },
                previewRecoveredMsg: function () {
                    $.post("/api/forewarning/previewMsg/",
                        {
                            "node": this.node,
                            "metric": this.metric,
                            "msg": this.recoveredMsg
                        },
                        function (res) {
                            if (res.success) {
                                vm.realRecoveredMsg = res.data;
                            }
                        });
                }
            }
        });

        $.get("/api/notifier/", function (res) {
            vm.availableNotifiers = res.data;
        });

        if (vm.edit) {
            loadEditingForewarning(node, forewarningId);
        }
    }

    function loadEditingForewarning(node, forewarningId) {
        $.get("/api/forewarning/?node=" + node + "&forewarning=" + forewarningId, function (res) {
            var existingForwarning = res.data;
            vm.snippet = existingForwarning.snippet;
            vm.msg = existingForwarning.msg;
            vm.recoveredMsg = existingForwarning.recoveredMsg;
            vm.notifiers = existingForwarning.notifiers;
            vm.firerule = existingForwarning.fireRule;
            vm.title = existingForwarning.title;
        });
    }

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    init();
});