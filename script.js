$(function(){
    var myArray;
    var inputLength; 
    var reading = "false";
    var counter;
    var action;
    var frequency = 200;
 $("#new").hide();
    $("#pause").hide(); 
    $("#resume").hide(); 
     $("#options").hide(); 
    $("#result").hide();
    $("#error").hide();
  
    //click on start reading
    $("#start").click(function(){
        
        //get text split in words store in array
       
        myArray = $("#userinputs").val().split(/\s+/);
        inputLength =  myArray.length;
        if(inputLength>1){
            reading = true;
            
            $("#error").hide();
             $("#start").hide();
            $("#userinputs").hide();
            $("#new").show();
            $("#pause").show();
            
            $("#options").show();
            
            
            
            //set the slider
            $("#slider3").attr("max",inputLength-1);
             counter = 0;
            $("#result").show();
             $("#result").text(myArray[counter]);
            action = setInterval(read, frequency);
        }else{
            $("#error").show();
        }
        
    });
    
    
    $("#slider1").on("slidestop", function(event,ui){
        
        //refresh slider
        $("#slider1").slider("refresh");
        var slidervalue = parseInt($("#slider1").val());
        $("#result").css("fontSize", slidervalue)
        $("#size").text(slidervalue);
        
    });
    
    $("#slider2").on("slidestop", function(event,ui){
        
        //refresh slider
        $("#slider2").slider("refresh");
        var slider2value = parseInt($("#slider2").val());
       
        $("#speed").text(slider2value);
        //stop reading
        clearInterval(action);
        
        //change frequency
        frequency = 60000/slider2value;
        
        //resume reading if we are in reading mode
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    $("#slider3").on("slidestop", function(event,ui){
        
        //refresh the slider
        $("#slider3").slider("refresh");
        
        //get the value of slider
        var slidervalue = parseInt($("#slider3").val());
        
        //stop reading
        clearInterval(action);
        
        //change counter
        counter = slidervalue;
        
        //change word
        $("#result").text(myArray[counter]);    
    
        //change value of progress
        $("#per").text(Math.floor(counter/(inputLength-1)*100));
    
        //resume reading if we are in reading mode
        if(reading){
               action = setInterval(read, frequency);
        }
    });
    
    
   $("#new").click(function(){
        //reload page
        location.reload();
    });
    //Click on Pause
    $("#pause").click(function(){
        //stop reading and switch to none reading mode
        clearInterval(action);
        reading = false;
        
        //hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
        
    });
    
    //Click on Resume
    $("#resume").click(function(){
        
        //start reading
        action = setInterval(read, frequency);
        
        //go back to reading mode
        reading = true;
        
        //hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
        
    });
    
    function read(){
        if(counter == inputLength-1){
            clearInterval(action);
            reading = false;
            $("#pause").hide(); 
        }else{
            
            counter+=1;
            $("#result").text(myArray[counter]);
            $("#slider3").val(counter);
            $("#slider3").slider("refresh");
            
            $("#per").text(Math.floor(counter/(inputLength-1)*100));
            
        }
    }
    
    
  });