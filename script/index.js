window.addEventListener('DOMContentLoaded', () => {

  dragElement("optionsMenu");
  dragElement("settingWindow");

  toggleDropDown("collapseMenuBar","menuView",false);
  toggleDropDown("changePenBtn","dropPenType",true);
  toggleDropDown("changeLineBtn","dropLineType",true);
  toggleDropDown("changeShapeBtn","dropShapeType",true);
  toggleDropDown("changeEraserBtn","dropEraserType",true);
  toggleDropDown("settingBtn","settingWindow",false);
  });

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

  

  function dragElement(elem_Name) {
      var elmnt = document.getElementById(elem_Name);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  } 
  
{
let enabled_tool;
let line_no = 0; 
let point_Count = 0; 
  class Tool{
    constructor(name_,id_,group_id,dropdown_id){
      this.name_ = name_;
      this.id_ = id_;
      this.group_id = group_id;
      this.dropdown_id = dropdown_id;
      this.createTool();
    }
    createTool(){
          let tool_selected , group_selected , dropdown_menu , selectedTool;
          group_selected = document.getElementById(this.group_id);
          tool_selected = document.getElementById(this.id_);
          dropdown_menu = document.getElementById(this.dropdown_id);
          selectedTool = this.name_;
          tool_selected.addEventListener("click",function(e){
            resetAllToolState();
            let fsrc = tool_selected.getAttribute("src");
            let fsrcnew;
            fsrcnew = fsrc.slice(0,-4) + "Black.svg";
            tool_selected.setAttribute("src",fsrcnew);
            group_selected.setAttribute("src",fsrcnew);
            dropdown_menu.style.display = "none";
            group_selected.style.display="block";
            enabled_tool = selectedTool;
        });
      }
    setDisabled(){
      let tool_selected, group_selected;
      group_selected = document.getElementById(this.group_id);
      tool_selected = document.getElementById(this.id_);
      let fsrc = tool_selected.getAttribute("src");
      tool_selected.setAttribute("src",fsrc.replace("Black",""));
      group_selected.setAttribute("src",fsrc.replace("Black",""));
    }
  }

  class Figure{
    
    constructor(x,y,figId,figType){
      this.x = x.toString();
      this.y = y.toString();
      this.x_int = x;
      this.y_int = y;
      this.figId = "figure"+figId.toString();
      this.figType = figType;
      this.strokeColor = strokeRect.getAttribute("fill").toString();
      this.fillColor = fillRect.getAttribute("fill").toString();
      this.create();
    }
    create(){
      switch(this.figType){
        case "pen":
          this.createPen();
          break;
        case "highlighter":
          this.createHighlighter();
          break;
        case "line":
          this.createLine();
          break;
        case "arrow":
          this.createArrow();
          break;
        case "rectangle":
          this.createRectangle();
          break;
        case "ellipse":
          this.createEllipse();
          break;
        case "triangle":
          this.createTriangle();
          break;
        case "text":
          this.createText();
          break;
      }
    }
    update(lX,lY){
      switch(this.figType){
        case "pen":
          this.updatePen(lX,lY);
          break;
        case "highlighter":
          this.updateHighlighter(lX,lY);
          break;
        case "line":
          this.updateLine(lX,lY);
          break;
        case "arrow":
          this.updateArrow(lX,lY);
          break;
        case "rectangle":
          this.updateRectangle(lX,lY);
          break;
        case "ellipse":
          this.updateEllipse(lX,lY);
          break;
        case "triangle":
          this.updateTriangle(lX,lY);
          break;
        case "text":
          break;
      }
    }

    createPen(){
      let pathData = "<path  onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" fill=\"none\" stroke=\""+this.strokeColor+"\" stroke-width=\"2\""+
      "stroke-linecap=\"round\" d=\"M"+this.x+" "+this.y+" L"+this.x+" "+this.y+"\"/>";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
      console.log(pathData);
    }
    updatePen(lX,lY){
      lX = lX.toString();
      lY = lY.toString();
      let updatedPath = " L"+ lX + " " + lY;
      let selector = "#"+this.figId;
      $(selector).attr("d", $(selector).attr("d") + updatedPath);
    }

    createHighlighter(){
      let pathData = "<path  onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" opacity=\"0.4\" fill=\"none\" stroke=\""+this.strokeColor+"\" stroke-width=\"18\""+
      " d=\"M"+this.x+" "+this.y+" L"+this.x+" "+this.y+"\"/>";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
      console.log(pathData);
    }
    updateHighlighter(lX , lY){
      lX = lX.toString();
      lY = lY.toString();
      let updatedPath = " L"+ lX + " " + lY;
      let selector = "#"+this.figId;
      if(point_Count==8){
      $(selector).attr("d", $(selector).attr("d") + updatedPath);
      point_Count = 0;
      }else{
        point_Count++;
      }
    }

    createRectangle(){
      let pathData = "<rect  onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" fill=\""+this.fillColor+"\" stroke=\""+this.strokeColor+"\" stroke-width=\"2\""+
      "x=\""+this.x+"\" y=\""+this.y+"\" width=\"1\" height=\"1\" />";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
      console.log(pathData);
    }
    updateRectangle(lX , lY){
      let selector = "#"+this.figId;
      let width = (lX-this.x_int);
      let height = (lY-this.y_int);
      let positionX = this.x_int;
      let positionY = this.y_int;

      if(width<0 && height<0){
        positionX = positionX + width;
        positionY = positionY + height;
      }
      else if(width<0){
        positionX = positionX + width;
      }
      else if(height<0){
        positionY = positionY + height;
      }
      else{}

      $(selector).attr("width", Math.abs(width)); 
      $(selector).attr("height", Math.abs(height)); 
      $(selector).attr("x", positionX); 
      $(selector).attr("y", positionY); 
    }

    createEllipse(){
      let pathData = "<ellipse  onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" fill=\""+this.fillColor+"\" stroke=\""+this.strokeColor+"\" stroke-width=\"2\""+
      "cx=\""+this.x+"\" cy=\""+this.y+"\" rx=\"1\" ry=\"1\" />";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
      console.log(pathData);
    }
    updateEllipse(lX , lY){
      let selector = "#"+this.figId;
      $(selector).attr("rx", Math.abs(lX-this.x_int)); 
      $(selector).attr("ry", Math.abs(lY-this.y_int)); 
    }

    createTriangle(){
      let pathData = "<polygon  onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" fill=\""+this.fillColor+"\" stroke=\""+this.strokeColor+"\" stroke-width=\"2\""+
      "points=\""+this.x+","+this.y+","+this.x+","+this.y+","+this.x+","+this.y+"\" />";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
      console.log(pathData);
    }
    updateTriangle(lX , lY){
      let updatedPath = this.x+","+this.y+","+lX+","+lY+","+((2*this.x_int)-lX)+","+lY+"\" />"
      let selector = "#"+this.figId;
      $(selector).attr("points", updatedPath);
    }

    createText(){
      line_no = 0;
      let pathData = "<text font-size=\"20\"  id=\""+this.figId+"\" fill=\""+this.strokeColor+"\""+
      "x=\""+this.x+"\" y=\""+this.y+"\"><tspan onmouseover=\"deleteFigure(this)\" dy=\".6em\"></tspan></text>";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
    }

    updateText(text_,line_number,command_key){
      text_ = text_.toString();
      let selector = "#"+this.figId;
      if(command_key==8){
        selector = selector+" tspan:eq("+line_number.toString()+")";
        text_ = $(selector).text();
        text_ = text_.slice(0,text_.length-1);
        console.log(text_);
        $(selector).text(text_);
      }else if(command_key==13){
        $(selector).html($(selector).html()+"<tspan onmouseover=\"deleteFigure(this)\" x=\""+this.x+"\" dy=\"1.2em\">  </tspan>");
      }
      else{
        selector = selector+" tspan:eq("+line_number.toString()+")";
        text_ = $(selector).text() + text_;
        $(selector).text(text_);
      }
    }

    createLine(){
      let pathData = "<line onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" stroke=\""+this.strokeColor+"\""+
      "x1=\""+this.x+"\" y1=\""+this.y+"\""+"x2=\""+this.x+"\" y2=\""+this.y+"\" />";
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
    }

    updateLine(lX,lY){
      let selector = "#"+this.figId;
      $(selector).attr("x2", lX);
      $(selector).attr("y2", lY);
    }

    createArrow(){
      let pathData = "<path fill=\""+this.strokeColor+"\" d=\"M"+this.x_int+" "+(this.y_int-10)+" L"+this.x_int+" "+(this.y_int+10)+" L"+(this.x_int-10)+" "+this.y_int+" Z\" />"+
      "<line onmouseover=\"deleteFigure(this)\" id=\""+this.figId+"\" stroke=\""+this.strokeColor+"\""+
      "x1=\""+this.x+"\" y1=\""+this.y+"\""+"x2=\""+this.x+"\" y2=\""+this.y+"\" />";
      console.log(pathData);
      let prevElementData = (document.getElementById("drawArea").innerHTML).toString();
      document.getElementById("drawArea").innerHTML = prevElementData + pathData;
    }

    updateArrow(lX,lY){
      let selector = "#"+this.figId;
      $(selector).attr("x2", lX);
      $(selector).attr("y2", lY);
    }
    
  }

function resetAllToolState(){
  penTool.setDisabled();
  highLighter.setDisabled();
  lineTool.setDisabled();
  arrowTool.setDisabled();
  rectangleTool.setDisabled();
  ellipseTool.setDisabled();
  triangleTool.setDisabled();
  textTool.setDisabled();
  eraserTool.setDisabled();
  shapeEraserTool.setDisabled();
  allEraserTool.setDisabled();
}

let drawArea = document.getElementById("drawArea");
drawArea.addEventListener("pointerdown",function(e){
  drawSomething(1,e.clientX,e.clientY);
  isDown = true;
});
drawArea.addEventListener("pointerup",function(e){
  isDown = false;
  drawSomething(3,e.clientX,e.clientY);
});
drawArea.addEventListener("pointercancel",function(e){
  isDown =false;
  drawSomething(3,e.clientX,e.clientY);
});
drawArea.addEventListener("pointermove",function(e){
  if(isDown){
    drawSomething(2,e.clientX,e.clientY);
  }
});
window.addEventListener("keypress",function(e){
  var key_ = event.keyCode || event.charCode;
  console.log(key_);
  if(enabled_tool=="text"){
  if((key_ != 13) && (key_ != 9)){
    drawing.updateText(event.key,line_no,0);
  }else if(key_==13){
    line_no++;
    drawing.updateText(event.key,line_no,13);
  }else{}
}
});
window.addEventListener("keydown",function(e){
  var key_ = event.keyCode || event.charCode;
  if(key_==8){
    drawing.updateText("backspace",line_no,8);
  }else if(key_ == 27){
    drawing = undefined;
  }
});

let isDown = false;
let figureId = 0;
let drawing;
function drawSomething(pointerState,mouseX , mouseY){
  if(pointerState==1){
  drawing = new Figure(mouseX,mouseY,figureId,enabled_tool);
  }else if(pointerState==2){
    drawing.update(mouseX,mouseY);
  }else{
    figureId++;
  }
}

function deleteFigure(element_){
if(enabled_tool=="eraser" && isDown==true){
  element_.remove();
}
}

penTool = new Tool("pen", "penTool", "changePenBtn","dropPenType" );
highLighter = new Tool("highlighter", "highlighterTool", "changePenBtn","dropPenType" );
lineTool = new Tool("line", "lineTool", "changeLineBtn","dropLineType" );
arrowTool = new Tool("arrow", "arrowTool", "changeLineBtn","dropLineType" );
rectangleTool = new Tool("rectangle", "rectangleTool", "changeShapeBtn","dropShapeType" );
ellipseTool = new Tool("ellipse", "ellipseTool", "changeShapeBtn","dropShapeType" );
triangleTool = new Tool("triangle", "triangleTool", "changeShapeBtn","dropShapeType" );
textTool = new Tool("text", "textTool", "textTool","dropEraserType" );
eraserTool = new Tool("eraser", "eraseTool", "changeEraserBtn","dropEraserType" );
shapeEraserTool = new Tool("shapeEraser", "shapeeraseTool", "changeEraserBtn","dropEraserType" );
allEraserTool = new Tool("allEraser", "alleraseTool", "changeEraserBtn","dropEraserType" );

let backgroundRect = document.getElementById("backgroundColorRect");
let fillRect = document.getElementById("fillColorRect");
let strokeRect = document.getElementById("strokeColorRect");
}