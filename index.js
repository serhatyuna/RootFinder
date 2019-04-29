var method;

$(document).ready(function () {
    $('.input').hide();
    $('.result').hide();
    handleMethodChoose();
    returnMethodChoose();
    handleInputButton();
});

function handleMethodChoose() {
    $('.bw-2').click(function () {
        $('.methods').fadeOut(300);
        $('.input').delay(400).slideDown(500);
        method = $(this).parent().children().first()[0].innerText.toLowerCase().split(" ").join("-");
    });
}
function returnMethodChoose() { // back button event
    $('.back').click(function () {
        $('#input-form').trigger('reset'); // clear form values.
        $('.methods').delay(400).slideDown(500);
        $('.input').fadeOut(300);
        $('.result').fadeOut(300);
        $( "#iterationTable" ).remove(); // clear table.

        method = '';
        
        
    })
}

function handleInputButton() {
    $("#input-form").validate({
        rules: {
            secondCoeff: {
                required: true,
                number: true
            },
            firstCoeff: {
                required: true,
                number: true
            },
            constant: {
                required: true,
                number: true
            },
            intervalStart: {
                required: true,
                number: true
            },
            intervalEnd: {
                required: true,
                number: true
            },
            tolerance: {
                required: true,
                number: true
            },
        },
        messages: {
            secondCoeff: {
                required: "please specify second degree coefficient of function."
            },
            firstCoeff: {
                required: "please specify first degree coefficient of function."
            },
            constant: {
                required:  "please specify constant of function."
            },
            intervalStart: {
                required: "please specify lower bound of interval."
            },
            intervalEnd: {
                required: "please specify upper bound of interval."
            },
            tolerance: {
                required: "please specify tolerance value."
            },
        },
        submitHandler: function (form) {
           formSucceeds();
        }
    });
}

function formSucceeds() {
    var formElements = new Array();
    $("#input-form input").each(function () {
        var parsedValue = parseFloat($(this)[0].value);
        formElements.push(parsedValue);
    });
    var varray = findRoot(...formElements);
    if(varray == null) {
        $(".input").fadeOut(200);
        $('.methods').delay(400).slideDown(500);
    }
    else {
        createTable(varray);    
        $(".input").fadeOut(200);
        $(".result").delay(400).slideDown(500);
    }
    $('#input-form').trigger('reset'); // clear form values.

}
function findRoot(secondCoeff, firstCoeff, constant, a, b, tolerance) {
    if (func(a, secondCoeff, firstCoeff, constant) * func(b, secondCoeff, firstCoeff, constant) >= 0) {
        console.log("There is no root in the given interval!");
        alert("There is no root in the given interval!");
        return; // it returns null if it diverges.
    }
    else {
        let k = 0;
        let c = (a + b) / 2;
        let Iteration = { a: a, b: b, c: c, error: Math.abs(a - b), k: k };
        let allIterations = [];
        allIterations.push(Iteration);
        while ((b - a) > tolerance) {
            k++;
            c = (a + b) / 2; // middle point
            if (func(a, secondCoeff, firstCoeff, constant) == 0)
                break;
            else if (func(a, secondCoeff, firstCoeff, constant) * func(c, secondCoeff, firstCoeff, constant) < 0)
                b = c; // a is still a.
            else
                a = c; // b is still b.
            Iteration = { a: a, b: b, c: c, error: Math.abs(a - b), k: k };
            allIterations.push(Iteration);
        }
        return allIterations;
        // createTable();
    }
}

function noRootInGivenInterval() {

}

function createTable(varray) {
    $('.result .btn').after(
        `<table class="table table-bordered table-striped table-hover" id="iterationTable">
        <thead>
            <tr>
                <th scope="col">a</th>
                <th scope="col">b</th>
                <th scope="col">c</th>
                <th scope="col">error</th>
                <th scope="col">k</th>
            </tr>
        </thead>`);
    //console.log(varray);
}

function func(x, secondCoeff, firstCoeff, constant) {
    return secondCoeff * x * x + firstCoeff * x + constant;
}

//console.log(func(1,1,0,-3));
//console.log(findRoot(1,1,0,-3,1,2,0.01));