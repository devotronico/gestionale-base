<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="demo">url</div>
    <script>
    
    const demo = document.querySelector('#demo');

    // const url = window.location.href; // http://localhost/workspace/gestionale-mini/test/url/url-0.php | get the entire URL |
    // const url = window.location.host; // localhost                                                     | get the hostname and port of the URL |
    // const url = window.location.hostname; // localhost                                                 | get the hostname of the URL |
    // const url = window.location.protocol; // http:                                                     | get the protocol of the URL in address bar|
    // const url = window.location.port; //                                                      | get the port of the URL|
    // const url = window.location.pathname; // /workspace/gestionale-mini/test/url/url-0.php             | get the path and filename of the current  |
    // const url = window.location.search; //                                                             | get the query portion of the URL|
    // const url = window.location.hash; //                                                                  | get the anchor portion of the URL |


    const url = location.href.replace(/[^/]*$/, ''); // http://localhost/workspace/gestionale-mini/test/url/ | get the entire URL senza il filename |
    demo.innerHTML = url
    
    
    
    </script>
</body>
</html>