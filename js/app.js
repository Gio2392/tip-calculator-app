const d = document,
    $bill = d.getElementById("amount"),
    $percent = d.querySelectorAll('input[type="radio"]'),
    $inputPercent = d.querySelector(".input-percent"),
    $reset = d.querySelector('input[type="reset"]'),
    $cantPeople = d.getElementById("people"),
    $tipAmount = d.querySelector(".tip_amount-result"),
    $total = d.querySelector(".total"),
    $validation = d.querySelector(".validation");
let percent = 0;


function calc(){
    if($bill.value >= 0 && $cantPeople.value >= 1 && percent >= 0){
        let tipAmount = ($bill.value / $cantPeople.value * percent) / 100;
        let total = $bill.value / $cantPeople.value + tipAmount;

        $reset.classList.add("active");
        $tipAmount.textContent = `$${tipAmount.toFixed(2)}`;
        $total.textContent = `$${total.toFixed(2)}`;
    }else{
        error();
    }
}
function reset() {
    $reset.classList.remove("active");
    $validation.style.display = "none";
    $tipAmount.textContent = `$0.00`;
    $total.textContent = `$0.00`;
}
function uncheck(){
    $percent.forEach(per => {
        per.checked = false;
    })
}
function error(){
    if(!($cantPeople.value >= 1) || $cantPeople.value === ""){
        $validation.style.display = "block";
        $cantPeople.classList.add("error");
    }else{
        $validation.style.display = "none";
        $cantPeople.classList.remove("error");        
    }
}
$percent.forEach((per) => {
    per.addEventListener("click", () => {        
        percent = per.value;
        calc();
    })
})
d.addEventListener("click", (e) => {
    if (e.target.matches(".input-percent")){
        percent = $inputPercent.value;
        uncheck();
        calc();
    }
    if (e.target.matches(".button")){
        reset();
    }
})
d.addEventListener("input", (e) => {
    if(e.target.matches("#amount")){
        calc();
    }
    if(e.target.matches("#people")){
        error();
        calc();
    }
    if (e.target.matches(".input-percent")){
        percent = $inputPercent.value;
        calc();
    }
})