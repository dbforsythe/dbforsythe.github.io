//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);


//save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {

	name : siteName,
	url : siteUrl

    }
   
    /*local storage test

    localStorage.setItem('test', 'Hello Word');
    console.log(localStorage.getItem('test'));
    
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));

    */

    //test if there is a valid site name and url
    //CASE 1:  when bookmark array has not been created yet
    
        //test if bookmarks even exists yet, if not, create array
        if(localStorage.getItem('bookmarks') === null){
        //Init array
        var bookmarks = [];
            if(bookmark.name != '' && bookmark.url != ''){
                //add to array
                bookmarks.push(bookmark);
            }
            else{
                //just the bookmark name is empty
                if(bookmark.name == '' && bookmark.url != ''){
                    alert("You need to add a name");
                    
                }
                //just the bookmark url is empty
                if(bookmark.url == '' && bookmark.name != ''){
                    alert("You need to add url");
                }
                //both the name and url are missing
                if(bookmark.name == '' && bookmark.url == ''){
                    //both are empty
                    alert("You need to add url and name")
                
                }
            }
        
        //set to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
            
        fetchBookmarks();
            
            
            
            
        //We've already made a bookmarks array, so lets add to it
        //CASE 2: bookmark array has already been created
        
        }
        else {
            //Get bookmarks from localStorage
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
            //lets check if any errors in user input
            if(bookmark.name != '' && bookmark.url != ''){
                //add bookmark to array
                
                bookmarks.push(bookmark);
                
                
            }
            else{
                //just the bookmark name is empty
                if(bookmark.name == '' && bookmark.url != ''){
                    //bookmark name is empty
                    alert("You need to add a name");
                    
                }
                //just the bookmark url is empty
                if(bookmark.url == '' && bookmark.name != ''){
                    alert("You need to add url");
                }
                //both the name and url are missing
                if(bookmark.name == '' && bookmark.url == ''){
                    alert("You need to add url and name")
                    
                }
            }
            //Re-set back to local storage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
            fetchBookmarks();
        
        
	
        }
        e.preventDefault();


    
}

//delete bookmark

function deleteBookmark(url){
    //console.log(url);
    
    //get bookmarks from local storage
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //Remove from array
            bookmarks.splice(i,1);
        }
    }
    
    //Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
    
    
}

//fetch bookmarks
function fetchBookmarks(){

    //get bookmarks from local storage

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id

    var bookmarksResults = document.getElementById('bookmarksResults');
    
    console.log(bookmarksResults);

    //build output

    
     bookmarksResults.innerHTML = '';
    
    for(var i = 0; i < bookmarks.length; i++){

        var name = bookmarks[i].name;

        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=
            //create the well where were going to put each bookmark
            '<div class= "well">'+
        
            //name of the bookmark
            '<h3>' + name +
        
            //visit button
            ' <a class= "btn btn-default btn-sm" target="_blank" href="'+url+'">Visit</a> '+
        
            //delete button
            ' <a onclick = "deleteBookmark(\''+url+'\')" class= "btn btn-danger btn-sm" href="#">Delete</a> '+
            '</h3>' +
            '</div>';
    }
    
}



