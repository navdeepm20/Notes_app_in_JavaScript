
main_container =  document.querySelector('.note_container');

function save_to_local(checker,title,data)
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
function error_message_shower(title,data)
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
function data_validator() //main function
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
   
}
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
}
// saved_notes_display()
// {
//     let noteselm = localStorage.getItem('notes');
//     if(notes==null)
//     {
//         notesObj=[];
//     }
//     else
//     {
//         notesObj = JSON.parse(notes);
//     }
// }

//////////////////////////////////////text transition/////////////////////////////////////////

var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });