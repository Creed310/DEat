//increase it to 10s later

setTimeout(reading, 6000)

function reading()
{8
  let aadhar = document.getElementsByClassName("sc-hiSbYr bwthNF").uid.value
  console.log(aadhar)
  setTimeout(valid(aadhar), 3000)
}

const valid = (aadhar) =>
{
  let errlen = document.getElementsByClassName("sc-cBNfnY Tyhbo auth-form__text-field--error-div auth-form__text-field--error-div").length
  let validity
   if(errlen)
     {
         console.log("It is invalid")
         validity = 0
         console.log(validity)
     }
     else
     {
       console.log("It is valid")
      validity = 1
      console.log(validity)
     }
     console.log(va)
}


//import 
// class_name = "sc-cBNfnY Tyhbo auth-form__text-field--error-div auth-form__text-field--error-div" for the error
// class_name ="sc-hiSbYr bwthNF" for the input
//  https://myaadhaar.uidai.gov.in/verifyAadhaar = website


// document.getElementsByClassName("sc-cBNfnY Tyhbo auth-form__text-field--error-div auth-form__text-field--error-div")
// check .length

// if 1 => invalid aadhar
// if 0 => valid aadhar





