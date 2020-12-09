function note_layout_creater(title,text)
{

    note_card = document.createElement('div')
    note_card.className="note";
    let html;
    
    console.log(note_card);
    return note_card
}
main_container =  document.querySelector('.note_container');

function add_note()
{
    notes_count=document.querySelectorAll('.note').length;
    text = document.getElementById('exampleFormControlTextarea1').value;
    note_card = note_layout_creater(notes_count,text);
    note_title = document.getElementById('note_title').value;

    note_card.id = `${notes_count+1}`;
  
    main_container = document.getElementById('nt');
    main_container.appendChild(note_card);    
    html = `
    <div class="card text-white bg-dark mx-1 mb-3 id="${notes_count+1}" style=" max-width: 18rem;">
    <div class="card-header row container-fluid justify-content-between" style="margin: 0px !important">Note: ${notes_count+1} <i" onclick="notedelete(${notes_count+1})"style="padding: 3px 0 0 0; cursor:pointer;" class="fa fa-trash" aria-hidden="true"></i></div>
    <div class="card-body">
      <h5 class="card-title">${note_title}</h5>
      <p class="card-text">${text.slice(0,15)}...</p>
    </div>`;
    document.getElementById(`${notes_count+1}`).innerHTML=html;

}
function notedelete(id)
{   
    el=document.getElementById(id);
    el.remove()
    console.log("hello")
}