window.addEventListener('DOMContentLoaded', () => {
    var selectedColorPallete;

    const AColorPicker = require('a-color-picker');

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
    });
    fillRect.addEventListener("click",function(e){
        selectedColorPallete=1;
    });
    strokeRect.addEventListener("click",function(e){
        selectedColorPallete = 0;
    });

    
AColorPicker.from('.picker')
.on('change', (picker, color) => {
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
  // color added: color
  // modified palette: picker.palette
})
.on('colorremove', (picker, color) => {
  // color removed: color
  // modified palette: picker.palette
});

});