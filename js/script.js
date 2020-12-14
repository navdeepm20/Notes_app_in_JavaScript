

/////////////////// getting the note container/////////////////
main_container =  document.querySelector('.note_container'); 
///////////////////////fetching the value on startup////////////////
fetchnote_value = localStorage.getItem('fetchnote');

if(fetchnote_value=='true')
{
   
    document.getElementById('fetchnote').checked = true;
    saved_notes_display()
    
   
}
else
{
    document.getElementById('fetchnote').checked = false;

}
function switch_state()
{
    if(!document.getElementById('fetchnote').checked)
    {
        
        localStorage.setItem('fetchnote',false);
        
    }
    else
    {
        localStorage.setItem('fetchnote',true);
    }
    
}
function save_to_local(checker,title,data) //this function will save data to local storage
{
    if(checker)
    {

        let dict={};
        dict[title]=data;
        
        let stored_notes  = JSON.parse(localStorage.getItem('notes'));
        
        if(stored_notes!=null)
        {
            stored_notes.push(dict);
            localStorage.setItem('notes',JSON.stringify(stored_notes))
        }
        else
        {
            let notes_array = []
            notes_array.push(dict)
            localStorage.setItem('notes',JSON.stringify(notes_array))
        }
    }
}
function error_message_shower(title,data) ////////////error message shower
{   
    if(title)
    {
        terror = document.getElementById("title_error");
        terror.innerHTML=title;
        terror.setAttribute("style","color: red; font-size: 12px;");
        t_el = document.getElementById('note_title').setAttribute('style','border: 1px solid red;');
    }
  
    if(data)
    {
        
        derror = document.getElementById("data_error");
        
        derror.innerHTML=data;
        derror.setAttribute("style","color: red; font-size: 12px;");
        d_el = document.getElementById('note_data').setAttribute('style','border: 1px solid red;')
    }
    
   
   
    
}
//main function which check for the value and wil raise error if founc empty
function data_validator() 
{
    
    title_el = document.getElementById("note_title").value;
    data_el = document.getElementById("note_data").value;
    storenote = document.getElementById("storenote").checked;
    document.getElementById("note_title")
    

    if(title_el=="")
    {
        error_message_shower("Note Title Can't Empty",false)
    }
    if(data_el=="")
    {
        error_message_shower(false,"Note Data Can't be Empty");
    }
    else
    {add_note(title_el,data_el);
    save_to_local(storenote,title_el,data_el);
    }

}
//////////////add note fuction ////////////////////////
function add_note(title_el,data_el)
{
    notes_count=document.querySelectorAll('.note').length; // returns total created notes
    

    note_card = document.createElement('div')
    note_card.className="note";  
    note_card.id = `${notes_count+1}`; //for giving unique id to every note
  
    main_container = document.getElementById('nt');
    main_container.appendChild(note_card);    
    html = `
    <div class="card text-white bg-dark mx-1 mb-3" id="${notes_count+1}" style=" max-width: 18rem;">
        <div class="card-header row container-fluid justify-content-between" style="margin: 0px !important">
        Note: ${notes_count+1} <i" onclick="notedelete(${notes_count+1},'${title_el}')"style="padding: 3px 0 0 0; cursor:pointer;" class="fa fa-trash" aria-hidden="true"></i>
    
        </div>
        <div class="card-body">
            <h5 class="card-title">${title_el}</h5>
            <p class="card-text">${data_el.slice(0,25)}...</p>
        </div>
    </div>`;

    document.getElementById(`${notes_count+1}`).innerHTML=html;  //adding the html for the proper view 
    alert_shower("success","Note Added Succesfully")
   
}
//////////////////////the delete function. This will remove note from dom and also from localstorage if the note is previously saved in local storage ////////////////////
function notedelete(id,title)
{   
  
    el=document.getElementById(id);
    note_title = el.children[0].children[1].children[0].innerHTML;
    el.remove();
    let notes_array =  JSON.parse(localStorage.getItem('notes'));
    temp = notes_array;
    temp.forEach(function key_popper(ab,ind){
        for(var key in ab)
        {
            if(key==title)
            {
                notes_array.splice(ind,1);
                        
            }
            break;
        }
        return false
        
    });
    localStorage.setItem('notes',JSON.stringify(notes_array));
    alert_shower("success","No deleted Succesfully")
}
///////////////////////saved notes display//////////////////////////
function saved_notes_display()
{
    let noteselm = localStorage.getItem('notes');
    if(noteselm==null)
    {
        alert_shower("danger","No Notes Found")
        
    }
    else
    {
        notesObj = JSON.parse(noteselm);
        notesObj.forEach(function note_data_extractor(note,ind)
        {
            for(var title in note)
                {
                    data = note[title];
                    add_note(title,data);
                }
        });
    }
}
//////////////////this will clear your local storage////////////////////
function localStorage_clear()
{
    localStorage.clear();
    alert_shower("danger","Local Storage Cleared")
}
///////////////////bootstrap alert shower/////////////////////////////
function alert_shower(type,msg)
{
    el = document.getElementById('alert');
        el.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${msg}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        `
}
//////////////////////////////////////text transition using anime.js/////////////////////////////////////////

var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 50 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

