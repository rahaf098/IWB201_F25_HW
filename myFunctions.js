var cars = [
    { code: "CR-001", model: "Toyota Corolla", price: 250000 },
    { code: "CR-002", model: "Kia Sportage", price: 400000 },
    { code: "CR-003", model: "Hyundai Elantra", price: 300000 },
    { code: "CR-004", model: "Chevrolet Spark", price: 180000 },
    { code: "CR-005", model: "Nissan Sunny", price: 200000 }
];

function findCar(code) {
    for (var i = 0; i < cars.length; i++) {
        if (cars[i].code == code) {
            return cars[i];
        }
    }
    return null;
}

function parseDate(text) {
    var re = /^\d{4}-\d{2}-\d{2}$/;
    if (re.test(text) == false) {
        return null;
    }
    var parts = text.split("-");
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);
    var date = new Date(y, m - 1, d, 12);
    if (date.getFullYear() != y || date.getMonth() != m - 1 || date.getDate() != d) {
        return null;
    }
    return date;
}

function checkName(name) {
    if (name == "") {
        return true;
    }
    var re = /^[\u0621-\u064A ]+$/;
    return re.test(name);
}

function checkNationalId(id) {
    var re = /^\d{11}$/;
    if (re.test(id) == false) {
        return false;
    }
    var province = parseInt(id.substring(0, 2), 10);
    if (province >= 1 && province <= 14) {
        return true;
    }
    return false;
}

function checkMobile(mobile) {
    if (mobile == "") {
        return true;
    }
    var re = /^09[345689]\d{7}$/;
    return re.test(mobile);
}

function checkEmail(email) {
    if (email == "") {
        return true;
    }
    var re = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/;
    return re.test(email);
}

function bookCars() {
    var name = $("#fullName").val();
    var id = $("#nationalId").val();
    var startText = $("#startDate").val();
    var endText = $("#endDate").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();

    if (checkName(name) == false) {
        alert("الاسم يجب أن يحتوي على أحرف عربية فقط");
        return false;
    }
    if (checkNationalId(id) == false) {
        alert("الرقم الوطني إلزامي ويجب أن يكون 11 رقماً وأول رقمين بين 01 و 14");
        return false;
    }
    var start = parseDate(startText);
    if (start == null) {
        alert("تاريخ البداية إلزامي ويجب أن يكون بصيغة yyyy-mm-dd");
        return false;
    }
    var end = parseDate(endText);
    if (end == null) {
        alert("تاريخ النهاية إلزامي ويجب أن يكون بصيغة yyyy-mm-dd");
        return false;
    }
    if (end <= start) {
        alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
        return false;
    }
    if (checkMobile(mobile) == false) {
        alert("رقم الموبايل غير صحيح (سيريتل أو MTN)");
        return false;
    }
    if (checkEmail(email) == false) {
        alert("البريد الإلكتروني غير صحيح");
        return false;
    }

    var days = Math.round((end - start) / (1000 * 60 * 60 * 24));

    var message = "";
    var total = 0;
    $(".chooseCar:checked").each(function () {
        var car = findCar($(this).val());
        var carTotal = car.price * days;
        total = total + carTotal;
        message = message + car.model + ": " + days + " يوم = " + carTotal + " ل.س\n";
    });

    var discount = 0;
    if (days > 10) {
        discount = total * 0.05;
    }

    message = message + "\nعدد أيام التأجير: " + days;
    message = message + "\nالمجموع: " + total + " ل.س";
    message = message + "\nالخصم: " + discount + " ل.س";
    message = message + "\nالمبلغ النهائي: " + (total - discount) + " ل.س";
    alert(message);
    return false;
}

// jQuery
$(document).ready(function () {

    $(".showDetails").click(function () {
        $(this).closest("tr").next().toggle();
    });

    $("#continueBtn").click(function () {
        if ($(".chooseCar:checked").length == 0) {
            alert("الرجاء اختيار سيارة واحدة على الأقل");
        } else {
            $("#bookingForm").show();
        }
    });

    $("#bookingForm").submit(function () {
        return bookCars();
    });
});
