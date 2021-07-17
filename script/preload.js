

window.addEventListener('DOMContentLoaded', () => {
    var selectedColorPallete;
    
    const AColorPicker = require('a-color-picker');

    let colorPallete;

    let backgroundRect = document.getElementById("backgroundColorRect");
    let fillRect = document.getElementById("fillColorRect");
    let strokeRect = document.getElementById("strokeColorRect");

    toggleDropDown("backgroundColorRect","colorPicker",false);
    toggleDropDown("fillColorRect","colorPicker",false);
    toggleDropDown("strokeColorRect","colorPicker",false);

    function toggleDropDown(btn_name , elementToCollapse_name, isTool){
        var btn = document.getElementById(btn_name);
        var elementToCollapse = document.getElementById(elementToCollapse_name);
        btn.addEventListener("click",function(e){
          if(isTool){
            btn.style.display = "none";
          }
            if(elementToCollapse.style.display==="block"){
                elementToCollapse.style.display="none";
            }else{
                elementToCollapse.style.display="block";
            }
        });
      }

    backgroundRect.addEventListener("click",function(e){
        selectedColorPallete=2;
        picker_.color=backgroundRect.getAttribute("fill");
        snack("Background Color");
    });
    fillRect.addEventListener("click",function(e){
        selectedColorPallete=1;
        picker_.color = fillRect.getAttribute("fill");
        snack("Fill Color");
    });
    strokeRect.addEventListener("click",function(e){
        selectedColorPallete = 0;
        picker_.color = strokeRect.getAttribute("fill");
        snack("Stroke Color");
    });

  const electron = require('electron');
  const {desktopCapturer, app} = require('electron');
  const path = require('path');
  const querystring = require('querystring');
  const fs = require('fs')
  const BrowserWindow =  electron.remote.BrowserWindow;

  windows_ = BrowserWindow.getFocusedWindow();
    var palleteColorList = "";
  var picker_= AColorPicker.from('.picker' , palleteColorList);
  picker_.on('change', (picker, color) => {
    if(selectedColorPallete==0){
        strokeRect.setAttribute("fill",color.toString());
    }else if(selectedColorPallete==1){
        fillRect.setAttribute("fill",color.toString());
    }else{
        backgroundRect.setAttribute("fill",color.toString());
        document.body.style.backgroundColor=color.toString();
    }
  })
  .on('coloradd', (picker, color) => {

  })
  .on('colorremove', (picker, color) => {
    
    
  });
  /**
   * Create a screenshot of the entire screen using the desktopCapturer module of Electron.
   *
   * @param callback {Function} callback receives as first parameter the base64 string of the image
   * @param imageFormat {String} Format of the image to generate ('image/jpeg' or 'image/png')
   **/
  function fullscreenScreenshot(imageFormat) {
      var _this = this;
      imageFormat = imageFormat || 'image/jpeg';
      
      this.handleStream = (stream) => {
          // Create hidden video tag
          var video = document.createElement('video');
          video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';
  
          
          
          // Event connected to stream
          video.onloadedmetadata = function () {
              // Set video ORIGINAL height (screenshot)
              video.style.height = this.videoHeight + 'px'; // videoHeight
              video.style.width = this.videoWidth + 'px'; // videoWidth
  
              video.play();
  
              // Create canvas
              var canvas = document.createElement('canvas');
              canvas.width = this.videoWidth;
              canvas.height = this.videoHeight;
              var ctx = canvas.getContext('2d');
              // Draw video on canvas
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const url = canvas.toDataURL('image/jpg', 0.8);

                // remove Base64 stuff from the Image
                const base64Data = url.replace(/^data:image\/png;base64,/, "");
                let query = querystring.parse(global.location.search);
                var filePath =path.join(JSON.parse(query['?data']),"/Annot");
                if (!fs.existsSync(filePath)) {
                  fs.mkdirSync(filePath, {
                    recursive: true
                  });
                }
                let d = new Date();
                let date_ = (d.toDateString()).replaceAll(" ","-")+ " " + d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
                snack("Saved to:"+filePath);
                fs.writeFile(path.join(filePath,date_+".png"), base64Data, 'base64', function (err) {
                    console.log(err);
                });
  
              // Remove hidden video tag
              video.remove();
              try {
                  // Destroy connect to stream
                  stream.getTracks()[0].stop();
              } catch (e) {}
          }
          
          video.srcObject = stream;
          document.body.appendChild(video);
      };
  
      this.handleError = function(e) {
          console.log(e);
      };
  
      desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
          console.log(sources);
                  try{
                      const stream = await navigator.mediaDevices.getUserMedia({
                          audio: false,
                          video: {
                              mandatory: {
                                  chromeMediaSource: 'desktop',
                                  chromeMediaSourceId: sources[0].id,
                                  minWidth: 1280,
                                  maxWidth: 4000,
                                  minHeight: 720,
                                  maxHeight: 4000
                              }
                          }
                      });
                  try{
                      _this.handleStream(stream);
                  } catch (e) {
                      _this.handleError(e);
                  }
                }catch(e){}  
      });
  }

  function snack(message_text){
    let snackElement = document.getElementById("snackbar");
    snackElement.innerHTML = message_text.toString();
    snackElement.className = "show";
    setTimeout(function(){ snackElement.className = snackElement.className.replace("show", ""); }, 1000);
  }

/*  function writeSettings(settingsName, settingsValue){  
    let settingsValues={
        "sslocation" : defaultSSLocation,
        "defaultStrokeColor" : defaultStroke,
        "defaultFillColor" : defaultFill,
        "colorPallete" : colorPallete
    }
    filename = path.join(__dirname,"/settings/settings.json");
    fs.writeFileSync(filename, JSON.stringify(settingsValue));
  }
*/


  let quitButton = document.getElementById("quitBtn");
  let mouseThrough = false;
      document.getElementById("screenshotTool").addEventListener("click", function(){
      fullscreenScreenshot('image/png');
  });
      quitButton.addEventListener("click",function(e){
        if(mouseThrough==false){
            windows_.setIgnoreMouseEvents(true, { forward: true });
            quitButton.setAttribute("src","../icons/mouseThrough.svg");
          quitButton.addEventListener('mouseenter', () => {
            quitButton.setAttribute("src","../icons/drawMouse.svg");
            windows_.setIgnoreMouseEvents(false);
            mouseThrough = false;
          });
        mouseThrough=true;
      }
      });

});