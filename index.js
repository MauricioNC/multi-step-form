let next_btns = document.querySelectorAll(".next_btn")
let prev_btns = document.querySelectorAll(".prev_btn")
let form_steps = document.querySelectorAll(".form_steps")
let steps = document.querySelectorAll(".step-item")
let progress = document.getElementById("progress")
let form = document.querySelector('form')
let error_messages = document.querySelector(".error_messages")
let stepNum = 0

// Lock submit button if some field is blank
form.addEventListener("submit", (e) => {  
  if (!validateForm())
    e.preventDefault()
})

// Move to next form step
next_btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    
    // Lock next button if some field is blank
    if (validateForm())
    {
      stepNum++
      updateFormSection()
      updateProgressBar()
      form_steps[stepNum].style.animation = "change_step_next 0.4s"
    }
  })
})

// Move to previuos form step
prev_btns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    stepNum--
    updateFormSection()
    updateProgressBar()
    form_steps[stepNum].style.animation = "change_step_prev 0.4s"
  })
})


// Change current form step active
function updateFormSection()
{
  form_steps.forEach(form_step => {
    form_step.classList.contains("active") &&
      form_step.classList.remove("active")
  })

  form_steps[stepNum].classList.add("active")
}

// Styles for progressbar
function updateProgressBar()
{
  steps.forEach((step, idx) => {
    if (idx < stepNum + 1)
      step.classList.add("progress-step-active")
    else
      step.classList.remove("progress-step-active")
  })

  const progressActive = document.querySelectorAll(".progress-step-active")

  progress.style.width =
    ((progressActive.length - 1) / (steps.length - 1)) * 100 + "%"
}

function validateForm()
{
  let current_inputs = document.querySelectorAll(".active .form-group input") // Get current inputs to evaluete if are blanks
  let email_regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
  for (let input of current_inputs)
  {   
    const p = document.createElement("p")
    
    if (input.value == "")
    { 
      p.textContent = "You must fill all the fields before to move to the next step."
      error_messages.appendChild(p)

      form.classList.add("empty_form")
     
      return false
    }
    else if (input.getAttribute("name") == "email" && !email_regex.test(input.value))
    { 
      p.textContent = "Please enter a valid email"
      error_messages.appendChild(p)

      return false
    }
  }

  error_messages.innerHTML = ""
  form.classList.remove("empty_form")
  
  return true
}