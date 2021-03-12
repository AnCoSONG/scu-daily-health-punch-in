# scu-daily-health-punch-in
Automatically SCU daily health punch in for every SCUer.

## How to setup for you own?
1. Fork this repo
2. change `cookie` to your own
3. change the template to your own `template`
4. push and enjoy

## How to get cookie
In chrome, click `f12` to open dev panel and click `Application/Cookie` to check your cookie. 

## How to get template?
SCU daily punch in page is so insecure that you can easily get info by `f12` and run `JSON.stringify(vm.oldInfo)`. The output string is just what you need. 