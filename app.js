const state = {
    view: 'home',

    employeeList: [{
            name: "Jan",
            officeNum: 1,
            phoneNum: "222-222-2222"
        },
        {
            name: "Juan",
            officeNum: 304,
            phoneNum: "489-789-8789"
        },
        {
            name: "Margie",
            officeNum: 789,
            phoneNum: "789-789-7897"
        },
        {
            name: "Sara",
            officeNum: 32,
            phoneNum: "222-789-4654"
        },
        {
            name: "Tyrell",
            officeNum: 3,
            phoneNum: "566-621-0452"
        },
        {
            name: "Tasha",
            officeNum: 213,
            phoneNum: "789-766-5675"
        },

        {
            name: "Ty",
            officeNum: 211,
            phoneNum: "789-766-7865"
        },
        {
            name: "Sarah",
            officeNum: 345,
            phoneNum: "222-789-5231"
        }
    ]

};
const renderEmployees = function (employees = state.employeeList) {
    const html = employees.map(employee => {
        return `
    <p>Name: ${employee.name}</p>
    <p>Office: ${employee.officeNum}</p>
    <p>Phone: ${employee.phoneNum}</p>
         `
    }).join('')
    $('#content').html(html);
}

const clearContent = function () {
    $('#content').empty();
}
const verifyIn = function (e) {
    e.preventDefault();
    const verifyInfo = $("#verifyInput").val();
    let msg = "Employee Not Found";
    $("#verifyInput").empty();
    const employeeFound = state.employeeList.some(function (employee) {
        return employee.name === verifyInfo
    })
    if (employeeFound) {
        msg = "Employee found."
    }
    $("#content").text(msg);
};
const LookupIn = function (e) {
    e.preventDefault();
    $("#lookupInput").empty();
    let LookupName = $("#lookupInput").val();
    let found = state.employeeList.find(e => e.name === LookupName);
    renderEmployee(found);
}

function renderEmployee(employee) {

    const employeehtml = `
    <p>Name: ${employee.name}</p>
    <p>Office: ${employee.officeNum}</p>
    <p>Phone: ${employee.phoneNum}</p>
    `
    $('#content').html(employeehtml);
}

const containsIn = function (e) {
    e.preventDefault();
    let containsInfo = $("#containsInput").val().toLowerCase();
    let contained = state.employeeList.filter(e =>
        e.name.toLowerCase().includes(containsInfo)
    );
    $("#containsInput").empty();
    renderEmployees(contained);
};


const updateIn = function (e) {
    e.preventDefault();
    const eName = $("#updateInput").val();
    let newNumber = $("#updateInput2").val();
    let newPhoneNumber = $("#updateInput3").val();
    const employeeToUpdate = state.employeeList.find(e => e.name === eName) || {};
    employeeToUpdate.officeNum = newNumber
    employeeToUpdate.phoneNum = newPhoneNumber
    renderEmployees();
};

const addIn = function (e) {
    e.preventDefault();
    $("#addInput").empty();
    let addName = $("#addInput").val();
    let addOffice = $("#addInput2").val();
    let addTele = $("#addInput3").val();
    let addedEmployee = {
        name: addName,
        officeNum: addOffice,
        phoneNum: addTele
    };

    state.employeeList.push(addedEmployee);

    state.employeeList.forEach(e => {
        render(e.name, e.officeNum, e.phoneNum);

        renderEmployees()
    });


    state.employeeList.forEach(function (e) {
        $("#content").append(`${employeeList.name} ${employeeList.officeNum} ${employeeList.phoneNum}`)
    });
    // for (let i = 0; i < employeeList.length; i++) {
    //     $("#content").append(`${employeeList[i].name} ${employeeList[i].officeNum} ${employeeList[i].phoneNum}`);
    // }
};


const actions = {
    print: renderEmployees,
    home: clearContent,
    verify: clearContent,
    lookup: clearContent,
    contains: clearContent,
    update: clearContent,
    add: clearContent,
    delete: clearContent
};
const hideShow = (view) => {
    $('form').addClass('hide');
    state.view = view || state.view;
    $(`[data-view="${state.view}"]`).removeClass('hide');
}


const deleteIn = function (e) {
    e.preventDefault();
    $("#deleteInput").empty();
    deleteInfo = $("#deleteInput").val();

    for (let i = 0; i < state.employeeList.length; i++) {
        if (deleteInfo === state.employeeList[i].name) {
            state.employeeList.splice(i, 1);
            state.employeeList.forEach(e => {
                // $("#content").append(`${e.name} ${e.officeNum} ${e.phoneNum}`);
                renderEmployees();
            });
        }
    }
};


const pageEvents = function () {
    $("#submitVerify").on("click", verifyIn);
    $("#submitLookup").on("click", LookupIn);
    $("#submitContains").on("click", containsIn);
    $("#submitUpdate").on("click", updateIn);
    $("#submitAdd").on("click", addIn);
    $("#submitDelete").on("click", deleteIn);
    // $("#submitLookup").on("click", LookupIn);

    $('.sidenav').on('click', e => {
        e.preventDefault;
        hideShow(e.target.id);
        actions[state.view]();
    })
}
pageEvents();

hideShow('home');

//flow 
// step 1: add view ot actions
// step 2: set up default action
// step 3: set u pclick event for page functionality
// step 4: click event shold complete functionality