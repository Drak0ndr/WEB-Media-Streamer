# WEB-Media-Streamer
## Гайд по запуску
- Сначала нужно скачать Node js если она не была установлена ранее
- далее нужно перейти в директорию проекта и скачать необходимые модули командой 
   ```javascript
  npm i
  ```
-  если запуск будет не на raspberry pi, то вы получите трансляцию тестовой картинки, если запуск на raspberry pi, то надо сначала скачать fswebcam командой 
  ```javascript
  sudo apt install fswebcam
  ```
  и подключить вебкамеру в usb порт
- Потом в директории с проектом запускаем файл appWeb.js командой
```javascript
 node appWeb.js
 ```
- для удалённого доступа к серверу, надо скачать и настроить nginx потом переместить файлы indexCanv.html, events.js, clientCanv.js в папку где хранятся файлы тестового сайта nginx, удаляем стрый html файл и переименовываем indexCanv.html в index.html, далее меняем ip в файле clientCanv.js и events.js на локальный, **если доступ с других устройств не нужен, то можно ничего не менять и просто из скачанного проекта запустить файл indexCanv.html**
- Открываем файл indexCanv.html в браузере, частота кадров сильно зависит от мощности процессора
- Модуль управления (gpio.js) можно запускать только на raspberry pi, для этого надо установить библиотеку pigpio, подробнее написано здесь https://github.com/fivdi/pigpio, запускается файл командой 
 ```javascript
 sudo node gpio.js
 ```
- для файла mpu нужно установить библиотеки
 ```javascript
 npm i i2c-bus
 ```
 ```javascript
 npm i i2c-mpu6050
 ```
 
 - и запустить 
 ```javascript
   sudo node mpu.js
 ```
