<#macro masterTemplate title="" header="" footer="" initScript="">
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title}</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/lib/font-awesome/css/font-awesome.min.css">

    <script type="text/javascript">
        var require = {
            baseUrl: '/',
            paths: {
                lib: "lib",
                js: "js",
                jquery: ["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min", "lib/jquery/jQuery-2.1.4.min"],
                bootstrap: ["http://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min", "lib/bootstrap/js/bootstrap.min"],
                vue: ["http://apps.bdimg.com/libs/vue/1.0.14/vue", "lib/vuejs/vue"],
                echart: "lib/echart/echarts.min",
                odometer: ["http://apps.bdimg.com/libs/odometer.js/0.4.6/odometer", "lib/odometer/odometer.min"],
                layout: "js/layout",
                text: "lib/requirejs/text"
            },
            deps: [
                "layout", "text"
            ],
            shim: {
                bootstrap: {
                    deps: ["jquery"]
                }
            }
        };
    </script>
    <script data-main="${initScript}" src="/lib/requirejs/requirejs-2.1.20.js"></script>
${header}
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#monitorx-navbar-collapse" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">${func.getAppTitle()}</a>
        </div>
        <div class="collapse navbar-collapse" id="monitorx-navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="/notifier/">Notifier</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    <#nested />
</div>
<#--<footer class="footer">-->
<#--<div class="container">-->
<#--<p class="text-muted">♥ Do have faith in what you're doing.</p>-->
<#--</div>-->
<#--</footer>-->
${footer}
</body>
</html>
</#macro>