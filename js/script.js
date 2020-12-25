/////////////////// getting the note container/////////////////
main_container = document.querySelector(".note_container");
var global_note_id = 0;
////////////////making storenote as a default and unchangeble option/////////////////
if(document.getElementById("storenote"))
{
  document.getElementById("storenote").checked=true;
  document.getElementById("storenote").disabled=true;
}

///////////////////////fetching the value on startup////////////////
fetchnote_value = localStorage.getItem("fetchnote");

if(document.getElementById("fetchnote"))
{
  if (fetchnote_value == "true") {
    document.getElementById("fetchnote").checked = true;
     
    saved_notes_display();
  } else {
    document.getElementById("fetchnote").checked = false;
  }
}

function switch_state() {
  if (!document.getElementById("fetchnote").checked) {
    localStorage.setItem("fetchnote", false);
  } else {
    localStorage.setItem("fetchnote", true);
  }
}
function save_to_local(checker, title, data) {
  //this function will save data to local storage
  document.getElementById("note_title").value="";
  document.getElementById("note_data").value="";
  if (checker) {
    let dict = {};
    dict[title] = data;

    let stored_notes = JSON.parse(localStorage.getItem("notes"));

    if (stored_notes != null) {
      stored_notes.push(dict);
      localStorage.setItem("notes", JSON.stringify(stored_notes));
    } else {
      let notes_array = [];
      notes_array.push(dict);
      localStorage.setItem("notes", JSON.stringify(notes_array));
    }
  }
}
function error_message_shower(title ="", data ="") {
  ////////////error message shower
  terror = document.getElementById("title_error");
  derror = document.getElementById("data_error");
  if (title!="" && data!="") {
   
    terror.innerHTML = title;
    terror.setAttribute("style", "color: red; font-size: 12px;");
    t_el = document
      .getElementById("note_title")
      .setAttribute("style", "border: 1px solid red;");
    derror.innerHTML = data;
    derror.setAttribute("style", "color: red; font-size: 12px;");
    d_el = document
      .getElementById("note_data")
      .setAttribute("style", "border: 1px solid red;");
  }
  else if(title!="" && data=="")
  {
    derror.innerHTML = data;
    d_el = document
      .getElementById("note_data")
      .setAttribute("style", "border: 1px solid green;");
    terror.innerHTML = title;
    terror.setAttribute("style", "color: red; font-size: 12px;");
    t_el = document
      .getElementById("note_title")
      .setAttribute("style", "border: 1px solid red;");
  }
  else if (title=="" && data!="") {
    
    terror.innerHTML = ""
    t_el = document
      .getElementById("note_title")
      .setAttribute("style", "border: 1px solid green;");
    derror.innerHTML = data;
    derror.setAttribute("style", "color: red; font-size: 12px;");
    d_el = document
      .getElementById("note_data")
      .setAttribute("style", "border: 1px solid red;");
  }
  else if (title=="" && data=="") {
    
    terror.innerHTML = ""
    t_el = document
      .getElementById("note_title")
      .setAttribute("style", "border: 1px solid green;");

    derror.innerHTML = ""
    d_el = document
      .getElementById("note_data")
      .setAttribute("style", "border: 1px solid green;");
  }
}
//main function which check for the value and wil raise error if founc empty
function data_validator() {
  title_el = document.getElementById("note_title").value;
  data_el = document.getElementById("note_data").value;
  storenote = document.getElementById("storenote").checked;
  document.getElementById("note_title");

  if (title_el == "" && data_el == "") {
  
    error_message_shower("Note Title Can't Empty", "Note Data Can't be Empty");
  }
  else if (title_el == "" && data_el != "") {
    error_message_shower("Note Title Can't Empty","");
  } 
  else if (title_el != "" && data_el == "") {
    
    error_message_shower("", "Note Data Can't be Empty");
  } 
  else {
   
    if(unique_notes_verifier())
    {
    add_note(title_el, data_el);
    save_to_local(storenote, title_el, data_el);
    alert_shower("success", "Note Added Succesfully");
    }
  }
}
//////////////add note fuction ////////////////////////
function add_note(title_el, data_el) {
  
  if(global_note_id!=0)
  {
    note_body = document.getElementById(global_note_id).children[0].children[1];
    note_body.children[0].innerHTML = title_el;
    note_body.children[1].innerHTML = data_el.slice(0,30)+"...";
    global_note_id = 0;
    
  }
  else
  {

 
  notes_count = document.querySelectorAll(".note").length; // returns total created notes
  
  note_card = document.createElement("div");
  note_card.className = "note";
  note_card.id = `${notes_count + 1}`; //for giving unique id to every note

  main_container = document.getElementById("nt");
  main_container.appendChild(note_card);
  html = `
    <div class="card text-white bg-dark mx-1 mb-3" id="${
      notes_count + 1
    }" style="    max-width: 18rem; min-width: 18rem;">
        <div class="card-header row container-fluid justify-content-between" style="margin: 0px !important">
        Note: ${notes_count + 1} 
        <i class="fa fa-pencil-square-o" onclick="edit_note(${notes_count + 1})" aria-hidden="true"></i>
        <i" onclick="notedelete(${
    notes_count + 1
  },'${title_el}')"class="fa fa-trash" aria-hidden="true"></i>
    
        </div>
        <div class="card-body">
            <h5 class="card-title">${title_el}</h5>
            <p class="card-text">${data_el.slice(0, 30)}...</p>
        </div>
    </div>`;

  document.getElementById(`${notes_count + 1}`).innerHTML = html; //adding the html for the proper view
  }
 
}


//////////////////////the delete function. This will remove note from dom and also from localstorage if the note is previously saved in local storage ////////////////////
function notedelete(id=0, title,msg="") {
  if(id!=0)
  {
    el = document.getElementById(id);
    el.remove();
  }
  
  let notes_array = JSON.parse(localStorage.getItem("notes"));
  temp = notes_array;
  temp.forEach(function key_popper(ab, ind) {
    for (var key in ab) {
      if (key == title) {
        notes_array.splice(ind, 1);
      }
      break;
    }
    return false;
  });
  localStorage.setItem("notes", JSON.stringify(notes_array));
  if(msg!="")
  {
    alert_shower("success",msg);
  }
  else
  alert_shower("success", "No deleted Succesfully");
}


///////////////////////saved notes display//////////////////////////
function saved_notes_display() {
  let noteselm = JSON.parse(localStorage.getItem("notes"));
  all_notes_in_dom = document.getElementsByClassName("card-title");

  all_note_in_dom = Array.from(all_notes_in_dom);
  all_dom_notes_title = [];
  all_note_in_dom.forEach(function (note, ind) {
    all_dom_notes_title.push(note.innerHTML);
  });
  
  if(all_notes_in_dom.length > 0)
  {
    alert_shower("success", "Notes Already Added");
    return;
    
  }
  if (!noteselm.length) {
    
    alert_shower("danger", "No Notes Found");
  } else {
    notesObj = noteselm;

    notesObj.forEach(function note_data_extractor(note, ind) {
      for (var title in note) {
      
        if (!all_dom_notes_title.length) {
          data = note[title];
          add_note(title, data);
        }
      }
    });
  }
  alert_shower("success", "Note Added Succesfully");
}
 /////////////////////verify if it is in local storage///////////////////
function unique_notes_verifier() {
  
  input = document.getElementById("note_title").value;
  
   
  let noteselm = JSON.parse(localStorage.getItem("notes"));
  if(noteselm)
  {
    try
    {
      noteselm.forEach(function note_data_extractor(note, ind) {
        for (var title in note) 
        {
                
            if(title.toLowerCase()==input.toLowerCase())
            {
              
              error_message_shower("Title Already Exist");
              throw "Title Already Exist"
              
            
            }
        }
        });
        terror = document.getElementById("title_error");
      
      terror.innerHTML = "";
      terror.setAttribute("style", "color: red; font-size: 12px;");
      t_el = document
        .getElementById("note_title")
        .setAttribute("style", "border: 1px solid green;");
      document
        .getElementById("note_data")
        .setAttribute("style", "border: 1px solid green;");
      
      return true;
    }
    catch(err)
    {
          return false;
    }
  }
  else
  return true;  
}
//////////////////this will clear your local storage////////////////////

function localStorage_clear() {
  localStorage.clear();
  alert_shower("danger", "Local Storage Cleared");
}

///////////////////bootstrap alert shower/////////////////////////////
function alert_shower(type, msg) {
  el = document.getElementById("alert");
  el.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${msg}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
        `;
  el.style.display = "";
  seconds = 1;

  let interval_id = setInterval(function () {
    
    if (seconds == 8) 
    {
      el.style.display = "none";
      clearInterval(interval_id);
    } 
    else 
    {
      
      seconds += 1;
      
    }
  },1000);
}
////////////////////////////////search function///////////////////////////////

function note_search(e) {
  input = document.getElementsByClassName("note-search")[0].value.toLowerCase();
  cards = document.getElementsByClassName("card-title");

  for (i = 0; i < cards.length; i++) {
    if (cards[i].innerHTML.toLowerCase().indexOf(input) > -1) {
      cards[i].parentNode.parentNode.style.display = "";
    } else {
      cards[i].parentNode.parentNode.style.display = "none";
    }
  }
}

function edit_note(id)
{
  global_note_id = id;
  
  ntitle = document.getElementById("note_title");
  
  data = document.getElementById("note_data");
  
  note = document.getElementById(id).children[0].children[1];
  
  ntitle.value=note.children[0].innerText;
  let notesObj = JSON.parse(localStorage.getItem("notes"));
  try
  {
    notesObj.forEach(function note_data_extractor(note, ind) {
      for (var title in note) {
         
        if (ntitle.value==title) 
        {
          ndata = note[title];  
          throw "found";           
        }
      }
    });
  }
  catch(err)
  {
    data.value = ndata;
  }
  
    

  msg="Note is in edit mode now. Don't left without saving this note otherwise it will be lost."

  notedelete(0,note.children[0].innerText,msg);

}

//////////////////////////////////////text transition using anime.js/////////////////////////////////////////

var textWrapper = document.querySelector(".ml3");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml3 .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 50 * (i + 1),
  })
  .add({
    targets: ".ml3",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });
