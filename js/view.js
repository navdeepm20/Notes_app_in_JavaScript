document.getElementById("fetchnote2").checked=true;
document.getElementById("fetchnote2").disabled=true;
saved_notes_display2()


function display_note(id)
{   obj = document.getElementById(id);
    note_title = obj.children[0].children[1].children[0].innerHTML;
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.forEach(function note_data_extractor(note, ind) {
        for (var title in note) {
        
          if (note_title==title) {
            data = note[title];
                     
          }
        }
      });
    document.getElementById("modaltitle").innerHTML=note_title;
    document.getElementById("modalbody").innerHTML=data;
}
function add_note2(title_el, data_el) {
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
          <i class="fa fa-eye" data-toggle="modal" data-target="#viewmodal" onclick="display_note(${notes_count + 1})" aria-hidden="true"></i>
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
function saved_notes_display2() {
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
            add_note2(title, data);
          }
        }
      });
    }
    
  }