## How to run tests using Selenium Grid

### Selenium 4

#### Start the Hub

````
java -jar selenium/selenium-server-4.6.0.jar hub
````

#### Start a node

```` 
 java -jar selenium/selenium-server-4.6.0.jar node
````

or with the address of the hub:

````
java -jar selenium/selenium-server-4.6.0.jar node --hub http://<hub-ip>:4444
````

### Start karma

````
npm run test-selenium
````

### Troubleshooting

#### Enable Safari Webdriver on the device

```` 
safaridriver /usr/bin/safaridriver --enable
````

#### Set Android and Java env variables

````
export ANDROID_HOME=/Users/danielsilhavy/Library/Android/sdk
````

## Troubleshooting

### Safari not working
Try to enable the safaridriver:
````
safaridriver --enable
````

