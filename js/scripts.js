$(document).ready(function () {
    // Handle language change
    $('#languageSelect').change(function () {
        // Implement language change logic here
    });

    // Handle logout
    $('#logoutButton').click(function () {
        // Implement logout logic here
    });

    // Load home page by default
    $('main').load('pages/home.html');

    // Handle navigation
    $('nav a').click(function (e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('main').load(page);
    });

    // Add employee button
    $('#addEmployeeButton').click(function () {
        $('main').load('pages/home.html');
    });

    // Edit and delete employee button
    $('#editDeleteEmployeeButton').click(function () {
        $('main').load('pages/edit-delete-employee.html');
    });
});

$(document).ready(function () {
    // Handle language change
    $('#languageSelect').change(function () {
        // Implement language change logic here
    });

    // Handle logout
    $('#logoutButton').click(function () {
        // Implement logout logic here
    });

    // Load home page by default
    $('main').load('pages/home.html');

    // Handle navigation
    $('nav a').click(function (e) {
        e.preventDefault();
        const page = $(this).attr('href');
        $('main').load(page);
    });

    // Add employee button
    $('#addEmployeeButton').click(function () {
        $('main').load('pages/home.html');
    });

    // Edit and delete employee button
    $('#editDeleteEmployeeButton').click(function () {
        $('main').load('pages/edit-delete-employee.html');
    });

    // Employee form submission
    $(document).on('submit', '#employeeForm', function (e) {
        e.preventDefault();
        // Collect form data
        const employee = {
            id: Math.floor(10000 + Math.random() * 90000),
            firstName: $('#firstName').val(),
            middleName: $('#middleName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            phoneNumber: $('#phoneNumber').val(),
            job: $('#job').val(),
            startDate: $('#startDate').val(),
            endDate: $('#endDate').val() || 'متاح',
            departments: {
                superAdmin: $('#superAdmin').is(':checked'),
                accounting: $('#accounting').is(':checked'),
                sales: $('#sales').is(':checked'),
                operations: $('#operations').is(':checked'),
                logs: $('#logs').is(':checked'),
                marketing: $('#marketing').is(':checked'),
                technology: $('#technology').is(':checked'),
            },
            profilePicture: $('#profilePicture').val()
        };

        // Save employee to local storage
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));

        // Append employee to table
        appendEmployeeToTable(employee);
    });

    // Function to append employee to table
    function appendEmployeeToTable(employee) {
        const employeeRow = `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.firstName}</td>
                <td>${employee.middleName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.phoneNumber}</td>
                <td>${employee.job}</td>
                <td>${employee.startDate}</td>
                <td>${employee.endDate}</td>
                <td>${getDepartments(employee.departments)}</td>
                <td><button class="edit-btn" data-id="${employee.id}">تحرير</button></td>
                <td><button class="delete-btn" data-id="${employee.id}">حذف</button></td>
            </tr>
        `;
        $('#employeeTableBody').append(employeeRow);
    }

    // Function to get departments string
    function getDepartments(departments) {
        return Object.keys(departments).filter(key => departments[key]).join(', ');
    }
});
