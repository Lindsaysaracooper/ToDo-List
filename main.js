// when the page first loads, show the items already on the server. Get (on ajax)

function pageOpen() {
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/CoopDay-18',
        type: 'GET',
        dataType: 'json',
        success: function(todo) {
            todo.forEach(function(item, i, arr) {
                // make an li and add it to the ul
                var deleteButton = $("<button>Delete</button>");
                var listItems = $("<li>" + item.todo + "</li>");
                $('ul').append(listItems);
                listItems.append(deleteButton);
                deleteButton.on('click', function() {
                    listItems.remove();
                    bye(item._id);
                })

            });
        }
    });
};

pageOpen();

function bye(byeId) {
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/CoopDay-18/' + byeId,
        type: 'DELETE',
        dataType: 'json',
        success: function(item) {}
    });
};


$(".button").on('click', function() {
        // i need to get the inner text of the text area element
        var innerText = $('textarea').val();
        // i need to have it attach to the listItems area
        var deleteButton = $("<button>Delete</button>");
        var listItems = $("<li>" + innerText + "</li>");
        $('ul').append(listItems);
        listItems.append(deleteButton);

        // i need to send it to the server
        $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/CoopDay-18/',
            type: 'POST',
            data: JSON.stringify({
                    "todo": innerText

            }),
            contentType:'application/json',
            dataType: 'json',
            success: function(addedItem) {
                deleteButton.on('click', function() {
                    listItems.remove();
                    bye(addedItem._id);
                })
            }
        });

    })
    // function add(addButton) {
    //     $.ajax({
    //         url: 'http://tiny-za-server.herokuapp.com/collections/CoopDay-18/',
    //         type: 'POST',
    //         dataType: 'json',
    //         success: function(addItem) {
    //
    //         }
    //     });
    // };

// $.ajax({
//   url: 'http://tiny-za-server.herokuapp.com/collections/',
//   type:'POST',
//   dataType: 'json'
//   success: function (response){
//     console.log(response);
//   },
//   data: {
// name:'vern',
// color:'white',
// powers:['healing'],
// last:false
//   }
// });

// When add is clicked, the content inside the textarea is moved into the to-do list
// added into the backend


//
// $('<li></li>').text('something i got from the server'); this is making a new li with data from the server
// $(container ie 'ul').append(the li i want to show) adding that li to the dom
