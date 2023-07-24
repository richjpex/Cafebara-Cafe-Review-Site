document.addEventListener("DOMContentLoaded",function() {
    const formElement = document.forms.login;
    let formData = new FormData(formElement);
    const owner = "owner";
    const customer = "customer";
    
    let dropdown = document.querySelector("#usertype");

    const urlParams = new URLSearchParams(window.location.search);
    const usertypeparam = urlParams.get('usertype');
    const message = urlParams.get('message');

    if(usertypeparam){
        dropdown.value = decodeURIComponent(usertypeparam);
    }
    if(dropdown.value == customer){
        displayCustomerRegistration();

        console.log(urlParams.entries());
        for (const [name, value] of urlParams.entries()) {
            console.log(`${name}: ${value}`);
            if (name !== 'message' && name !== 'email' && name !== 'password' && name !== 'confirmpassword') {
                const input = document.querySelector(`[name="${name}"]`);
                if (input) {
                
                    input.value = decodeURIComponent(value);
                
                }
            }
        }
        if (message) {
            emaillabel.innerHTML = `Email <span style='color:red; font:italic 15px Arial, sans-serif '>${decodeURIComponent(message)}</span>`;

            
        }
    }
    else if(dropdown.value == owner){
        displayOwnerRegistration();
        // Populate form inputs with existing values
        console.log(urlParams.entries());
        for (const [name, value] of urlParams.entries()) {
            console.log(`${name}: ${value}`);
            if (name !== 'message' && name !== 'email' && name !== 'password' && name !== 'confirmpassword') {
                const input = document.querySelector(`[name="${name}"]`);
                if (input) {
                
                    input.value = decodeURIComponent(value);
                
                }
            }
        }
        if (message) {
            emaillabel.innerHTML = `Email <span style='color:red; font:italic 15px Arial, sans-serif '>${decodeURIComponent(message)}</span>`;
          }

        
    }

    dropdown.addEventListener("change", function() {
        let usertype = dropdown.value;
        clearForm();
        changeForm(usertype);
        console.log(usertype);
    })

    function changeForm(usertype){
        if(usertype == customer){
            clearForm();
            displayCustomerRegistration();
            document.querySelector("#profilepic").addEventListener("change", function() {
                readURL(this);
            });
        }
        else if(usertype == owner){
            clearForm();
            displayOwnerRegistration();
        }
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $('#profilepicimg').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        } 
        else {
          alert('select a file to see preview');
          $('#profilepicimg').attr('src', '/images/assets/2logo.png');
        }
      }

    function clearForm(){
        document.querySelector("#inputform").innerHTML = "";
    }

    function displayCustomerRegistration(){

        const form = document.querySelector("#inputform");
        //const profilepic = createProfilePicInput();
        //const bio = createBioInput();
        const namefield = createNameInputs();
        //const bdayfield = createBirthdayInputs();
        const email = createEmailInput();
        const pass = createPasswordInput();
        const confirm = createConfirmPasswordInput();
        const submit = createSubmitbutton();

        // form.appendChild(profilepic);
        // form.appendChild(bio);
        form.appendChild(namefield);
        //form.appendChild(bdayfield);
        form.appendChild(email);
        form.appendChild(pass);
        form.appendChild(confirm);
        form.appendChild(submit);
    }

    function displayOwnerRegistration(){
        const form = document.querySelector("#inputform");
        const email = createEmailInput();
        const pass = createPasswordInput();
        const confirm = createConfirmPasswordInput();
        const submit = createSubmitbutton();
        const estname = createLongTextBoxInput();

        estname.childNodes[1].setAttribute("placeholder","cafebara");
        estname.childNodes[1].setAttribute("name", "estname");
        estname.childNodes[1].required = true;
        estname.childNodes[0].innerHTML = "Establishment Name";

        const estaddress = createLongTextBoxInput();
        estaddress.childNodes[1].setAttribute("placeholder","2401 Taft Ave, Malate, Manila");
        estaddress.childNodes[1].setAttribute("name", "estaddress");
        estaddress.childNodes[1].required = true;
        estaddress.childNodes[0].innerHTML = "Establishment Address";
    
        form.appendChild(estname);
        form.appendChild(estaddress);
        form.appendChild(email);
        form.appendChild(pass);
        form.appendChild(confirm);
        form.appendChild(submit);

    }

    function createLongTextBoxInput(){
        const div = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");

        div.setAttribute("class","singlebox");
        input.setAttribute("type","text");
        div.appendChild(label);
        div.appendChild(input);

        return div;
    }

    function createSubmitbutton(){
        const button = document.createElement("input");
        const div = document.createElement("div");
        const anchortag = document.createElement("a");
        
        //anchortag.setAttribute("href","index2.html");
        button.setAttribute("type","submit");
        button.setAttribute("id","submit");
        button.setAttribute("name","submit");
        // set attribute "method" = lowercase post
        button.setAttribute("method","post");
        button.innerHTML = "Sign up";

        anchortag.appendChild(button);
        div.appendChild(anchortag);
        div.setAttribute("id","button");
        return div;
    }

    function createConfirmPasswordInput(){
        const pass = document.createElement("input");
        const passdiv = document.createElement("div");
        const passlabel = document.createElement("label");

        pass.setAttribute("type","password");
        pass.setAttribute("name","confirmpassword");
        pass.setAttribute("id","confirmpassword");
        pass.setAttribute("placeholder","Re-enter your password");
        pass.required = true;

        passlabel.setAttribute("for","confirmpassword");
        passlabel.innerHTML = "Confirm Password";

        passdiv.setAttribute("class","singlebox");

        passdiv.appendChild(passlabel);
        passdiv.appendChild(pass);

        return passdiv;
    }

    function createPasswordInput(){
        const pass = document.createElement("input");
        const passdiv = document.createElement("div");
        const passlabel = document.createElement("label");

        pass.setAttribute("type","password");
        pass.setAttribute("name","password");
        pass.setAttribute("id","password");
        pass.setAttribute("placeholder","password12345");
        pass.required = true;

        passlabel.setAttribute("for","password");
        passlabel.innerHTML = "Password";

        passdiv.setAttribute("class","singlebox");

        passdiv.appendChild(passlabel);
        passdiv.appendChild(pass);

        return passdiv;
    }

    function createEmailInput(){
        const email = document.createElement("input");        
        const emaildiv = document.createElement("div");
        const emaillabel = document.createElement("label");

        email.setAttribute("type","email");
        email.setAttribute("name","email");
        email.setAttribute("id","email");
        email.setAttribute("placeholder","kk@email.com");
        email.required = true;
  
        emaillabel.setAttribute("for","email");
        emaillabel.setAttribute("id", "emaillabel");
        emaillabel.innerHTML = "Email";
        emaildiv.setAttribute("class","singlebox");

        emaildiv.appendChild(emaillabel);
        emaildiv.appendChild(email);

        return emaildiv;
    }

    // // function createBirthdayInputs(){
    // //     const bdaywrap = document.createElement("div");
    // //     const firstdiv = document.createElement("div");
    // //     const seconddiv = document.createElement("div");
    // //     const daydiv = document.createElement("div");
    // //     const monthdiv = document.createElement("div");
    // //     const yeardiv = document.createElement("div");
    // //     $(bdaywrap).addClass("longbox");
    // //     $(seconddiv).addClass("tripleboxwrapper");
    // //     $(daydiv).addClass("tripleboxlayer");
    // //     $(monthdiv).addClass("tripleboxlayer");
    // //     $(yeardiv).addClass("tripleboxlayer");

    // //     const bdaytag = document.createElement("label");
    // //     bdaytag.innerHTML = "When is your birthday?";
    // //     firstdiv.appendChild(bdaytag);

    // //     daydiv.setAttribute("id","daydiv");
    // //     monthdiv.setAttribute("id","monthdiv");
    // //     yeardiv.setAttribute("id","yeardiv");

    // //     const month = document.createElement("select");
    // //     const day = document.createElement("input");
    // //     const year = document.createElement("input");

    // //     const monthlabel = document.createElement("label");
    // //     const daylabel = document.createElement("label");
    // //     const yearlabel = document.createElement("label");

    // //     monthlabel.innerHTML = "Month";
    // //     daylabel.innerHTML = "Day";
    // //     yearlabel.innerHTML = "Year";

    // //     //This part creates the month option elements and adds to the select
    // //     const months = createBirthMonths();
    // //     for(let i = 0; i < months.length; i++){
    // //         month.appendChild(months[i]);
    // //     };
        
    // //     day.setAttribute("type","number");
    // //     day.setAttribute("id","day");
    // //     day.setAttribute("min","1");
    // //     day.setAttribute("max","31");
    // //     day.setAttribute("placeholder","DD");
    // //     day.required = true;
        
    // //     month.setAttribute("class","inputfield");
    // //     month.required = true;
        
    // //     year.setAttribute("placeholder","YYYY");
    // //     year.required = true;
        
    // //     const date = new Date();
    // //     const currentyear = date.getFullYear();
    // //     year.setAttribute("type","number");
    // //     year.setAttribute("min", currentyear-120);
    // //     year.setAttribute("max", currentyear);

    // //     daydiv.appendChild(daylabel);
    // //     daydiv.appendChild(day);
    // //     monthdiv.appendChild(monthlabel);
    // //     monthdiv.appendChild(month);
    // //     yeardiv.appendChild(yearlabel);
    // //     yeardiv.appendChild(year);

    // //     seconddiv.appendChild(daydiv);
    // //     seconddiv.appendChild(monthdiv);
    // //     seconddiv.appendChild(yeardiv);

    // //     bdaywrap.appendChild(firstdiv);
    // //     bdaywrap.appendChild(seconddiv);

    // //     return bdaywrap;
    // // }

    // function createBirthMonths(){
    //     const Jan = document.createElement("option");
    //     const Feb = document.createElement("option");
    //     const Mar = document.createElement("option");
    //     const Apr = document.createElement("option");
    //     const May = document.createElement("option");
    //     const Jun = document.createElement("option");
    //     const Jul = document.createElement("option");
    //     const Aug = document.createElement("option");
    //     const Sep = document.createElement("option");
    //     const Oct = document.createElement("option");
    //     const Nov = document.createElement("option");
    //     const Dec = document.createElement("option");
    //     const none = document.createElement("option");
    //     const months = [none,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec];
    //     const monthhtml = ['Month','January','February','March','April','May','June','July','August','September','October','November','December'];
        
    //     none.disabled = true;
    //     none.selected = true;
    //     none.hidden = true;
        
    //     for(let i = 0; i < months.length; i++){
    //         months[i].setAttribute("value",i);
    //         months[i].innerHTML = monthhtml[i];
    //     }

    //     return months;
    // }

    function createNameInputs(){
        const namewrapper = document.createElement("div");
        const fnamediv = document.createElement("div");
        const lnamediv = document.createElement("div");
        const firstname = document.createElement("input");
        const lastname = document.createElement("input");
        const labelfname = document.createElement("label");
        const labellname = document.createElement("label");

        //input type = text
        firstname.setAttribute("type","text");
        lastname.setAttribute("type","text");
        firstname.required = true;

        //name = firstname, id = firstname
        firstname.setAttribute("name","firstname");
        firstname.setAttribute("id","firstname");
        firstname.setAttribute("placeholder","Kevin");

        //name = lastname, id = lastname
        lastname.setAttribute("name","lastname");
        lastname.setAttribute("id","lastname");
        lastname.setAttribute("placeholder","Kaslana");
        lastname.required = true;

        //for = firstname, for = lastname
        labelfname.setAttribute("for","firstname");
        labellname.setAttribute("for","lastname");


        //label html
        labelfname.innerHTML = "First Name";
        labellname.innerHTML = "Last Name";

        $(firstname).addClass("inputfield");
        $(lastname).addClass("inputfield");
        
        $(namewrapper).addClass("doubleboxwrapper");
        $(fnamediv).addClass("doubleboxlayer");
        $(lnamediv).addClass("doubleboxlayer");

        $(fnamediv).append(labelfname);
        $(fnamediv).append(firstname);
        
        $(lnamediv).append(labellname);
        $(lnamediv).append(lastname);
        $(namewrapper).append(fnamediv);
        $(namewrapper).append(lnamediv);
        return namewrapper;
    }

    // function createProfilePicInput(){
    //     const allwrap = document.createElement("div");
        
    //     const profilepicdiv = document.createElement("div");
    //     const img = document.createElement("img");
        
    //     const labeldiv = document.createElement("div");
    //     const profilepiclabel = document.createElement("label");
    //     const profilepic = document.createElement("input");
        

    //     //set image attributes
    //     img.setAttribute("src","/images/assets/2logo.png");
    //     img.setAttribute("id","profilepicimg");
    //     img.setAttribute("alt","Profile Picture");

    //     profilepiclabel.innerHTML = "Upload Profile Picture";

    //     profilepic.setAttribute("type","file");
    //     profilepic.setAttribute("name","profilepic");
    //     profilepic.setAttribute("id","profilepic");
    //     profilepic.required = true;

    //     $(profilepic).addClass("id","inputfield");

    //     $(allwrap).addClass("imagedivwrapper");
    //     $(profilepicdiv).addClass("imagediv");
    //     $(labeldiv).addClass("imagelabel");
        
    //     profilepicdiv.appendChild(img);

    //     labeldiv.appendChild(profilepiclabel);
    //     labeldiv.appendChild(profilepic);

    //     allwrap.appendChild(profilepicdiv);
    //     allwrap.appendChild(labeldiv);

    //     return allwrap;
    // }

    // function createBioInput(){
    //     const biowrap = document.createElement("div");
    //     const biolabel = document.createElement("label");
    //     const bio = document.createElement("textarea");

    //     biolabel.innerHTML = "Write a bio";

    //     bio.setAttribute("name","bio");
    //     bio.setAttribute("id","bio");
    //     bio.setAttribute("placeholder","I love cafes frfr.");
    //     bio.setAttribute("alt", "Insert your bio here");

    //     $(biowrap).addClass("singlebox");
        
    //     $(bio).addClass("inputfield");
    //     $(bio).addClass("bioinput");

    //     biowrap.appendChild(biolabel);
    //     biowrap.appendChild(bio);

    //     return biowrap;
    // }

});