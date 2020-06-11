/* 
|-----------------------------------
|               Notes
| ----------------------------------
|
| 1) if you want to access all buttons you have 
|   let buttons = document.querySelectorAll("button");
|   for(let i = 0 ; i < buttons.length ; i++)
|   {
|       buttons[i].onclick = function(){}
|   }
|
| 2) the parameters of function (splice) are (first index , The length of indecies you want to remove)
|    not (first index , end index)
|
|
*/


// ---------------------------------------------------------------------------------------------------------------------------
//                                                      Variables
// ----------------------------------------------------------------------------------------------------------------------------
let Screen = document.getElementById("screen"),     // The Screen which show the operations
    Buttons = document.querySelectorAll("td"),      // All buttons
    Str = "",                                       // The string which show in the screen 
    TypeOfOperation = {                             
        "first"     : 0,                            // Number of (/ and *)
        "second"    : 0,                            // Number of (+ and -)
    },
    Output = "" ,                                   // The output (result)
    Result = document.getElementById("result"),     // The screen which show the result
    Turn = document.getElementById("turn"),         // The buttons of (turn off) and (turn on)
    Flag = false;                                   // The flag (true => there is a result) (false => the result is null)


// ---------------------------------------------------------------------------------------------------------------------------
//                                            Taking the input from the usre
// ----------------------------------------------------------------------------------------------------------------------------
for(let i = 1 ; i < Buttons.length ; i++)
{
    Buttons[i].onclick = function()
    {
        if(Turn.textContent == "Off")    
        {
            let button = Buttons[i].firstElementChild;

            if(Flag)                                            // if there is a result 
            {
                if(button.className == "operation")             // When i click new operation while there is output 
                {
                    Str=Output.toString(); 
                }
                else if(button.className == "del" || button.className == "AC" || button.className == "equal"){}
                else
                    Str = "";
                if(button.className != "equal")             // To save the output as the same when you click equal more time
                Flag = false;
            }
            if(!Flag || !button.className == "equal")       // To save the output as the same when you click equal more time
            Output = "";                                    // make the output is empty when i start new operation

            
            switch (button.className)
            {
                case("number"):
                if(button.textContent == "." && (Str.endsWith("."))){} 
                else
                Str+=button.textContent;
                break;

                case("zero"):
                Str+=button.textContent;
                break;
                
                case("operation"):
                if(!Str.endsWith(" ") && Str != "")
                {
                    Str+=" " + button.textContent + " ";
                    switch(button.textContent)
                    {
                        case("+"):
                        TypeOfOperation.second++;
                        break;

                        case("-"):
                        TypeOfOperation.second++;
                        break;

                        case("*"):
                        TypeOfOperation.first++;
                        break;

                        case("/"):
                        TypeOfOperation.first++;
                        break;
                    }
                }
                break;

                case("AC"):
                Str = "";
                TypeOfOperation.second = 0;
                TypeOfOperation.first = 0;
                Output = "";
                break;

                case("del"):
                if(Str.endsWith(" "))
                {
                    if(Str.includes("*" , Str.length - 3) || Str.includes("/" , Str.length -3))
                        TypeOfOperation.first--;
                    else
                        TypeOfOperation.second--;
                    Str = Str.substr(0 , Str.length-3);
                }
                else
                    Str = Str.substr(0 , Str.length-1);
                break;

                case("equal"):
                if(!Str.endsWith(" ") && Str != "" && !Flag)
                {
                    let temp1 = TypeOfOperation.first;
                    let temp2 = TypeOfOperation.second;
                    let res = (calculator(Str , TypeOfOperation)); 
                    Output = (isNaN(res) || res == "Infinity") ? "Error" : res;
                    
                    if(Output == "Error")
                    {
                        Flage = false;
                        TypeOfOperation.first = temp1;
                        TypeOfOperation.second = temp2;
                    }
                    else
                        Flag = true;
                }
                else if(Str.endsWith(" "))
                {
                    Output="Error";
                    flag = false;
                }
                break;
            }

            Screen.textContent = Str;
            Result.textContent = Output;
        }
    }
}


// Calculate the Result and return it 
function calculator(Str , TypeOfOperation)
{
    let Arr = Str.split(" ");
    console.log("The first array is " + Arr);
    let Temp;
    console.log("The number of operation is" +TypeOfOperation.first);
    for(let i = 1 ; TypeOfOperation.first != 0 ;)
    {
        if(Arr[i] == "*")
        {
            Temp = Arr[i-1] * Arr[i+1];
            Arr.splice(i-1 , 3 , Temp);
            TypeOfOperation.first--;
            i = 1;
        }
        else if(Arr[i] == "/")
        {
            Temp = Arr[i-1] / Arr[i+1];
            Arr.splice(i-1 , 3 , Temp);
            TypeOfOperation.first--;
            i = 1;
        }
        else 
        {
            i = i+2;
        }
        console.log("i " + i);
        console.log("The number of operation " + TypeOfOperation.first);
        console.log("The array is " + Arr);
    }

    for(let i = 1 ; TypeOfOperation.second != 0 ;)
    {
        if(Arr[i] == "+")
        {
            Temp = parseFloat(Arr[i-1]) + parseFloat(Arr[i+1]);
            Arr.splice(i-1 , 3 , Temp);
            TypeOfOperation.second--;
            i = 1;
        }
        else if(Arr[i] == "-")
        {
            Temp = parseFloat(Arr[i-1]) - parseFloat(Arr[i+1]);
            Arr.splice(i-1 , 3 , Temp);
            TypeOfOperation.second--;
            i = 1;
        }
        else 
        {
            i++;
            i++;
        }
        console.log(Arr);
    }
    return parseFloat(Arr[0]);
}


// turn off and turn on
Turn.onclick = () =>  
{
    if(Turn.textContent == "Off")
    {
        Turn.textContent = "On";
        Screen.style.backgroundColor = "black";
        Result.style.backgroundColor = "black";
        document.querySelector(".screen").style.backgroundColor = "black";
        Screen.textContent = "";
        Result.textContent = "";
        Output = "" ; 
        Str = "";
        return null;
    }
    if(Turn.textContent == "On")
    {
        Turn.textContent = "Off";
        Screen.style.backgroundColor = "#bdc9ce";
        Result.style.backgroundColor = "#bdc9ce";
        document.querySelector(".screen").style.backgroundColor = "#bdc9ce";
        return null;
    }
}

