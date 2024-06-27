$(document).ready(function() {
    // Toggle submenus
    $(".toggle-submenu").click(function() {
        var submenu = $(this).next(".submenu");
        $(".submenu").not(submenu).slideUp();
        submenu.slideToggle();
    });

    // Add address functionality (up to 2 addresses)
    let addressCount = 1;
    $("#addAddress").click(function() {
        if (addressCount < 2) {
            var newAddress = `
                <fieldset class="border border-gray-300 p-4 rounded mb-4">
                    <legend class="text-lg font-semibold">Shipping Address</legend>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                        <div>
                            <label for="province" class="block text-gray-700">Province</label>
                            <select id="province" name="province" class="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                <option value="Baghdad">بغداد</option>
                                <option value="Basra">البصرة</option>
                                <option value="Duhok">دهوك</option>
                                <option value="Erbil">أربيل</option>
                                <option value="Kirkuk">كركوك</option>
                                <option value="Najaf">النجف</option>
                                <option value="Sulaymaniyah">السليمانية</option>
                                <option value="Karbala">كربلاء</option>
                                <option value="Maysan">ميسان</option>
                                <option value="Wasit">واسط</option>
                                <option value="Babylon">بابل</option>
                                <option value="Diyala">ديالى</option>
                                <option value="Salahaddin">صلاح الدين</option>
                                <option value="Al-Qadisiyyah">القادسية</option>
                                <option value="Al-Muthanna">المثنى</option>
                                <option value="Anbar">الأنبار</option>
                                <option value="Nineveh">نينوى</option>
                                <option value="Al-Samawah">السماوة</option>
                            </select>
                        </div>
                        <div>
                            <label for="cityName" class="block text-gray-700">City Name</label>
                            <input type="text" id="cityName" name="cityName" class="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        </div>
                        <div>
                            <label for="neighborhood" class="block text-gray-700">Neighborhood</label>
                            <input type="text" id="neighborhood" name="neighborhood" class="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        </div>
                        <div>
                            <label for="town" class="block text-gray-700">Town</label>
                            <input type="text" id="town" name="town" class="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        </div>
                        <div class="col-span-2">
                            <label for="describe" class="block text-gray-700">Describe</label>
                            <textarea id="describe" name="describe" class="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
                        </div>
                    </div>
                </fieldset>
            `;
            $("#addressContainer").append(newAddress);
            addressCount++;
        } else {
            alert("You can only add up to 2 addresses.");
        }
    });

    // Generate a unique ID for the vendor
    function generateVendorId() {
        return 'V' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Generate a unique ID for the employee
    function generateEmployeeId() {
        return 'E' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Form validation and submission for vendor
    $("#venderForm").submit(function(event) {
        event.preventDefault();
        var businessName = $("#businessName").val().trim();
        var phone1 = $("#phone1").val().trim();
        var logo = $("#logo").val();
        var isValid = true;

        if (businessName === "" || phone1 === "" || logo === "") {
            isValid = false;
            alert("Business Name, Phone #1, and Logo are required fields.");
        }

        if (isValid) {
            var formData = $(this).serializeArray();
            var venderData = {};
            formData.forEach(function(field) {
                venderData[field.name] = field.value;
            });
            venderData.vendorId = generateVendorId();

            // AJAX call to save data
            $.ajax({
                url: 'http://localhost:3000/save_vender',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(venderData),
                success: function(response) {
                    alert("Vender information saved successfully.");
                },
                error: function(error) {
                    alert("An error occurred while saving vender information.");
                }
            });
        }
    });

    // Form validation and submission for employee
    $("#employeeForm").submit(function(event) {
        event.preventDefault();
        var employeeId = generateEmployeeId();
        var firstName = $("#firstName").val().trim();
        var lastName = $("#lastName").val().trim();
        var email = $("#email").val().trim();
        var phoneNumber = $("#phoneNumber").val().trim();
        var isValid = true;

        if (firstName === "" || lastName === "" || email === "" || phoneNumber === "") {
            isValid = false;
            alert("First Name, Last Name, Email, and Phone Number are required fields.");
        }

        if (isValid) {
            var formData = $(this).serializeArray();
            var employeeData = {};
            formData.forEach(function(field) {
                employeeData[field.name] = field.value;
            });
            employeeData.employeeId = employeeId;

            // AJAX call to save data
            $.ajax({
                url: 'http://localhost:3000/save_employee',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(employeeData),
                success: function(response) {
                    alert("Employee information saved successfully.");
                },
                error: function(error) {
                    alert("An error occurred while saving employee information.");
                }
            });
        }
    });

    // Form submission for adding product
    $("#productForm").submit(function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        var vendorDetails = $('#vendorDetails div').text();
        if (!vendorDetails) {
            alert('Please select a vendor first.');
            return;
        }

        // Add vendor ID to the form data
        var vendorId = $('#vendorDetails').find('p:contains("ID:")').text().split(': ')[1];
        formData.append('vendorId', vendorId);

        // AJAX call to save product data
        $.ajax({
            url: 'http://localhost:3000/save_product',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert('Product information saved successfully.');
                $('#productForm')[0].reset();
            },
            error: function(error) {
                alert('An error occurred while saving product information.');
            }
        });
    });

    // Handle logout
    $("#logout").click(function() {
        // Perform logout operation
        window.location.href = 'index.html';
    });
});
